import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { InscriptionResponseDTO, InscriptionService } from '../../../../services/inscription-service';
import { FactureCreateDTO, FactureService } from '../../../../services/facture-service';

@Component({
  selector: 'app-creer-facture',
  imports: [RouterModule,ReactiveFormsModule,CommonModule,FormsModule],
  templateUrl: './creer-facture.html',
  styleUrl: './creer-facture.css',
})
export class CreerFacture implements OnInit{
  inscription : InscriptionResponseDTO |null=null;
  inscriptionsNonFacturees:InscriptionResponseDTO[]=[];
  searchQuery='';
  showSearch = false;
  form : FormGroup;
  prixBase=0;
  remiseMontant=0;
  montantHT = 0;
  montantTVA = 0;
  montantTTC = 0;
  numeroFacture = '';
 
  loading = false;
  errorMessage = '';
  successMessage = '';
  constructor(
    private fb:FormBuilder,
    private route:ActivatedRoute,
    private router:Router,
    private factureService:FactureService,
    private inscriptionService:InscriptionService
  ){
    this.form=this.fb.group({
      dateEcheance:[
        this.getDefaultEcheance(),
        [Validators.required]
      ],
      remise: [0, [Validators.min(0), Validators.max(100)]],
      notes: ['', [Validators.maxLength(500)]],
    });
    this.form.get('remise')!.valueChanges.subscribe(() => this.recalculer());

  }
  ngOnInit(): void {
    this.numeroFacture=this.genererNumeroFacture();
    const inscriptionId=this.route.snapshot.queryParamMap.get('inscriptionId');
    if(inscriptionId){
      this.chargerInscription(Number(inscriptionId));
    }else{
      this.showSearch=true;
      this.chargerInscriptionsNonFacturees()
    }
  }
  chargerInscription(id:number):void{
    this.inscriptionService.getInscriptionsNonFacturees().subscribe({
      next:(list)=>{
        this.inscription=list.find(i => i.id ===id)||null;
        if(this.inscription){
          this.prixBase=(this.inscription as any).prixSession||0;
          this.recalculer();
        }
      },
      error:(err)=>console.error(err)
    });
  }
  chargerInscriptionsNonFacturees(): void {
    this.inscriptionService.getInscriptionsNonFacturees().subscribe({
      next: (data) => this.inscriptionsNonFacturees = data,
      error: (err) => console.error(err)
    });
  }
  selectionnerInscription(insc: InscriptionResponseDTO): void {
    this.inscription = insc;
    this.prixBase = (insc as any).prixSession || 0;
    this.showSearch = false;
    this.recalculer();
  }
  get inscriptionsFiltrees(): InscriptionResponseDTO[] {
    if (!this.searchQuery) return this.inscriptionsNonFacturees;
    const q = this.searchQuery.toLowerCase();
    return this.inscriptionsNonFacturees.filter(i =>
      i.apprenantNom?.toLowerCase().includes(q) ||
      i.apprenantPrenom?.toLowerCase().includes(q) ||
      i.sessionNom?.toLowerCase().includes(q)
    );
  }
  recalculer(): void {
    const remisePct = Math.min(100, Math.max(0, this.form.get('remise')?.value || 0));
    this.remiseMontant = this.prixBase * remisePct / 100;
    this.montantHT = this.prixBase - this.remiseMontant;
    this.montantTVA = this.montantHT * 0.20;
    this.montantTTC = this.montantHT + this.montantTVA;
  }
  soumettre(): void {
    if (this.form.invalid || !this.inscription) return;
 
    this.loading = true;
    this.errorMessage = '';
 
    const request: FactureCreateDTO= {
      inscriptionId: this.inscription.id,
      dateEcheance: this.form.value.dateEcheance,
      remise: this.form.value.remise || 0,
      notes: this.form.value.notes || '',
    };
 
    this.factureService.creerFacture(request).subscribe({
      next: (facture) => {
        this.loading = false;
        this.router.navigate(['/financier/detailFacture', facture.id]);
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err.error?.message || 'Erreur lors de la création de la facture.';
      }
    });
  }
  annuler(): void {
    this.router.navigate(['/financier/financierDashboard']);
  }
 
  // Helpers
  private getDefaultEcheance(): string {
    const d = new Date();
    d.setDate(d.getDate() + 30);
    return d.toISOString().substring(0, 10);
  }
 
  private genererNumeroFacture(): string {
    const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const rand = Math.floor(Math.random() * 9000 + 1000);
    return `FACT-${date}-${rand}`;
  }
 
  formatCurrency(val: number): string {
    return new Intl.NumberFormat('fr-TN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(val) + ' DT';
  }
 
  get today(): string {
    return new Date().toLocaleDateString('fr-FR');
  }
 
  get notesLength(): number {
    return this.form.get('notes')?.value?.length || 0;
  }
}
