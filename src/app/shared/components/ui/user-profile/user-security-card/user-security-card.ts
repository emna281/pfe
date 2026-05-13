import { CommonModule } from '@angular/common';
import { Component ,Input} from '@angular/core';
import { Alert } from '../../alert/alert';
import { BaseUser } from '../../../../services/auth.service';
import { Modal } from '../../modal/modal';
import { ModalService } from '../../../../services/modal.service';
import { UtilisateurService } from '../../../../../services/utilisateur-service';

import { FormsModule } from '@angular/forms';
import { LucideAngularModule ,LockKeyhole,ShieldCheck} from 'lucide-angular';

@Component({
  selector: 'app-user-security-card',
  imports: [CommonModule,Alert,Modal,FormsModule,LucideAngularModule],
  templateUrl: './user-security-card.html',
  styleUrl: './user-security-card.css',
})
export class UserSecurityCard {
  @Input() user!:BaseUser;
  @Input() isAdminView: boolean = false;
  constructor(public modal:ModalService,private utilisateurService:UtilisateurService){}
  isOpen=false;
  openModal(){this.isOpen=true}
  closeModal(){ this.isOpen=false}

  ancienMdp     = '';
  nouveauMdp    = '';
  confirmerMdp  = '';
  erreurMdp     = '';
  successMdp    = '';
  isModalMdpOpen = false;

  get peutChangerMdp(): boolean {
    return ['FORMATEUR', 'PLANIFICATEUR', 'MANAGER', 'FINANCIER']
      .includes(this.user?.role);
  }

  ouvrirModalMdp()  { this.isModalMdpOpen = true; this.erreurMdp = ''; }
  fermerModalMdp()  { this.isModalMdpOpen = false; }

  soumettreChangementMdp(): void {
    this.erreurMdp  = '';
    this.successMdp = '';

    if (this.nouveauMdp !== this.confirmerMdp) {
      this.erreurMdp = 'Les mots de passe ne correspondent pas.';
      return;
    }
    if (this.nouveauMdp.length < 8) {
      this.erreurMdp = 'Le mot de passe doit contenir au moins 8 caractères.';
      return;
    }

    this.utilisateurService.changerMotDePasse(this.ancienMdp, this.nouveauMdp)
      .subscribe({
        next: () => {
          this.successMdp = 'Mot de passe modifié avec succès.';
          this.ancienMdp   = '';
          this.nouveauMdp  = '';
          this.confirmerMdp = '';
          setTimeout(() => this.fermerModalMdp(), 1500);
        },
        error: (err) => {
          console.log('status:', err.status);
          console.log('error:', err.error);
          if (err.status === 400) {
            this.erreurMdp = err.error?.detail
              ?? err.error?.message
              ?? 'Ancien mot de passe incorrect.';
          } else {
            this.erreurMdp = 'Une erreur est survenue. Réessayez.';
          }
        }
      });
  }
}
