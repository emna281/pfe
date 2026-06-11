
import { CommonModule } from '@angular/common';
import { Component, OnInit,ChangeDetectorRef,AfterViewInit } from '@angular/core';

import { Boutton } from '../../button/boutton/boutton';
import { CompetenceInfoDTO,CompetenceService } from '../../../../services/competence-service';
import { FormsModule } from '@angular/forms';
import { FormulaireCompetence } from '../../formulaires/formulaire-competence/formulaire-competence';
import { ConfirmationModal } from '../../ui/confirmation-modal/confirmation-modal';
@Component({
  selector: 'app-table-competence',
  imports: [CommonModule,Boutton,FormsModule,FormulaireCompetence,ConfirmationModal],
  templateUrl: './table-competence.html',
  styleUrl: './table-competence.css',
})
export class TableCompetence implements OnInit{
  competences:CompetenceInfoDTO[]=[];
  filtredCompetences: CompetenceInfoDTO[]=[];
  loading=false;
  error:string|null=null;
  searchTerm:string='';

  currentList:any[]=[];
  allItems:any[]=[];
  currentPage = 1;
  itemsPerPage = 5;

  Math = Math;
  constructor(private competenceService:CompetenceService ,private cdr: ChangeDetectorRef ){}
  
    isFormulaireOpen = false;
    selectedCompetence: CompetenceInfoDTO | null = null;
    openFormulaire(competence: CompetenceInfoDTO) {
      this.selectedCompetence = competence; 
      this.isFormulaireOpen = true;
  }
  fermerFormulaire() {
    this.isFormulaireOpen = false;
    this.selectedCompetence = null;
  }

  ngOnInit():void{
    this.loadCompetence();
    
  }
  ngAfterViewInit(){    
    this.cdr.detectChanges();
  }

  loadCompetence():void{
    this.loading=true;
    this.error=null;
    this.competenceService.getAllCompetence().subscribe({
      next:(data)=>{
        this.competences=data;
        this.filtredCompetences=data;
        this.loading=false;
        this.currentPage=1;
        setTimeout(()=>{
          this.cdr.detectChanges();
        })
      },
    error:(err)=>{
      console.error('erreur chargement formations:',err);
      this.error='erreur de chargement des formations',
      this.loading=false;
    }
    });
  }
  filterCompetences(): void {
  if (!this.searchTerm || this.searchTerm.trim() === '') {
    this.filtredCompetences = this.competences;
    this.currentPage = 1;
    return;
  }

  const term = this.searchTerm.toLowerCase();

  this.filtredCompetences = this.competences.filter(item =>
    item.nom?.toLowerCase().includes(term) ||
    item.description?.toLowerCase().includes(term) ||
    item.categorie?.toLowerCase().includes(term)
  );
  this.currentPage = 1;
}
  
    get totalPages(): number {
      return Math.ceil(this.filtredCompetences.length / this.itemsPerPage);
    }
  
    get currentItems(): CompetenceInfoDTO[] {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.filtredCompetences.slice(start, start + this.itemsPerPage);
    }
    goToPage(page: number) {
        if (page >= 1 && page <= this.totalPages) {
          this.currentPage = page;
        }
      }
    
      
    
      handleDelete(competence: CompetenceInfoDTO): void {
        
          this.competenceService.deleteCompetence(competence.id).subscribe({
            next: () => {
              this.competences = this.competences.filter(f => f.id !== competence.id);
              this.filterCompetences();
            },
            error: (err) => {
              console.error('Erreur suppression:', err);
              alert('Erreur lors de la suppression');
            }
          });
        
      }
  suppModalVisible=false;
  competenceASupprimer:any=null;
  modalSuppressionConfig = {
  titre: 'Confirmation',
  message: 'Voulez-vous vraiment supprimer cette competence ?',
  labelConfirmer: 'Oui, supprimer',
  labelAnnuler: 'Annuler',
  type: 'danger' as const
};
ouvrirModal(competence:CompetenceInfoDTO){
  this.competenceASupprimer=competence;
  this.suppModalVisible=true;
}
confirmerSuppression(){
  if(this.competenceASupprimer){
    this.handleDelete(this.competenceASupprimer);

  }
  this.competenceASupprimer=null;
  this.suppModalVisible=false;
}
annulerSuppression(){
    this.suppModalVisible=false;
    this.competenceASupprimer=null;
  }

 

}
