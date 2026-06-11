import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { InscriptionResponseDTO, InscriptionService } from '../../../services/inscription-service';
import { FactureCreateDTO, FactureResponseDTO, FactureService } from '../../../services/facture-service';
import { Boutton } from '../../../shared/components/button/boutton/boutton';
import { DatailFacture } from '../../../shared/components/datail-facture/datail-facture';
import { LucideAngularModule ,Eye,FileClock,TrendingUp,CalendarClock,Percent} from 'lucide-angular';
import { DashboardCentreDTO, DashboardService, RentabiliteSessionDTO } from '../../../services/dashboard-service';
import { FormsModule } from '@angular/forms';
import { AuthResponse, AuthService } from '../../../shared/services/auth.service';
type Periode = 'mois' | 'trimestre' | 'semestre' | 'annee' | 'custom';
@Component({
  selector: 'app-financier-dashboard',
  imports: [CommonModule,RouterModule,Boutton,DatailFacture,LucideAngularModule,FormsModule],
  templateUrl: './financier-dashboard.html',
  styleUrl: './financier-dashboard.css',
})
export class FinancierDashboard {
  
  factures: FactureResponseDTO[] = [];
  totalFacturationAttente = 0;
  revenuMois = 0;
  nbFactures = 0;
  tauxRecouvrement = 0;
  nomFinancier = '';
  today = new Date();
  constructor(
    private factureService: FactureService,
    private inscriptionService: InscriptionService,
    private router:Router,
    private dashboardService: DashboardService,
    private authService:AuthService
  ) {}
 
  ngOnInit(): void {
    const user = this.authService.getUser();
    this.nomFinancier = user?.prenom ?? user?.nom ?? 'Financier';

    this.loadFactures();
    this.appliquerPeriode('mois');
  }
 
  loadFactures(): void {
    this.currentPage = 1;
    this.factureService.getAllFactures().subscribe({
      next: (data) => {
        this.allFactures = data;
        this.nbFactures = data.length;
        this.totalFacturationAttente = data
          .filter(f => f.statut === 'EN_ATTENTE' || f.statut === 'EMISE')
          .reduce((sum, f) => sum + (f.montantRestant || 0), 0);
        this.revenuMois = data
          .filter(f => f.statut === 'PAYEE')
          .reduce((sum, f) => sum + (f.montantTTC || 0), 0);
        const payees = data.filter(f => f.statut === 'PAYEE').length;
        this.tauxRecouvrement = data.length > 0
          ? Math.round((payees / data.length) * 100)
          : 0;
      },
      error: (err) => console.error(err)
    });
  }
 
  
 
  creerFacture(inscription: InscriptionResponseDTO): void {
    const request: FactureCreateDTO = {
      inscriptionId: inscription.id,
      dateEcheance: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        .toISOString().substring(0, 10),
    };
    this.factureService.creerFacture(request).subscribe({
      next: () => {
        this.loadFactures();
      },
      error: (err) => console.error(err)
    });
  }
 
