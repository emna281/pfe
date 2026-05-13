import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserListConfig, UserListPage } from '../../reutilisable/user-list-page/user-list-page';
import { inject,PLATFORM_ID } from '@angular/core';
import { platformBrowser } from '@angular/platform-browser';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { BaseUser, Formateur } from '../../../services/auth.service';
import { UtilisateurService } from '../../../../services/utilisateur-service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ExtraField } from '../../reutilisable/user-card/user-card';
import { FormulaireUtilisateur } from '../../formulaires/formulaire-utilisateur/formulaire-utilisateur';
import { UtilisateurResponse } from '../../../../services/admin-service';
@Component({
  selector: 'app-liste-formateurs',
  imports: [RouterModule,UserListPage,CommonModule,FormulaireUtilisateur],
  templateUrl: './liste-formateurs.html',
  styleUrl: './liste-formateurs.css',
})
export class ListeFormateurs {
  config: UserListConfig = {
    title: 'Formateurs',
    addLabel: 'Ajouter un formateur',
    filterLabel: 'Rechercher un formateur...'
  };
  private plateformId =inject(PLATFORM_ID);

  formateurs: Formateur[] | null = null;
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
        return this.utilisateurService.getFormateurs(term);
      }),
      takeUntil(this.destroy$)
    )
    .subscribe({
      next:(response)=>{
        this.formateurs = Array.isArray(response) ? response : response.data;
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
    this.utilisateurService.getFormateurs(search)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next:(response)=>{
        console.log('✅ Réponse reçue :', response);
        this.formateurs = Array.isArray(response) ? response : response.data;
        console.log('✅ apprenants filtrés :', this.formateurs);
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
    const a = user as Formateur;
    return [
      { label: 'Spécialite',   value: String(a.specialite) },
      { label: 'Années Experience',   value: String(a.anneesExperience) },
      { label: 'Cv Path',   value: String(a.cvPath) },
      { label: 'Heures Enseignées Total',   value: String(a.heuresEnseigneesTotal) },
      { label: 'Disponibilité',   value: String(a.disponibilite) },
      { label: 'Sessions',   value: String(a.sessions?.length ?? 0) },
      { label: 'Compétences',   value: String(a.competences) },

  

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
