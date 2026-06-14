import { Component ,ChangeDetectorRef, OnInit} from '@angular/core';

import { CheckboxComponent } from '../../ui/checkbox.component';
import { FactureResponseDTO, FactureService } from '../../../../services/facture-service';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormulaireFacture } from '../../formulaires/formulaire-facture/formulaire-facture';
import { DatailFacture } from '../../datail-facture/datail-facture';
import { PdfExportService } from '../../../services/pdf-export.service';
import { FormulairePaiement } from '../../formulaires/formulaire-paiement/formulaire-paiement';
import { ConfirmationModal } from '../../ui/confirmation-modal/confirmation-modal';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-table-facture',
  imports: [CheckboxComponent,DecimalPipe,FormulaireFacture,DatailFacture ,FormulairePaiement,ConfirmationModal,CommonModule,FormsModule],
  templateUrl: './table-facture.html',
  styleUrl: './table-facture.css',
})
export class TableFacture implements OnInit{
  tableRowData: FactureResponseDTO[]=[]
  isLoading:boolean=false;
  selectedRows: number[] = [];
  selectAll: boolean = false;
  errorMessage:string='';
  selectedFactureDetail: FactureResponseDTO | null = null;
  isDetailOpen = false;
  isPaiementOpen = false;

  paiementData: any = {
  datePaiement: new Date().toISOString().substring(0, 10),
  montant: null,
  modePaiement: '',
  codeRemise: null 
};

  selectedFacturePaiement: FactureResponseDTO | null = null;
  
  private factureEnAttente?: FactureResponseDTO;
  private statutEnAttente?: string;
  currentPage = 1;
  pageSize = 20;
  constructor(private factureService:FactureService ,private cdr: ChangeDetectorRef ,private pdfExportService: PdfExportService){}

  ouvrirDetail(facture: FactureResponseDTO) {
    this.selectedFactureDetail = facture;
    this.isDetailOpen = true;
  }

  fermerDetail() {
    this.isDetailOpen = false;
    this.selectedFactureDetail = null;
  }
  isFormulaireOpen = false;
  selectedFacture: FactureResponseDTO | null = null;
  openFormulaire(facture: FactureResponseDTO) {
    this.selectedFacture = facture; 
    this.isFormulaireOpen = true;
  }
  fermerFormulaire() {
    this.isFormulaireOpen = false;
    this.selectedFacture = null;
  }

  ouvrirPaiement(facture: FactureResponseDTO) {
    this.selectedFacturePaiement = facture;
    this.isPaiementOpen = true;
  }
  fermerPaiement() {
    this.isPaiementOpen = false;
    this.selectedFacturePaiement = null;
  }
  onPaiementAjoute(factureMAJ?: FactureResponseDTO): void {
  if (factureMAJ) {
    // Mise à jour immédiate sans recharger toute la liste
    this.tableRowData = this.tableRowData.map(f =>
      f.id === factureMAJ.id ? factureMAJ : f
    );
    // Si PAYEE → retirer de la liste (archivée)
    if (factureMAJ.statut === 'PAYEE') {
      this.tableRowData = this.tableRowData.filter(f => f.id !== factureMAJ.id);
    }
    this.cdr.detectChanges();
  } else {
    this.loadFactures();
  }
  this.fermerPaiement();
}



  ngOnInit(): void {
    this.loadFactures();
  }
  loadFactures(): void {
  this.isLoading = true;
  this.factureService.getAllFactures().subscribe({
    next: (data) => {
      this.tableRowData = data;
      this.isLoading = false;
      this.cdr.detectChanges();
    },
    error: (err) => {
      console.error('Erreur de chargement', err);
      this.errorMessage = 'Erreur lors du chargement';
      this.isLoading = false;
    }
  });
}

  handleSelectAll() {
    this.selectAll = !this.selectAll;
    if (this.selectAll) {
      this.selectedRows = this.tableRowData.map(row => row.id);
    } else {
      this.selectedRows = [];
    }
  }

  handleRowSelect(id: number) {
    if (this.selectedRows.includes(id)) {
      this.selectedRows = this.selectedRows.filter(rowId => rowId !== id);
    } else {
      this.selectedRows = [...this.selectedRows, id];
    }
    this.selectAll = this.selectedRows.length === this.tableRowData.length;
  }


  getBadgeColor(type: string): 'success' | 'warning' | 'error' | 'info' | 'light' {
  if (type === 'EMISE')               return 'info';
  if (type === 'PARTIELLEMENT_PAYEE') return 'warning';
  if (type === 'PAYEE')               return 'success';
  if (type === 'ANNULEE')             return 'error';
  return 'light';
}


  modalSuppressionVisisble=false;
  factureASupprimer:any=null;
  modalSuppressionConfig = {
  titre: 'Confirmation',
  message: 'Voulez-vous vraiment supprimer cette facture ?',
  labelConfirmer: 'Oui, supprimer',
  labelAnnuler: 'Annuler',
  type: 'danger' as const
};
  ouvrirConfirmationModal(facture:FactureResponseDTO){
    this.modalSuppressionVisisble=true;
    this.factureASupprimer=facture;
  }
  confirmerSuppression(){
    console.log('supprimer',this.factureASupprimer);
    if (this.factureASupprimer) {
      this.factureService.archiverFacture(this.factureASupprimer.id).subscribe({
      next: () => {
        this.loadFactures(); 
      },
      error: (err) => console.error('Erreur archivage', err)
    });
    this.modalSuppressionVisisble=false;
    this.factureASupprimer = null;
    }
  }
    annulerSuppression(){
    this.modalSuppressionVisisble=false;
    this.factureASupprimer=null;
  }

  changerStatut(facture: FactureResponseDTO, nouveauStatut: string): void {
    const messages: { [key: string]: string } = { 
      'PAYEE': 'Marquer cette facture comme PAYÉE ?',
      'ANNULEE': 'Voulez-vous annuler cette facture ?'
    };

    
      this.factureService.updateStatut(facture.id, nouveauStatut).subscribe({
        next: () => {
          this.loadFactures();
          this.selectAll = false;
          this.cdr.detectChanges();
        },
        error: (err) => console.error('Erreur changement statut', err)
      });
    
  }
  async exporterSelection():Promise<void>{
    if(this.selectedRows.length===0){
      alert('Veuillez sélectionner au moins une facture.');
      return;
    }
    const facturesSelectionees=this.tableRowData.filter(f=>this.selectedRows.includes(f.id));
    await this.pdfExportService.exportFactures(facturesSelectionees);
  }
  get totalPages(): number {
  return Math.ceil(this.tableRowData.length / this.pageSize);
}

get paginatedData(): FactureResponseDTO[] {
  const start = (this.currentPage - 1) * this.pageSize;
  return this.tableRowData.slice(start, start + this.pageSize);
}

getDebut(): number {
  return this.tableRowData.length === 0 ? 0 : (this.currentPage - 1) * this.pageSize + 1;
}

getFin(): number {
  return Math.min(this.currentPage * this.pageSize, this.tableRowData.length);
}

nextPage(): void {
  if (this.currentPage < this.totalPages) this.currentPage++;
}

prevPage(): void {
  if (this.currentPage > 1) this.currentPage--;
}

onPageSizeChange(): void {
  this.currentPage = 1;
}



}
