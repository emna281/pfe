import { Component ,ChangeDetectorRef} from '@angular/core';
import { FormationAdminDTO, FormationService } from '../../../services/formation-service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormulaireSession } from '../formulaires/formulaire-session/formulaire-session';

@Component({
  selector: 'app-detail-formation',
  imports: [CommonModule,FormulaireSession],
  templateUrl: './detail-formation.html',
  styleUrl: './detail-formation.css',
})
export class DetailFormation {
  formation!:FormationAdminDTO;
  
  constructor(private formationService:FormationService,private route : ActivatedRoute,private router :Router,private cdr:ChangeDetectorRef) {}
  
  ngOnInit(){
    const id= this.route.snapshot.params['id'];
    this.formationService.getFormationById(id).subscribe(f=>{
      this.formation=f;
      this.buildInfoFields();
      this.cdr.detectChanges();
    });
  }

  closeModal() {
    this.router.navigate(['/formation']);
  }
  getInitiales(titre?: string): string {
    if (!titre) return '??';
    return titre.split(' ').slice(0, 2).map(w => w[0]?.toUpperCase() ?? '').join('');
  }

  activeTab = 'infos';
  



  tabs = [
    { key: 'infos',       label: 'Informations' },
    { key: 'sessions',    label: 'Sessions' },
    { key: 'competences', label: 'Compétences' },
  ];
  infoFields: { label: string; value: string }[] = [];
  

  private buildInfoFields(): void {
    if (!this.formation) { this.infoFields = []; return; }
    const f = this.formation;
    this.infoFields = [
      { label: 'Description',  value: f.description ?? '' },
      { label: 'Public cible', value: f.publicCible ?? '' },
      { label: 'Prérequis',   value: f.prerequis ?? '' },
      { label: 'Programme',   value: f.programme ?? '' },
      { label: 'Prix / jour', value: this.getPrixParJour(f) },
    ];
  }

  private getPrixParJour(f: FormationAdminDTO): string {
    if (!f.prixPublic || !f.dureeJours) return '—';
    return Math.round(f.prixPublic / f.dureeJours) + ' DT / jour';
  }
  
  isFormulaireSessionOpen=false; 
  selectedFormationCode: string = '';
  onAddSession(): void {
    this.isFormulaireSessionOpen=true;    
    this.selectedFormationCode=this.formation?.code;
  }

  fermerFormulaireSession (){
    this.isFormulaireSessionOpen=false;
    const id=this.route.snapshot.params['id'];
    this.formationService.getFormationById(id).subscribe(f=>{
      this.formation=f;
      this.buildInfoFields();
      this.cdr.detectChanges();
    })
  }

  onViewSession(code: string): void {
    this.router.navigate(['/session'], { queryParams: { code } });
  }

  onToggleActivation(): void {
    if (!this.formation) return;
    this.formationService.toggleActivation(this.formation.id).subscribe({
      next: (updated) => {
        if (this.formation) {
          this.formation = { ...this.formation, actif: updated.actif };
          this.buildInfoFields();
        }
      },
      error: (err) => console.error('Erreur toggle activation', err),
    });
  }
  

}
