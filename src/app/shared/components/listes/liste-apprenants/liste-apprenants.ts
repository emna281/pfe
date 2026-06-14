import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UserListConfig, UserListPage } from '../../reutilisable/user-list-page/user-list-page';
import { Apprenant, Formateur } from '../../../services/auth.service';
import { BaseUser } from '../../../services/auth.service';
import { RouterModule ,Router} from '@angular/router';
import { UtilisateurService } from '../../../../services/utilisateur-service';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { ExtraField } from '../../reutilisable/user-card/user-card';
import { inject,PLATFORM_ID } from '@angular/core';
import { platformBrowser } from '@angular/platform-browser';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { UserListHeader } from '../../reutilisable/user-list-header/user-list-header';
import { FormulaireUtilisateur } from '../../formulaires/formulaire-utilisateur/formulaire-utilisateur';
import { UtilisateurResponse } from '../../../../services/admin-service';

@Component({
  selector: 'app-liste-apprenants',
  imports: [CommonModule,RouterModule,UserListHeader,UserListPage,FormulaireUtilisateur],
  templateUrl: './liste-apprenants.html',
  styleUrl: './liste-apprenants.css',
})
export class ListeApprenants implements OnInit{
  config: UserListConfig = {
    title: 'Apprenants',
    addLabel: 'Ajouter un apprenant',
    filterLabel: 'Rechercher un apprenant...'
  };
  private plateformId =inject(PLATFORM_ID);

  apprenants: Apprenant[] | null = null;
  loading = false;
  totalCount = 0;

  dialogImprimerOuvert = false;

  private searchTerm$ = new Subject<string>();
  private destroy$    = new Subject<void>();
  afficherListe = false;
searchEffectue = false;
  constructor(
    private utilisateurService: UtilisateurService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    
    this.utilisateurService.getApprenants('').pipe(
    takeUntil(this.destroy$)
  ).subscribe({
    next: (response) => {
      this.totalCount = Array.isArray(response) ? response.length : response.total;
      // Si <= 5, affiche directement
      if (this.totalCount <= 5) {
        this.apprenants = Array.isArray(response) ? response : response.data;
        this.afficherListe = true;
      }
      this.cdr.detectChanges();
    }
  });
    this.searchTerm$.pipe(
      switchMap(term=>{
        this.loading=true;
        return this.utilisateurService.getApprenants(term);
      }),
      takeUntil(this.destroy$)
    )
    .subscribe({
      next:(response)=>{
        this.apprenants = Array.isArray(response) ? response : response.data;
        this.totalCount = Array.isArray(response) ? response.length : response.total;
        this.cdr.detectChanges();
        this.loading=false;
      },
      error: () => { 
        this.loading = false; 
        this.cdr.detectChanges();
      }
    });
  }

  charger(search:string):void{
    if (!isPlatformBrowser(this.plateformId)) return;
    if (!search && this.totalCount > 5 && !this.searchEffectue) {
    this.loading = false;
    this.afficherListe = false;
    this.cdr.detectChanges();
    return;
  }
    this.loading=true;
    console.log('🔵 Chargement apprenants...');
    this.utilisateurService.getApprenants(search)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next:(response)=>{
        console.log('✅ Réponse reçue :', response);
        this.apprenants = Array.isArray(response) ? response : response.data;
        console.log('✅ apprenants filtrés :', this.apprenants);
        this.totalCount = Array.isArray(response) ? response.length : response.total;
        this.afficherListe = true;
        this.loading=false;
        this.cdr.detectChanges();
      },
      error: (err) => { 
        console.log('❌ Status :', err.status);
        console.log('❌ Message :', err.message);
        console.log('❌ URL :', err.url);
        console.log('❌ Error complet :', err);
        this.loading = false; 
        this.cdr.detectChanges();
        
      }
  })

    
  }
 onFilterChanged(term: string): void {
    this.searchEffectue = term.length > 0;
  this.afficherListe = term.length > 0;
    this.searchTerm$.next(term);
  }
 
  getExtraFields = (user: BaseUser): ExtraField[] => {
    const a = user as Apprenant;
    return [
      { label: 'Poste Actuel',   value: a.posteActuel },
      { label: 'Niveau Etude',   value: a.niveauEtude },
      { label: 'Inscriptions',   value: String(a.inscriptions?.length ?? 0) },

    ];
  };
 
  voirDetail(user: BaseUser): void {
    this.router.navigate(['/apprenants', user.id]);
  }
 
  //isModalOpen = false;
  //selectedApprenantEmail: string | null = null;
  //selectedSessionId: number | null = null;

//ouvrirFormulaire(): void {
  //this.selectedApprenantEmail = null;
  //this.selectedSessionId = null;
  //this.isModalOpen = true;
//}



//onInscriptionCreee(inscription: InscriptionResponseDTO): void {
  //this.isModalOpen = false;
  //this.charger(''); 
//}
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  isModalOpen = false;
      selectedUtilisateur: UtilisateurResponse | null = null;
   onFormulaireClose(): void {
       this.isModalOpen = false;
       this.selectedUtilisateur = null;
       this.charger(''); 
     }
ouvrirFormulaire(): void {
       this.selectedUtilisateur = null;
       this.isModalOpen = true;
     }
}
