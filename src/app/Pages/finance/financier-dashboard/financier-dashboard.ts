import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { InscriptionResponseDTO, InscriptionService } from '../../../services/inscription-service';
import { FactureCreateDTO, FactureResponseDTO, FactureService } from '../../../services/facture-service';
import { Boutton } from '../../../shared/components/button/boutton/boutton';

@Component({
  selector: 'app-financier-dashboard',
  imports: [CommonModule,RouterModule,Boutton],
  templateUrl: './financier-dashboard.html',
  styleUrl: './financier-dashboard.css',
})
export class FinancierDashboard {
  
  factures: FactureResponseDTO[] = [];
  inscriptionsNonFacturees: InscriptionResponseDTO[] = [];
 
  totalFacturationAttente = 0;
  revenuMois = 0;
  nbFactures = 0;
  tauxRecouvrement = 0;
 
  constructor(
    private factureService: FactureService,
    private inscriptionService: InscriptionService,
    private router:Router
  ) {}
 
  ngOnInit(): void {
    this.loadFactures();
    this.loadInscriptionsNonFacturees();
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
 
  loadInscriptionsNonFacturees(): void {
    this.currentPageInsc = 1;
    this.inscriptionService.getInscriptionsNonFacturees().subscribe({
      next: (data) => this.inscriptionsNonFacturees = data,
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
        this.loadInscriptionsNonFacturees();
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
currentPageInsc = 1;
itemsPerPageInsc = 5;

get totalPagesInsc(): number {
  if (!this.inscriptionsNonFacturees) return 1;
  return Math.ceil(this.inscriptionsNonFacturees.length / this.itemsPerPageInsc);
}

get currentInscriptions(): InscriptionResponseDTO[] {
  if (!this.inscriptionsNonFacturees) return [];
  const start = (this.currentPageInsc - 1) * this.itemsPerPageInsc;
  return this.inscriptionsNonFacturees.slice(start, start + this.itemsPerPageInsc);
}
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
goToPageInsc(page: number) {
  if (page >= 1 && page <= this.totalPagesInsc) {
    this.currentPageInsc = page;
  }
}
creerFacturePour(insc: InscriptionResponseDTO): void {
     this.router.navigate(['/financier/creerFacture'], {
       queryParams: { inscriptionId: insc.id }
    });
   }

}
