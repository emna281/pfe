import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { AuthResponse, AuthService, BaseUser } from '../../../shared/services/auth.service';
import { UtilisateurService } from '../../../services/utilisateur-service';
import { UserMetaCard } from '../../../shared/components/ui/user-profile/user-meta-card/user-meta-card';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ApprenantProfil, ApprenantService } from '../../../services/apprenant-service';
import { Planing } from '../../../shared/components/ui/user-profile/planing/planing';
import { FormsModule } from '@angular/forms';
import { Historique } from '../../../shared/components/ui/user-profile/historique/historique';
import { Paiement } from '../../../shared/components/ui/user-profile/paiement/paiement';


@Component({
  selector: 'app-profil-apprenant',
  imports: [UserMetaCard,CommonModule,Planing,FormsModule,Historique,Paiement],
  templateUrl: './profil-apprenant.html',
  styleUrl: './profil-apprenant.css',
})
export class ProfilApprenant {
  profil: ApprenantProfil | null = null;
  activeTab: string = 'planning';

  tabs = [
    { id: 'planning',     label: 'Mon planning',  icon: 'calendar' },
    { id: 'historique',   label: 'Historique',    icon: 'clock' },
    { id: 'paiements',    label: 'Paiements',     icon: 'credit-card' },
    { id: 'certificats',  label: 'Certificats',   icon: 'award' },
    { id: 'parametres',   label: 'Paramètres',    icon: 'settings' },
  ];

  constructor(private apprenantService: ApprenantService,@Inject(PLATFORM_ID) private platformId: Object) {}

   ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
    this.apprenantService.getMonProfil().subscribe({
      next: (profil) => {
        console.log('profil assigné:', profil);
        this.profil = profil;
      },
      error: (err) => {
        console.error('Erreur chargement profil:', err)
      }
    });
  }
  }

  setTab(tabId: string): void {
    this.activeTab = tabId;
  }

  getInitiales(): string {
    if (!this.profil) return '';
    return `${this.profil.prenom[0]}${this.profil.nom[0]}`.toUpperCase();
  }

}
