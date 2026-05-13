import { Component } from '@angular/core';
import { FactureResponseDTO, FactureService } from '../../../services/facture-service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-rappel',
  imports: [CommonModule,RouterModule],
  templateUrl: './rappel.html',
  styleUrl: './rappel.css',
})
export class Rappel {
   // --- Factures en retard ---
  allFacturesRetard: FactureResponseDTO[] = [];
  currentPageRetard = 1;
  itemsPerPage = 5;

  // --- Échéances proches ---
  allEcheances: FactureResponseDTO[] = [];
  currentPageEcheance = 1;

  constructor(private factureService: FactureService) {}

  ngOnInit(): void {
    this.loadFacturesRetard();
    this.loadEcheancesProches();
  }

  // ==================== RETARD ====================
  loadFacturesRetard(): void {
    this.currentPageRetard = 1;
    this.factureService.getFacturesEnRetard().subscribe({
      next: (data) => this.allFacturesRetard = data,
      error: (err) => console.error(err)
    });
  }

  get totalPagesRetard(): number {
    return Math.max(1, Math.ceil(this.allFacturesRetard.length / this.itemsPerPage));
  }

  get currentItemsRetard(): FactureResponseDTO[] {
    const start = (this.currentPageRetard - 1) * this.itemsPerPage;
    return this.allFacturesRetard.slice(start, start + this.itemsPerPage);
  }

  goToPageRetard(page: number): void {
    if (page >= 1 && page <= this.totalPagesRetard) {
      this.currentPageRetard = page;
    }
  }

  // ==================== ÉCHÉANCES ====================
  loadEcheancesProches(): void {
    this.currentPageEcheance = 1;
    this.factureService.getEcheancesProches().subscribe({
      next: (data) => this.allEcheances = data,
      error: (err) => console.error(err)
    });
  }

  get totalPagesEcheance(): number {
    return Math.max(1, Math.ceil(this.allEcheances.length / this.itemsPerPage));
  }

  get currentItemsEcheance(): FactureResponseDTO[] {
    const start = (this.currentPageEcheance - 1) * this.itemsPerPage;
    return this.allEcheances.slice(start, start + this.itemsPerPage);
  }

  goToPageEcheance(page: number): void {
    if (page >= 1 && page <= this.totalPagesEcheance) {
      this.currentPageEcheance = page;
    }
  }

  // ==================== ACTIONS ====================
  relancer(id: number): void {
    this.factureService.relancerFacture(id).subscribe({
      next: () => alert('Relance envoyée avec succès'),
      error: (err) => console.error(err)
    });
  }

  envoyerAlerte(id: number): void {
    this.factureService.envoyerAlerte(id).subscribe({
      next: () => alert('Alerte envoyée avec succès'),
      error: (err) => console.error(err)
    });
  }

  // ==================== HELPERS ====================
  joursRetard(dateEcheance: string): number {
    const diff = new Date().getTime() - new Date(dateEcheance).getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  }

  joursRestants(dateEcheance: string): number {
    const diff = new Date(dateEcheance).getTime() - new Date().getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }

  // Badge couleur selon urgence (échéances proches)
  getUrgenceClass(dateEcheance: string): string {
    const jours = this.joursRestants(dateEcheance);
    if (jours <= 2) return 'bg-red-100 text-red-800';
    if (jours <= 5) return 'bg-orange-100 text-orange-800';
    return 'bg-yellow-100 text-yellow-800';
  }

  getUrgenceLabel(dateEcheance: string): string {
    const jours = this.joursRestants(dateEcheance);
    if (jours <= 2) return `Urgent (${jours}j)`;
    if (jours <= 5) return `Moyenne (${jours}j)`;
    return `Faible (${jours}j)`;
  }

  getStatutClass(statut: string): string {
    switch (statut) {
      case 'PAYEE':      return 'bg-green-100 text-green-800';
      case 'IMPAYEE':    return 'bg-red-100 text-red-800';
      case 'EN_ATTENTE':
      case 'EMISE':      return 'bg-blue-100 text-blue-800';
      case 'PARTIELLE':  return 'bg-amber-100 text-amber-800';
      default:           return 'bg-gray-100 text-gray-600';
    }
  }

  getStatutLabel(statut: string): string {
    const map: Record<string, string> = {
      PAYEE: 'Payé', IMPAYEE: 'Impayé',
      EN_ATTENTE: 'En attente', EMISE: 'Émise', PARTIELLE: 'Partiel'
    };
    return map[statut] ?? statut;
  }

  formatCurrency(val: number): string {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(val);
  }


}