  getStatutClass(statut: string): string {
    switch (statut) {
      case 'PAYEE':     return 'bg-green-100 text-green-800';
      case 'IMPAYEE':   return 'bg-red-100 text-red-800';
      case 'EN_ATTENTE':
      case 'EMISE':     return 'bg-blue-100 text-blue-800';
      case 'PARTIELLE': return 'bg-amber-100 text-amber-800';
      default:          return 'bg-gray-100 text-gray-600';
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
    return new Intl.NumberFormat('fr-TN', { style: 'currency', currency: 'TND' }).format(val);
  }
  currentList:any[]=[];
  allItems:any[]=[];
  currentPage = 1;
  itemsPerPage = 5;
  
  // --- Pagination inscriptions ---

 goToPage(page: number) {        
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }



// --- Pagination factures ---
allFactures: FactureResponseDTO[] = []; // liste complète ici

get totalPages(): number {
  if (!this.factures) return 1;
  return Math.ceil(this.allFactures.length / this.itemsPerPage);
}

get currentItems(): FactureResponseDTO[] {
  if (!this.factures) return [];
  
  const start = (this.currentPage - 1) * this.itemsPerPage;
  return this.allFactures.slice(start, start + this.itemsPerPage);
}

creerFacturePour(insc: InscriptionResponseDTO): void {
     this.router.navigate(['/financier/creerFacture'], {
       queryParams: { inscriptionId: insc.id }
    });
   }
  selectedFactureDetail: FactureResponseDTO | null = null;
  isDetailOpen=false;
  ouvrirDetail(facture: FactureResponseDTO) {
    this.selectedFactureDetail = facture;
    this.isDetailOpen = true;
  }

  fermerDetail() {
    this.isDetailOpen = false;
    this.selectedFactureDetail = null;
  }


  dashboard: DashboardCentreDTO | null = null;
    isLoadingDashboard = false;
    errorMsg = '';
  
    // Période
    periodeSelectionnee: Periode = 'mois';
    dateDebut = '';
    dateFin = '';
  
    // Session détail
    sessionSelectionnee: RentabiliteSessionDTO | null = null;
  
    periodes: { value: Periode; label: string }[] = [
      { value: 'mois',      label: 'Ce mois' },
      { value: 'trimestre', label: 'Ce trimestre' },
      { value: 'semestre',  label: 'Ce semestre' },
      { value: 'annee',     label: 'Cette année' },
      { value: 'custom',    label: 'Personnalisé' }
    ];
  
    appliquerPeriode(periode: Periode): void {
      this.periodeSelectionnee = periode;
      const today = new Date();
      const y = today.getFullYear();
      const m = today.getMonth();
  
      switch (periode) {
        case 'mois':
          this.dateDebut = new Date(y, m, 1).toISOString().split('T')[0];
          this.dateFin   = new Date(y, m + 1, 0).toISOString().split('T')[0];
          break;
        case 'trimestre':
          const t = Math.floor(m / 3);
          this.dateDebut = new Date(y, t * 3, 1).toISOString().split('T')[0];
          this.dateFin   = new Date(y, t * 3 + 3, 0).toISOString().split('T')[0];
          break;
        case 'semestre':
          const s = m < 6 ? 0 : 6;
          this.dateDebut = new Date(y, s, 1).toISOString().split('T')[0];
          this.dateFin   = new Date(y, s + 6, 0).toISOString().split('T')[0];
          break;
        case 'annee':
          this.dateDebut = `${y}-01-01`;
          this.dateFin   = `${y}-12-31`;
          break;
      }
  
      if (periode !== 'custom') this.charger();
    }
  
    charger(): void {
      if (!this.dateDebut || !this.dateFin) return;
      this.isLoadingDashboard = true;
      this.errorMsg = '';
  
      this.dashboardService.getDashboardCentre(this.dateDebut, this.dateFin).subscribe({
        next: (data) => {
          this.dashboard = data;
          this.isLoadingDashboard = false;
        },
        error: () => {
          this.errorMsg = 'Erreur lors du chargement du dashboard';
          this.isLoadingDashboard = false;
        }
      });
    }
  
    // ── Helpers graphique ─────────────────────────────────────────────────────
    getBarWidth(valeur: number|null, max: number): string {
      if (max === 0|| valeur == null) return '0%';
      return Math.min((valeur / max) * 100, 100) + '%';
    }
  
    getMaxGraphique(): number {
      if (!this.dashboard) return 0;
      const allValues = [
        ...this.dashboard.graphiqueRevenus.map(p => p.valeur?? 0),
        ...this.dashboard.graphiqueCharges.map(p => p.valeur?? 0)
      ];
      return Math.max(...allValues, 1);
    }
  
    // ── Helpers UI ────────────────────────────────────────────────────────────
    getTauxClass(taux: number): string {
      if (taux >= 30) return 'text-green-600';
      if (taux >= 0)  return 'text-yellow-600';
      return 'text-red-600';
    }
  
    getResultatClass(resultat: number): string {
      if (resultat > 0)  return 'text-green-600';
      if (resultat === 0) return 'text-gray-600';
      return 'text-red-600';
    }
  
    getRentabiliteLabel(taux: number): string {
      if (taux >= 30)  return '✅ Rentable';
      if (taux >= 0)   return '⚠️ Faible';
      return '❌ Déficitaire';
    }
  
    getRentabiliteBadge(taux: number): string {
      if (taux >= 30) return 'bg-green-100 text-green-700 border border-green-200';
      if (taux >= 0)  return 'bg-yellow-100 text-yellow-700 border border-yellow-200';
      return 'bg-red-100 text-red-700 border border-red-200';
    }
  
    ouvrirSession(session: RentabiliteSessionDTO): void {
      this.sessionSelectionnee = this.sessionSelectionnee?.sessionId === session.sessionId
        ? null
        : session;
    }
    

}
