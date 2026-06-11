import { Component, OnInit } from '@angular/core';
import { UserListConfig, UserListPage } from '../../reutilisable/user-list-page/user-list-page';
import { Apprenant, Formateur } from '../../../services/auth.service';
import { BaseUser } from '../../../services/auth.service';
import { RouterModule ,Router} from '@angular/router';
import { UtilisateurService } from '../../../../services/utilisateur-service';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { ExtraField } from '../../reutilisable/user-card/user-card';
import { inject,PLATFORM_ID } from '@angular/core';
import { platformBrowser } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-liste-apprenants',
  imports: [RouterModule,UserListPage],
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
  private searchTerm$ = new Subject<string>();
  private destroy$    = new Subject<void>();

  constructor(
    private utilisateurService: UtilisateurService,
    private router: Router
  ) {}

  ngOnInit(): void {
    
    this.charger('');
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
        this.loading=false;
      },
      error: () => { this.loading = false; }
    });
  }

  charger(search:string):void{
    if (!isPlatformBrowser(this.plateformId)) return;
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
        this.loading=false;
      },
      error: (err) => { 
        console.log('❌ Status :', err.status);
        console.log('❌ Message :', err.message);
        console.log('❌ URL :', err.url);
        console.log('❌ Error complet :', err);
        this.loading = false; 
        
      }
  })

    
  }
 onFilterChanged(term: string): void {
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
 
  ouvrirFormulaire(): void {
    this.router.navigate(['/apprenants/nouveau']);
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  

}
