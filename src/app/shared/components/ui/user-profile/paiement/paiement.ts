import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ApprenantService, FactureApprenant } from '../../../../../services/apprenant-service';
import { PdfExportService } from '../../../../services/pdf-export.service';

@Component({
  selector: 'app-paiement',
  imports: [CommonModule],
  templateUrl: './paiement.html',
  styleUrl: './paiement.css',
})
export class Paiement {
  factures: FactureApprenant[] = [];
  selectedFacture: FactureApprenant | null = null;
  isModalOpen = false;
  loading = true;

  currentPage = 1;
  itemsPerPage = 5;

  constructor(private apprenantService: ApprenantService ,private pdfService:PdfExportService) {}

  ngOnInit(): void {
    this.apprenantService.getMesFactures().subscribe({
      next: (data) => { this.factures = data; this.loading = false; },
      error: (err) => { console.error(err); this.loading = false; }
    });
  }

  get soldeTotalRestant(): number {
    return this.factures
      .filter(f => f.statut !== 'PAYEE')
      .reduce((sum, f) => sum + (f.montantRestant || 0), 0);
  }
  get nbFacturesEnAttente(): number {
    return this.factures.filter(f => f.statut !== 'PAYEE').length;
  }

  get totalPages(): number {
    return Math.ceil(this.factures.length / this.itemsPerPage) || 1;
  }

  get currentItems(): FactureApprenant[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.factures.slice(start, start + this.itemsPerPage);
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) this.currentPage = page;
  }
  ouvrirFacture(facture: FactureApprenant): void {
    this.selectedFacture = facture;
    this.isModalOpen = true;
  }

  fermerModal(): void {
    this.isModalOpen = false;
    this.selectedFacture = null;
  }

  getStatutClass(statut: string): string {
    const map: Record<string, string> = {
      PAYEE: 'bg-green-100 text-green-800',
      IMPAYEE: 'bg-red-100 text-red-800',
      EN_ATTENTE: 'bg-blue-100 text-blue-800',
      EMISE: 'bg-blue-100 text-blue-800',
      PARTIELLE: 'bg-amber-100 text-amber-800',
    };
    return map[statut] ?? 'bg-gray-100 text-gray-600';
  }
  getStatutLabel(statut: string): string {
    const map: Record<string, string> = {
      PAYEE: 'Payée', IMPAYEE: 'Impayée',
      EN_ATTENTE: 'En attente', EMISE: 'Émise', PARTIELLE: 'Partielle',
    };
    return map[statut] ?? statut;
  }

  getStatutAlertClass(statut: string): string {
    const map: Record<string, string> = {
      PAYEE: 'bg-green-50 text-green-800 border border-green-200',
      IMPAYEE: 'bg-red-50 text-red-800 border border-red-200',
      EN_ATTENTE: 'bg-blue-50 text-blue-800 border border-blue-200',
      EMISE: 'bg-blue-50 text-blue-800 border border-blue-200',
      PARTIELLE: 'bg-amber-50 text-amber-800 border border-amber-200',
    };
    return map[statut] ?? 'bg-gray-50 text-gray-600';
  }
  getStatutAlertMessage(facture: FactureApprenant): string {
    switch (facture.statut) {
      case 'PAYEE': return '✓ Facture entièrement réglée';
      case 'PARTIELLE': return `Restant dû : ${this.formatCurrency(facture.montantRestant)}`;
      default: return `Montant dû : ${this.formatCurrency(facture.montantTTC)} — Échéance : ${this.formatDate(facture.dateEcheance)}`;
    }
  }

  formatCurrency(val: number): string {
    return new Intl.NumberFormat('fr-TN', { minimumFractionDigits: 2 }).format(val) + ' DT';
  }

  formatDate(date: string): string {
    if (!date) return '—';
    return new Date(date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' });
  }

}
