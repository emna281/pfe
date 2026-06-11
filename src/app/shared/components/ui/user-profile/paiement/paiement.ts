import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { ApprenantService, FactureApprenant } from '../../../../../services/apprenant-service';
import { HttpClient } from '@angular/common/http';
import { loadStripe } from '@stripe/stripe-js';

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

  // ── Stripe ──
  stripe: any = null;
  cardElement: any = null;
  showPaymentForm = false;
  paymentLoading = false;
  paymentMessage = '';
  paymentMessageType: 'success' | 'error' = 'success';

  currentPage = 1;
  itemsPerPage = 5;

  private apiUrl = 'http://localhost:8081/api/payment';

  constructor(private apprenantService: ApprenantService, private http: HttpClient,private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.apprenantService.getMesFactures().subscribe({
      next: (data) => { this.factures = data; this.loading = false; },
      error: (err) => { console.error(err); this.loading = false; }
    });
  }

  // ── Ouvrir modal facture ──
  ouvrirFacture(facture: FactureApprenant): void {
    this.selectedFacture = facture;
    this.isModalOpen = true;
    this.showPaymentForm = false;
    this.paymentMessage = '';
    this.stripe = null;
    this.cardElement = null;
  }

  fermerModal(): void {
    this.isModalOpen = false;
    this.selectedFacture = null;
    this.showPaymentForm = false;
    this.paymentMessage = '';
    this.paymentLoading = false;
    this.stripe = null;
    this.cardElement = null;
  }

  // ── Ouvrir formulaire Stripe ──
  async ouvrirPaiement(): Promise<void> {
    this.showPaymentForm = true;
    this.paymentMessage = '';

    this.stripe = await loadStripe('pk_test_51TJU6iAbxlwx31u9z46yC3ZnmgmRYXET6J5hYLCCm27f6XA69fp9yOwca5zOFlkkxT8HuYeAnnhitpJqX4xbdJOt00nZaTZCrr'); 
      const elements = this.stripe.elements({
      locale: 'fr'
    });

    setTimeout(() => {
      this.cardElement = elements.create('card', {
        hidePostalCode: true, 
        style: {
          base: {
            fontSize: '15px',
            color: '#1e293b',
            '::placeholder': { color: '#94a3b8' }
          }
        }
      });
      this.cardElement.mount('#card-stripe');
    }, 150);
  }

  // ── Payer ──
  async payer(): Promise<void> {
    if (!this.selectedFacture) return;
    this.paymentLoading = true;
    this.paymentMessage = '';
    this.cdr.detectChanges(); 
    this.http.post<{ clientSecret: string }>(`${this.apiUrl}/create-intent`, {
      montant: this.selectedFacture.montantRestant,
      factureId: this.selectedFacture.id
    }).subscribe({
      next: async (res) => {
        const result = await this.stripe.confirmCardPayment(res.clientSecret, {
          payment_method: { card: this.cardElement }
        });

        if (result.error) {
          this.paymentMessage = result.error.message;
          this.paymentMessageType = 'error';
          this.paymentLoading = false;
          this.cdr.detectChanges(); 
        } else {
          this.http.post(`${this.apiUrl}/confirm`, {
            factureId: this.selectedFacture!.id
          }).subscribe({
            next: () => {
              this.paymentMessage = 'Paiement réussi !';
              this.paymentMessageType = 'success';
              this.paymentLoading = false;
              this.showPaymentForm = false;

              // Mettre à jour localement la facture
              this.selectedFacture!.statut = 'PAYEE';
              this.selectedFacture!.montantPaye = this.selectedFacture!.montantTTC;
              this.selectedFacture!.montantRestant = 0;

              // Mettre à jour dans la liste aussi
              const idx = this.factures.findIndex(f => f.id === this.selectedFacture!.id);
              if (idx !== -1) {
                this.factures[idx] = { ...this.selectedFacture! };
              }
              this.cdr.detectChanges(); 
            },
            error: () => {
              this.paymentMessage = 'Paiement reçu mais erreur de confirmation.';
              this.paymentMessageType = 'error';
              this.paymentLoading = false;
              this.cdr.detectChanges(); 
            }
          });
        }
      },
      error: (err) => {
        this.paymentMessage = err.error?.error || 'Erreur serveur';
        this.paymentMessageType = 'error';
        this.paymentLoading = false;
        this.cdr.detectChanges(); 
      }
    });
  }

  // ── Helpers ──
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