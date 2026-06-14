import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, signal } from '@angular/core';
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

  factures = signal<FactureApprenant[]>([]);
  selectedFacture = signal<FactureApprenant | null>(null);
  isModalOpen = signal(false);
  loading = signal(true);

  // ── Stripe ──
  stripe: any = null;
  cardElement: any = null;
  showPaymentForm = signal(false);
  paymentLoading = signal(false);
  paymentMessage = signal('');
  paymentMessageType = signal<'success' | 'error'>('success');

  montantSaisi = signal<number>(0);
  erreurMontant = signal('');

  currentPage = signal(1);
  itemsPerPage = 5;

  private apiUrl = 'http://localhost:8081/api/payment';

  constructor(
    private apprenantService: ApprenantService,
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.apprenantService.getMesFactures().subscribe({
      next: (data) => { this.factures.set(data); this.loading.set(false); },
      error: (err) => { console.error(err); this.loading.set(false); }
    });
  }

  ouvrirFacture(facture: FactureApprenant): void {
    this.selectedFacture.set(facture);
    this.isModalOpen.set(true);
    this.showPaymentForm.set(false);
    this.paymentMessage.set('');
    this.stripe = null;
    this.cardElement = null;
  }

  fermerModal(): void {
    this.isModalOpen.set(false);
    this.selectedFacture.set(null);
    this.showPaymentForm.set(false);
    this.paymentMessage.set('');
    this.paymentLoading.set(false);
    this.stripe = null;
    this.cardElement = null;
  }

  async ouvrirPaiement(): Promise<void> {
    this.showPaymentForm.set(true);
    this.paymentMessage.set('');
    this.montantSaisi.set(this.selectedFacture()?.montantRestant ?? 0);
    this.erreurMontant.set('');
    this.stripe = await loadStripe('pk_test_51TJU6iAbxlwx31u9z46yC3ZnmgmRYXET6J5hYLCCm27f6XA69fp9yOwca5zOFlkkxT8HuYeAnnhitpJqX4xbdJOt00nZaTZCrr');
    const elements = this.stripe.elements({ locale: 'fr' });
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

  async payer(): Promise<void> {
    const facture = this.selectedFacture();
    if (!facture) return;

    if (this.montantSaisi() <= 0 || this.erreurMontant()) {
      this.erreurMontant.set('Veuillez saisir un montant valide');
      return;
    }

    this.paymentLoading.set(true);
    this.paymentMessage.set('');

    this.http.post<{ clientSecret: string }>(`${this.apiUrl}/create-intent`, {
      montant: this.montantSaisi(),
      factureId: facture.id
    }).subscribe({
      next: async (res) => {
        const result = await this.stripe.confirmCardPayment(res.clientSecret, {
          payment_method: { card: this.cardElement }
        });

        if (result.error) {
          this.paymentMessage.set(result.error.message);
          this.paymentMessageType.set('error');
          this.paymentLoading.set(false);
        } else {
          this.http.post(`${this.apiUrl}/confirm`, {
            factureId: facture.id,
            montantPaye: this.montantSaisi()
          }).subscribe({
            next: () => {
              this.paymentMessage.set('Paiement enregistré !');
              this.paymentMessageType.set('success');
              this.paymentLoading.set(false);
              this.showPaymentForm.set(false);

              this.apprenantService.getMesFactures().subscribe({
                next: (data) => {
                  this.factures.set(data);
                  const updated = data.find(f => f.id === facture.id);
                  if (updated) this.selectedFacture.set(updated);
                }
              });
            },
            error: (err) => {
              this.paymentMessage.set(err.error?.error || 'Erreur de confirmation');
              this.paymentMessageType.set('error');
              this.paymentLoading.set(false);
            }
          });
        }
      },
      error: (err) => {
        this.paymentMessage.set(err.error?.error || 'Erreur serveur');
        this.paymentMessageType.set('error');
        this.paymentLoading.set(false);
      }
    });
  }

  onMontantChange(event: Event): void {
    const val = parseFloat((event.target as HTMLInputElement).value);
    const restant = this.selectedFacture()?.montantRestant ?? 0;
    if (isNaN(val) || val <= 0) {
      this.erreurMontant.set('Le montant doit être supérieur à 0');
      this.montantSaisi.set(0);
    } else if (val > restant) {
      this.erreurMontant.set(`Maximum : ${this.formatCurrency(restant)}`);
      this.montantSaisi.set(0);
    } else {
      this.erreurMontant.set('');
      this.montantSaisi.set(val);
    }
  }

  get soldeTotalRestant(): number {
    return this.factures()
      .filter(f => f.statut !== 'PAYEE')
      .reduce((sum, f) => sum + (f.montantRestant || 0), 0);
  }

  get nbFacturesEnAttente(): number {
    return this.factures().filter(f => f.statut !== 'PAYEE').length;
  }

  get totalPages(): number {
    return Math.ceil(this.factures().length / this.itemsPerPage) || 1;
  }

  get currentItems(): FactureApprenant[] {
    const start = (this.currentPage() - 1) * this.itemsPerPage;
    return this.factures().slice(start, start + this.itemsPerPage);
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) this.currentPage.set(page);
  }

  getStatutClass(statut: string): string {
    const map: Record<string, string> = {
      PAYEE: 'bg-green-100 text-green-800',
      IMPAYEE: 'bg-red-100 text-red-800',
      EN_ATTENTE: 'bg-blue-100 text-blue-800',
      EMISE: 'bg-blue-100 text-blue-800',
      PARTIELLE: 'bg-amber-100 text-amber-800',
      PARTIELLEMENT_PAYEE: 'bg-amber-100 text-amber-800',
    };
    return map[statut] ?? 'bg-gray-100 text-gray-600';
  }

  getStatutLabel(statut: string): string {
    const map: Record<string, string> = {
      PAYEE: 'Payée', IMPAYEE: 'Impayée',
      EN_ATTENTE: 'En attente', EMISE: 'Émise',
      PARTIELLE: 'Partielle', PARTIELLEMENT_PAYEE: 'Partielle',
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