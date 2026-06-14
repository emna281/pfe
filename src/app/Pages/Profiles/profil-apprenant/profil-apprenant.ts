import { Component, Inject, PLATFORM_ID, signal } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApprenantProfil, ApprenantService } from '../../../services/apprenant-service';
import { Planing } from '../../../shared/components/ui/user-profile/planing/planing';
import { Historique } from '../../../shared/components/ui/user-profile/historique/historique';
import { Paiement } from '../../../shared/components/ui/user-profile/paiement/paiement';
import { ApprenantParametres } from '../../../shared/components/ui/apprenant-parametres/apprenant-parametres';
import { ApprenantCertificats } from '../../../shared/components/ui/apprenant-certificats/apprenant-certificats';

@Component({
  selector: 'app-profil-apprenant',
  imports: [CommonModule, Planing, FormsModule, Historique, Paiement, ApprenantParametres, ApprenantCertificats],
  templateUrl: './profil-apprenant.html',
  styleUrl: './profil-apprenant.css',
  host: { ngSkipHydration: 'true' }
})
export class ProfilApprenant {

  profil = signal<ApprenantProfil | null>(null);
  activeTab = signal<string>('planning');
  anneeCourante = new Date().getFullYear();

  tabs = [
    { id: 'planning',    label: 'Mon planning' },
    { id: 'historique',  label: 'Historique'   },
    { id: 'paiements',   label: 'Paiements'    },
    { id: 'certificats', label: 'Certificats'  },
    { id: 'parametres',  label: 'Profil'       },
  ];

  constructor(
    private apprenantService: ApprenantService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.apprenantService.getMonProfil().subscribe({
        next: (p) => this.profil.set(p),
        error: (err) => console.error('Erreur chargement profil:', err)
      });
    }
  }

  setTab(tabId: string): void {
    this.activeTab.set(tabId);
  }

  getInitiales(): string {
    const p = this.profil();
    if (!p) return '';
    return `${p.prenom[0]}${p.nom[0]}`.toUpperCase();
  }
}