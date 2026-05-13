import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserListConfig, UserListPage } from '../../reutilisable/user-list-page/user-list-page';
import { inject,PLATFORM_ID } from '@angular/core';
import { platformBrowser } from '@angular/platform-browser';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { BaseUser, Manager } from '../../../services/auth.service';
import { UtilisateurService } from '../../../../services/utilisateur-service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ExtraField } from '../../reutilisable/user-card/user-card';
import { UtilisateurResponse } from '../../../../services/admin-service';
import { FormulaireUtilisateur } from '../../formulaires/formulaire-utilisateur/formulaire-utilisateur';
@Component({
  selector: 'app-liste-manager',
  imports: [RouterModule,UserListPage,CommonModule,FormulaireUtilisateur],
  templateUrl: './liste-manager.html',
  styleUrl: './liste-manager.css',
})
export class ListeManager {
  config: UserListConfig = {
    title: 'Managers',
    addLabel: 'Ajouter un manager',
    filterLabel: 'Rechercher un manager...'
  };
  private plateformId =inject(PLATFORM_ID);

  managers: Manager[] | null = null;
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
        return this.utilisateurService.getManagers(term);
      }),
      takeUntil(this.destroy$)
    )
    .subscribe({
      next:(response)=>{
        this.managers = Array.isArray(response) ? response : response.data;
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
    this.utilisateurService.getManagers(search)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next:(response)=>{
        console.log('✅ Réponse reçue :', response);
        this.managers = Array.isArray(response) ? response : response.data;
        console.log('✅ apprenants filtrés :', this.managers);
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
    const a = user as Manager;
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
