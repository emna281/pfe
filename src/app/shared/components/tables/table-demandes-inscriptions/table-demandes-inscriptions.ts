import { Component ,ChangeDetectorRef, OnInit} from '@angular/core';
import { Badge } from '../../ui/badge/badge';
import { CheckboxComponent } from '../../ui/checkbox.component';

import { CommonModule } from '@angular/common';
import { ActionDemande, DemandeInscriptionResponse, DemandeInscriptionService } from '../../../../services/demande-inscription-service';
import { LucideAngularModule ,Check,X} from 'lucide-angular';

@Component({
  selector: 'app-table-demandes-inscriptions',
  imports: [Badge,CheckboxComponent,CommonModule,LucideAngularModule],
  templateUrl: './table-demandes-inscriptions.html',
  styleUrl: './table-demandes-inscriptions.css',
})
export class TableDemandesInscriptions implements OnInit{
  tableRowData: DemandeInscriptionResponse[]=[]
  isLoading:boolean=false;
  selectedRows: number[] = [];
  selectAll: boolean = false;
  errorMessage:string='';

  tabs = [
  { label: 'En attente', value: 'EN_ATTENTE' },
  { label: 'Historique', value: 'HISTORIQUE'  },
];



  constructor(private demandeInscriptionService:DemandeInscriptionService ,private cdr: ChangeDetectorRef){}
  
  ngOnInit(): void {
    this.loadFactures();
  }
  
  loadFactures(): void {
  this.isLoading = true;
  this.demandeInscriptionService.getAllDemandes().subscribe({
    next: (data) => {
      this.tableRowData = data;
      console.log('Statuts reçus:', data.map(d => `"${d.statut}"`));
      this.updateFilteredRows();
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

  getBadgeColor(type: string): 'success' |'error'|  'info' | 'light' {
    if (type === 'VALIDEE') return 'success';
    if (type === 'EN_ATTENTE') return 'light';
    if (type === 'REFUSEE') return 'info';
  
    return 'error';
  }

  handleDemande(demande:DemandeInscriptionResponse, action:ActionDemande):void{
    const ancienStatut = demande.statut;
    const index = this.tableRowData.findIndex(r => r.id ===demande.id);
    if(index!==-1){
      this.tableRowData[index]={
        ...this.tableRowData[index],
        statut:action==='ACCEPTER'?'VALIDEE':'REFUSEE'
      };
      this.updateFilteredRows();
    }

    this.demandeInscriptionService.traiterDemande(demande.id,action).subscribe({
      next:(updated)=>{
        this.tableRowData[index]= updated;
        this.updateFilteredRows();
      },
      error:(err)=>{ 
        console.error('Erreur traitement demande', err);
        this.tableRowData[index] = { ...this.tableRowData[index], statut: ancienStatut };
        this.updateFilteredRows();
      }
    })
     
  }

activeTab: string = 'TOUTES';

changeTab(value: string): void {
  this.activeTab = value;
  this.selectedRows = [];
  this.selectAll = false;
  this.updateFilteredRows();
}

filteredRows: DemandeInscriptionResponse[] = []; 

updateFilteredRows(): void {
  if (this.activeTab === 'EN_ATTENTE') {
    this.filteredRows = this.tableRowData.filter(r => r.statut === 'EN_ATTENTE');
  } else {
    // Historique = tout ce qui est traité
    this.filteredRows = this.tableRowData.filter(r => r.statut !== 'EN_ATTENTE');
  }
  this.cdr.detectChanges();
}

getCount(statut: string): number {
  if (statut === 'TOUTES') return this.tableRowData.length;
  return this.tableRowData.filter(r => r.statut === statut).length;
}
}
