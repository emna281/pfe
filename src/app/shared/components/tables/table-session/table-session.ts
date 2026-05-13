import { CommonModule } from '@angular/common';
import { Component,OnInit,ChangeDetectorRef } from '@angular/core';

import { Boutton } from '../../button/boutton/boutton';
import { FormsModule } from '@angular/forms';
import { FormulaireSession } from '../../formulaires/formulaire-session/formulaire-session';
import { SessionDTO,SessionService } from '../../../../services/session-service';
import { ConfirmationModal } from '../../ui/confirmation-modal/confirmation-modal';
import { RouterModule ,Router} from '@angular/router';

@Component({
  selector: 'app-table-session',
  imports: [CommonModule,Boutton,FormsModule,FormulaireSession,ConfirmationModal,RouterModule],
  templateUrl: './table-session.html',
  styleUrl: './table-session.css',
})
export class TableSession {
  sessions:SessionDTO[]=[];
    filtredSessions: SessionDTO[]=[];
    loading=false;
    error:string|null=null;
    searchTerm:string='';
  
    currentList:any[]=[];
    allItems:any[]=[];
    currentPage = 1;
    itemsPerPage = 5;
    constructor(private sessionService:SessionService ,private cdr: ChangeDetectorRef,private router:Router ){}
    
      isFormulaireOpen = false;
      selectedSession: SessionDTO | null = null;
      openFormulaire(session: SessionDTO) {
        this.selectedSession = session; 
        this.isFormulaireOpen = true;
      }
    fermerFormulaire() {
      this.isFormulaireOpen = false;
      this.selectedSession = null;
    }
  
    ngOnInit():void{
      this.loadSession();
      
    }
    ngAfterViewInit(){
      setTimeout(()=>{
        this.cdr.detectChanges();
      })
    }
    loadSession():void{
      this.loading=true;
      this.error=null;
      this.sessionService.getAllSession().subscribe({
        next:(data)=>{
          this.sessions=data;
          this.filtredSessions=data;
          this.loading=false;
          this.currentPage=1;
          setTimeout(()=>{
            this.cdr.detectChanges();
          })
        },
      error:(err)=>{
        console.error('erreur chargement session:',err);
        this.error='erreur de chargement des sessions',
        this.loading=false;
      }
      });
    }
    filterSession(): void {
        if (!this.searchTerm || this.searchTerm.trim() === '') {
          this.filtredSessions = this.sessions;
          this.currentPage = 1;
          return;
        }
    
        const term = this.searchTerm.toLowerCase();
    
        this.currentList = this.allItems.filter(item =>
          item.code?.toLowerCase().includes(term) ||
          item.nom?.toLowerCase().includes(term) ||
          item.dateDebut?.toLowerCase().includes(term) ||
          item.dateFin?.toLowerCase().includes(term)||
          item.heureDebut?.toLowerCase().includes(term) ||
          item.heureFin?.toLowerCase().includes(term) ||
          item.placesMax?.toLowerCase().includes(term) ||
          item.statut?.toLowerCase().includes(term)||
          item.mode?.toLowerCase().includes(term)||
          item.lieu?.toLowerCase().includes(term) ||
          item.lienVisio?.toLowerCase().includes(term) ||
          item.materielRequis?.toLowerCase().includes(term) ||
          item.formationCode?.toLowerCase().includes(term)
        );
        this.currentPage = 1;
      }
    
      get totalPages(): number {
        return Math.ceil(this.filtredSessions.length / this.itemsPerPage);
      }
    
      get currentItems(): SessionDTO[] {
        const start = (this.currentPage - 1) * this.itemsPerPage;
        return this.filtredSessions.slice(start, start + this.itemsPerPage);
      }
      goToPage(page: number) {
          if (page >= 1 && page <= this.totalPages) {
            this.currentPage = page;
          }
        }
      
        
      
        handleDelete(session: SessionDTO): void {
          if (confirm(`Voulez-vous vraiment supprimer la formation "${session.nom}" ?`)) {
            this.sessionService.deleteSession(session.id).subscribe({
              next: () => {
                this.sessions = this.sessions.filter(f => f.id !== session.id);
                this.filterSession();
              },
              error: (err) => {
                console.error('Erreur suppression:', err);
                alert('Erreur lors de la suppression');
              }
            });
          }
        }
        modeClasses: any = {
          PRESENTIEL: 'bg-blue-100 text-blue-700',
          DISTANCIEL: 'bg-purple-100 text-purple-700'
        };
modalSuppressionVisisble=false;
  sessionASupprimer:any=null;
  modalSuppressionConfig = {
  titre: 'Confirmation',
  message: 'Voulez-vous vraiment supprimer cette session ?',
  labelConfirmer: 'Oui, supprimer',
  labelAnnuler: 'Annuler',
  type: 'danger' as const
};
  ouvrirConfirmationModal(session:SessionDTO){
    this.modalSuppressionVisisble=true;
    this.sessionASupprimer=session;
  }
  confirmerSuppression(){
    console.log('supprimer',this.sessionASupprimer);
    if (this.sessionASupprimer) {
      this.handleDelete(this.sessionASupprimer);
    };
    this.modalSuppressionVisisble=false;
    this.sessionASupprimer = null;
  }
  annulerSuppression(){
    this.modalSuppressionVisisble=false;
    this.sessionASupprimer=null;
  }


}
