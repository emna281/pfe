import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, inject, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Badge } from '../../ui/badge/badge';
import { Router, RouterModule } from '@angular/router';
import { ConfirmationModal } from '../../ui/confirmation-modal/confirmation-modal';
import { FormulaireSalle } from '../../formulaires/formulaire-salle/formulaire-salle';
import { SalleResponsetDTO, SalleService } from '../../../../services/salle-service';
import { LucideAngularModule ,Pencil,Trash2} from 'lucide-angular';

@Component({
  selector: 'app-table-salle',
  imports: [CommonModule,FormsModule,Badge,RouterModule,ConfirmationModal,FormulaireSalle,LucideAngularModule],
  templateUrl: './table-salle.html',
  styleUrl: './table-salle.css',
})
export class TableSalle {
  private platformId =inject(PLATFORM_ID);
  salles:SalleResponsetDTO[]=[];
  filtredSalle: SalleResponsetDTO[]=[];
  loading=false;
  error:string|null=null;
  searchTerm:string='';

  currentList:any[]=[];
  allItems:any[]=[];
  currentPage = 1;
  itemsPerPage = 5;

  constructor(private salleService:SalleService ,private cdr: ChangeDetectorRef ,private router:Router){}


  isFormulaireOpen = false;
    selectedSalle: SalleResponsetDTO | null = null;
    openFormulaire(salle: SalleResponsetDTO) {
      this.selectedSalle = salle; 
      this.isFormulaireOpen = true;
    
      
    }
    fermerFormulaire() {
      this.isFormulaireOpen = false;
      this.selectedSalle = null;
    }

  ngOnInit():void{
    if (!isPlatformBrowser(this.platformId)) return; 
    this.loadSalles();
    
  }
  ngAfterViewInit(){
    this.cdr.detectChanges();

  }
  loadSalles():void{
    this.loading=true;
    this.error=null;
    this.salleService.getAllSalles().subscribe({
      next:(data)=>{
        console.log('formations chargées:', data);
        this.salles=data;
        this.filtredSalle=data;
        this.loading=false;
        this.currentPage=1;
        this.cdr.detectChanges();
        
      },
    error:(err)=>{
      console.error('erreur chargement salles:',err);
      this.error='erreur de chargement des salles',
      this.loading=false;
    }
    });
  }

  filterSalles(): void {
    if (!this.searchTerm || this.searchTerm.trim() === '') {
      this.filtredSalle = this.salles;
      this.currentPage = 1;
      return;
    }

    const term = this.searchTerm.toLowerCase();

    this.currentList = this.salles.filter(item =>
      item.numero?.toLowerCase().includes(term) ||
      item.batiment?.toLowerCase().includes(term) ||
      item.description?.toLowerCase().includes(term) 
    );
    this.currentPage = 1;
  }

  get totalPages(): number {
    return Math.ceil(this.filtredSalle.length / this.itemsPerPage);
  }

  get currentItems(): SalleResponsetDTO[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filtredSalle.slice(start, start + this.itemsPerPage);
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
    console.log('formations:', this.salles);
  
    let filtered = [...this.salles];
    if (status === 'actif') filtered = filtered.filter(f => f.active === true);
    else if (status === 'inactif') filtered = filtered.filter(f => f.active === false);

  
    if (searchTerm.trim()) {
    const term = searchTerm.toLowerCase();
    filtered = filtered.filter(s =>
      s.numero?.toLowerCase().includes(term) ||
      s.batiment?.toLowerCase().includes(term) ||
      s.description?.toLowerCase().includes(term)
    );
  }

  this.filtredSalle = filtered;
  this.currentPage = 1;
}

  handleDelete(salle: SalleResponsetDTO): void {
    
      this.salleService.deleteSession(salle.id).subscribe({
        next: () => {
          this.salles = this.salles.filter(s => s.id !== salle.id);
          this.filterSalles();
        },
        error: (err) => {
          console.error('Erreur suppression:', err);
        }
      });
    
  }

  getBadgeColor(actif: boolean): 'success' | 'light' {
    return actif ? 'success' : 'light';
  }

  

  modalSuppressionVisisble=false;
  salleASupprimer:any=null;
  modalSuppressionConfig = {
    titre: 'Confirmation',
    message: 'Voulez-vous vraiment supprimer cette formation ?',
    labelConfirmer: 'Oui, supprimer',
    labelAnnuler: 'Annuler',
    type: 'danger' as const
  };
  ouvrirConfirmationModal(salle:SalleResponsetDTO){
    this.modalSuppressionVisisble=true;
    this.salleASupprimer=salle;
  }
  confirmerSuppression(){
    console.log('supprimer',this.salleASupprimer);
    const salle = this.salleASupprimer;
    this.modalSuppressionVisisble=false;
    this.salleASupprimer = null;
    this.cdr.detectChanges();
    if (salle) {
      this.handleDelete(salle);
    };
  
  }
  annulerSuppression(){
    this.modalSuppressionVisisble=false;
    this.salleASupprimer=null;
  }

  get displayEnd(): number {
    return Math.min(this.currentPage * this.itemsPerPage, this.filtredSalle.length);
  }

}
