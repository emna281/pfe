import { CommonModule } from '@angular/common';
import { Component, Input, signal } from '@angular/core';
import { Alert } from '../../alert/alert';
import { BaseUser } from '../../../../services/auth.service';
import { Modal } from '../../modal/modal';
import { ModalService } from '../../../../services/modal.service';
import { UtilisateurService } from '../../../../../services/utilisateur-service';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-user-security-card',
  imports: [CommonModule, Modal, FormsModule, LucideAngularModule],
  templateUrl: './user-security-card.html',
  styleUrl: './user-security-card.css',
})
export class UserSecurityCard {
  @Input() user!: BaseUser;
  @Input() isAdminView: boolean = false;

  constructor(
    public modal: ModalService,
    private utilisateurService: UtilisateurService,
  ) {}

  isOpen = false;
  openModal()  { this.isOpen = true;  }
  closeModal() { this.isOpen = false; }

  // ── Signals → Angular zoneless détecte automatiquement les changements ──
  isModalMdpOpen = signal(false);
  isLoading      = signal(false);
  erreurMdp      = signal('');
  successMdp     = signal('');

  ancienMdp    = '';
  nouveauMdp   = '';
  confirmerMdp = '';

  get peutChangerMdp(): boolean {
    return ['FORMATEUR', 'PLANIFICATEUR', 'MANAGER', 'FINANCIER', 'APPRENANT']
      .includes(this.user?.role);
  }

  ouvrirModalMdp() {
    this.isModalMdpOpen.set(true);
    this.erreurMdp.set('');
    this.successMdp.set('');
    this.ancienMdp    = '';
    this.nouveauMdp   = '';
    this.confirmerMdp = '';
    this.isLoading.set(false);
  }

  fermerModalMdp() {
    this.isModalMdpOpen.set(false);
    this.erreurMdp.set('');
  }

  soumettreChangementMdp(): void {
    this.erreurMdp.set('');
    this.successMdp.set('');

    if (this.nouveauMdp !== this.confirmerMdp) {
      this.erreurMdp.set('Les mots de passe ne correspondent pas.');
      return;
    }
    if (this.nouveauMdp.length < 8) {
      this.erreurMdp.set('Le mot de passe doit contenir au moins 8 caractères.');
      return;
    }

    this.isLoading.set(true);

    this.utilisateurService.changerMotDePasse(this.ancienMdp, this.nouveauMdp)
      .subscribe({
        next: () => {
          this.isLoading.set(false);
          this.isModalMdpOpen.set(false);
          this.successMdp.set('Mot de passe modifié avec succès.');
          this.ancienMdp    = '';
          this.nouveauMdp   = '';
          this.confirmerMdp = '';
          setTimeout(() => this.successMdp.set(''), 4000);
        },
        error: (err) => {
          this.isLoading.set(false);
          this.erreurMdp.set(
            err.status === 400
              ? (err.error?.detail ?? err.error?.message ?? 'Ancien mot de passe incorrect.')
              : 'Une erreur est survenue. Réessayez.'
          );
        }
      });
  }
}