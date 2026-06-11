import { Component,Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserListConfig, UserListPage } from '../../reutilisable/user-list-page/user-list-page';
import { inject,PLATFORM_ID } from '@angular/core';
import { platformBrowser } from '@angular/platform-browser';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { BaseUser, Planificateur } from '../../../services/auth.service';
import { UtilisateurService } from '../../../../services/utilisateur-service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ExtraField } from '../../reutilisable/user-card/user-card';
import { UtilisateurResponse } from '../../../../services/admin-service';
import { FormulaireUtilisateur } from '../../formulaires/formulaire-utilisateur/formulaire-utilisateur';

@Component({
  selector: 'app-liste-planificateurs',
  imports: [RouterModule,UserListPage,FormulaireUtilisateur,CommonModule],
  templateUrl: './liste-planificateurs.html',
  styleUrl: './liste-planificateurs.css',
})
export class ListePlanificateurs {
  
  config: UserListConfig = {
    title: 'Planificateurs',
    addLabel: 'Ajouter un planificateur',
    filterLabel: 'Rechercher un planificateur...'
  };
  private plateformId =inject(PLATFORM_ID);

  planificateurs: Planificateur[] | null = null;
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
        return this.utilisateurService.getPlanificateurs(term);
      }),
      takeUntil(this.destroy$)
    )
    .subscribe({
      next:(response)=>{
        this.planificateurs = Array.isArray(response) ? response : response.data;
        this.totalCount = Array.isArray(response) ? response.length : response.total;
        this.loading=false;
      },
      error: () => { this.loading = false; }
    });
  }

  charger(search:string):void{
    if (!isPlatformBrowser(this.plateformId)) return;
    this.loading=true;
    console.log('🔵 Chargement formateurs...');
    this.utilisateurService.getPlanificateurs(search)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next:(response)=>{
        console.log('✅ Réponse reçue :', response);
        this.planificateurs = Array.isArray(response) ? response : response.data;
        console.log('✅ planificateurs filtrés :', this.planificateurs);
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
    const a = user as Planificateur;
    return [
      { label: 'Spécialite',   value: String(a.specialite) },
      { label: 'Années Experience',   value: String(a.anneesExperience) },
      { label: 'Cv Path',   value: String(a.cvPath) },

    ];
  };
 
 
 
  isModalOpen = false;
  selectedUtilisateur: UtilisateurResponse | null = null;

  ouvrirFormulaire(): void {
    this.selectedUtilisateur = null;
    this.isModalOpen = true;
  }
  voirDetail(user: BaseUser): void {
    this.selectedUtilisateur = user as unknown as  UtilisateurResponse;
    this.isModalOpen = true;
  }

  onFormulaireClose(): void {
    this.isModalOpen = false;
    this.selectedUtilisateur = null;
    this.charger(''); 
  }


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
