import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApprenantResponse, CodeRemise } from '../../../services/code-remise';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApprenantService } from '../../../services/apprenant-service';
import { LucideAngularModule,Calendar,Phone,Mail,Tag ,Search} from 'lucide-angular';

@Component({
  selector: 'app-financier-apprenants',
  imports: [CommonModule,FormsModule,ReactiveFormsModule,LucideAngularModule],
  templateUrl: './financier-apprenants.html',
  styleUrl: './financier-apprenants.css',
})
export class FinancierApprenants implements OnInit{
  apprenants: ApprenantResponse[] = [];
  apprenantsFiltres: ApprenantResponse[] = [];
  apprenantsPage: ApprenantResponse[] = [];

  recherche = '';
  filtreCodesActifs = false;
  showModal = false;
  successMsg = '';
  errorMsg = '';

  page = 1;
  pageSize = 9;
  total = 0;

  form: FormGroup;
  apprenantsDropdown: ApprenantResponse[] = [];
  rechercheDropdown = '';
  dropdownOuvert = false;
  apprenantSelectionne: ApprenantResponse | null = null;
  codePreview = 'REMISE-' + new Date().getFullYear() + '-XXXXXX';

  constructor(
    private apprenantService: ApprenantService,
    private codeService: CodeRemise,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      apprenantId:    [null, Validators.required],
      pourcentage:    [null, [Validators.required, Validators.min(1), Validators.max(100)]],
      dateExpiration: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.chargerApprenants();
  }

  chargerApprenants(): void {
    this.apprenantService.getApprenantsPourFinancier().subscribe({
      next: (data) => {
        this.apprenants = data;
        this.apprenantsDropdown = data;
        this.appliquerFiltres();
      }
    });
  }

  appliquerFiltres(): void {
    let result = [...this.apprenants];

    if (this.recherche.trim()) {
      const q = this.recherche.toLowerCase();
      result = result.filter(a =>
        `${a.prenom} ${a.nom}`.toLowerCase().includes(q) ||
        a.email.toLowerCase().includes(q)
      );
    }

    if (this.filtreCodesActifs) {
      result = result.filter(a => a.codeRemiseActif != null);
    }

    this.total = result.length;
    this.apprenantsFiltres = result;
    this.paginer();
  }

  paginer(): void {
    const debut = (this.page - 1) * this.pageSize;
    this.apprenantsPage = this.apprenantsFiltres.slice(debut, debut + this.pageSize);
  }

  changerPage(delta: number): void {
    this.page += delta;
    this.paginer();
  }

  get totalPages(): number {
    return Math.ceil(this.total / this.pageSize);
  }

  toggleFiltreCodesActifs(): void {
    this.filtreCodesActifs = !this.filtreCodesActifs;
    this.page = 1;
    this.appliquerFiltres();
  }

  ouvrirModal(apprenant?: ApprenantResponse): void {
    this.showModal = true;
    this.errorMsg = '';
    this.successMsg = '';
    this.form.reset();
    this.apprenantSelectionne = null;

    if (apprenant) {
      this.selectionnerApprenant(apprenant);
    }
  }

  fermerModal(): void {
    this.showModal = false;
    this.dropdownOuvert = false;
    this.apprenantSelectionne = null;
  }

  selectionnerApprenant(a: ApprenantResponse): void {
    this.apprenantSelectionne = a;
    this.form.patchValue({ apprenantId: a.id });
    this.dropdownOuvert = false;
  }

  get dropdownFiltres(): ApprenantResponse[] {
    if (!this.rechercheDropdown.trim()) return this.apprenantsDropdown;
    const q = this.rechercheDropdown.toLowerCase();
    return this.apprenantsDropdown.filter(a =>
      `${a.prenom} ${a.nom}`.toLowerCase().includes(q) ||
      a.email.toLowerCase().includes(q)
    );
  }

  initiales(a: ApprenantResponse): string {
    return (a.prenom[0] + a.nom[0]).toUpperCase();
  }

  soumettre(): void {
    if (this.form.invalid) return;
    this.codeService.creerCode(this.form.value).subscribe({
      next: () => {
        this.fermerModal();
        this.successMsg = 'Code remise créé avec succès !';
        this.chargerApprenants();
        setTimeout(() => this.successMsg = '', 4000);
      },
      error: (err) => {
        this.errorMsg = err.error?.message || 'Erreur lors de la création';
      }
    });
  }

}
