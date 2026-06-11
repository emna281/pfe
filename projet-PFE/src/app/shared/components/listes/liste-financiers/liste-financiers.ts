import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserListConfig, UserListPage } from '../../reutilisable/user-list-page/user-list-page';
import { BaseUser, Financier } from '../../../services/auth.service';
import { ExtraField } from '../../reutilisable/user-card/user-card';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { inject,PLATFORM_ID } from '@angular/core';
import { platformBrowser } from '@angular/platform-browser';
import { UtilisateurService } from '../../../../services/utilisateur-service';
import { UtilisateurResponse } from '../../../../services/admin-service';
import { FormulaireUtilisateur } from '../../formulaires/formulaire-utilisateur/formulaire-utilisateur';
@Component({
  selector: 'app-liste-financiers',
  imports: [RouterModule,UserListPage,CommonModule,FormulaireUtilisateur],
  templateUrl: './liste-financiers.html',
  styleUrl: './liste-financiers.css',
})
export class ListeFinanciers {
  config: UserListConfig= {
    title: 'Financiers',
    addLabel: 'Ajouter un financier',
    filterLabel: 'Rechercher un financier...'
  };
  private plateformId =inject(PLATFORM_ID);

  financiers: Financier[] | null = null;
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
        return this.utilisateurService.getFinanciers(term);
      }),
      takeUntil(this.destroy$)
    )
    .subscribe({
      next:(response)=>{
        this.financiers = Array.isArray(response) ? response : response.data;
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
    this.utilisateurService.getFinanciers(search)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next:(response)=>{
        console.log('✅ Réponse reçue :', response);
        this.financiers = Array.isArray(response) ? response : response.data;
        console.log('✅ apprenants filtrés :', this.financiers);
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
    const f = user as Financier;
    return [
      { label: 'Spécialite',   value: String(f.specialite) },
      { label: 'Années Experience',   value: String(f.anneesExperience) },
      { label: 'Cv Path',   value: String(f.cvPath) },

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
