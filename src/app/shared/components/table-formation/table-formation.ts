import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, OnInit,ChangeDetectorRef,AfterViewInit, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Badge } from '../ui/badge/badge';
import { Boutton } from '../button/boutton/boutton';
import { FormationAdminDTO, FormationService } from '../../../services/formation-service';
import { FormsModule } from '@angular/forms';
import { FormulaireFormation } from '../formulaire-formation/formulaire-formation';
import { Inject,PLATFORM_ID } from '@angular/core';
import { platformBrowser } from '@angular/platform-browser';
import { ConfirmationModal } from '../ui/confirmation-modal/confirmation-modal';



@Component({
  selector: 'app-table-formation',
  imports: [CommonModule,Badge,Boutton,FormsModule,FormulaireFormation,CommonModule,ConfirmationModal,RouterModule],
  templateUrl: './table-formation.html',
  styleUrl: './table-formation.css',
})
export class TableFormation implements OnInit{
  private platformId =inject(PLATFORM_ID);
  formations:FormationAdminDTO[]=[];
  filtredFormation: FormationAdminDTO[]=[];
  loading=false;
  error:string|null=null;
  searchTerm:string='';

  currentList:any[]=[];
  allItems:any[]=[];
  currentPage = 1;
  itemsPerPage = 5;

  constructor(private fromationService:FormationService ,private cdr: ChangeDetectorRef ,private router:Router){}

  isFormulaireOpen = false;
  selectedFormation: FormationAdminDTO | null = null;
  openFormulaire(formation: FormationAdminDTO) {
    this.selectedFormation = formation; 
    this.isFormulaireOpen = true;
  
    
  }
  fermerFormulaire() {
    this.isFormulaireOpen = false;
    this.selectedFormation = null;
  }
 

  ngOnInit():void{
    if (!isPlatformBrowser(this.platformId)) return; 
    this.loadFormations();
    
  }
  ngAfterViewInit(){
    this.cdr.detectChanges();

  }
  loadFormations():void{
    this.loading=true;
    this.error=null;
    this.fromationService.getAllFormations().subscribe({
      next:(data)=>{
        console.log('formations chargées:', data);
        this.formations=data;
        this.filtredFormation=data;
        this.loading=false;
        this.currentPage=1;
        this.cdr.detectChanges();
        
      },
    error:(err)=>{
      console.error('erreur chargement formations:',err);
      this.error='erreur de chargement des formations',
      this.loading=false;
    }
    });
  }

  filterFormations(): void {
    if (!this.searchTerm || this.searchTerm.trim() === '') {
      this.filtredFormation = this.formations;
      this.currentPage = 1;
      return;
    }

    const term = this.searchTerm.toLowerCase();

    this.currentList = this.allItems.filter(item =>
      item.code?.toLowerCase().includes(term) ||
      item.titre?.toLowerCase().includes(term) ||
      item.description?.toLowerCase().includes(term) ||
      item.publicCible?.toLowerCase().includes(term)
    );
    this.currentPage = 1;
  }

  get totalPages(): number {
    return Math.ceil(this.filtredFormation.length / this.itemsPerPage);
  }

  get currentItems(): FormationAdminDTO[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filtredFormation.slice(start, start + this.itemsPerPage);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  currentStatus: 'all' | 'actif' | 'inactif' = 'all';

  filterFormationsAndStatus(searchTerm: string, status: 'all' | 'actif' | 'inactif') {
  this.currentStatus = status; 
  this.searchTerm = searchTerm;
  console.log('searchTerm:', searchTerm);
  console.log('formations:', this.formations);
  
    let filtered = [...this.formations];
  // Filtrer par statut
  if (status === 'actif') filtered = filtered.filter(f => f.actif === true);
  else if (status === 'inactif') filtered = filtered.filter(f => f.actif === false);

  // Filtrer par recherche
  if (searchTerm.trim()) {
    const term = searchTerm.toLowerCase();
    filtered = filtered.filter(f =>
      f.code?.toLowerCase().includes(term) ||
      f.titre?.toLowerCase().includes(term) ||
      f.description?.toLowerCase().includes(term) ||
      f.publicCible?.toLowerCase().includes(term)
    );
  }

  this.filtredFormation = filtered;
  this.currentPage = 1;
}

  handleDelete(formation: FormationAdminDTO): void {
    
      this.fromationService.deleteFormation(formation.id).subscribe({
        next: () => {
          this.formations = this.formations.filter(f => f.id !== formation.id);
          this.filterFormations();
        },
        error: (err) => {
          console.error('Erreur suppression:', err);
          Promise.resolve().then(() => {
          if (err.status === 409) {
            this.ouvrirWarningModal(
              "Impossible de supprimer",
              "Cette formation contient des sessions !"
            );
          } else {
            this.ouvrirWarningModal(
              "Erreur",
              "Une erreur est survenue"
            );
          }
          this.cdr.detectChanges();
          });
        
        }
      });
    
  }

  getBadgeColor(actif: boolean): 'success' | 'light' {
    return actif ? 'success' : 'light';
  }

  

  modalSuppressionVisisble=false;
  formationASupprimer:any=null;
  modalSuppressionConfig = {
    titre: 'Confirmation',
    message: 'Voulez-vous vraiment supprimer cette formation ?',
    labelConfirmer: 'Oui, supprimer',
    labelAnnuler: 'Annuler',
    type: 'danger' as const
  };
  ouvrirConfirmationModal(formation:FormationAdminDTO){
    this.modalSuppressionVisisble=true;
    this.formationASupprimer=formation;
  }
  confirmerSuppression(){
    console.log('supprimer',this.formationASupprimer);
    const formation = this.formationASupprimer;
    this.modalSuppressionVisisble=false;
    this.formationASupprimer = null;
    this.cdr.detectChanges();
    if (formation) {
      this.handleDelete(formation);
    };
  
  }
  annulerSuppression(){
    this.modalSuppressionVisisble=false;
    this.formationASupprimer=null;
  }


  showWarningModal = false;
  modalTitle = '';
  modalMessage = '';
  ouvrirWarningModal(titre:string,message:string):void{
    this.modalTitle=titre;
    this.modalMessage=message;
    this.showWarningModal=true;
  }
  fermerWarning():void{
    this.showWarningModal=false;
  }
}
