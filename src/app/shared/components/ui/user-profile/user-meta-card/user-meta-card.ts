import { Component, Input } from '@angular/core';
import { Modal } from '../../modal/modal';
import { InputFieldComponent } from '../../input-field';
import { Boutton } from '../../../button/boutton/boutton';
import { ModalService } from '../../../../services/modal.service';
import { Apprenant, BaseUser, Formateur } from '../../../../services/auth.service';
import { LucideAngularModule ,Pencil ,Mail} from 'lucide-angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-meta-card',
  imports: [Modal,InputFieldComponent,Boutton,LucideAngularModule,CommonModule],
  templateUrl: './user-meta-card.html',
  styleUrl: './user-meta-card.css',
})
export class UserMetaCard {
  @Input() isAdminView: boolean = false;
  @Input() user!: BaseUser;

  constructor(public modal: ModalService) {}
  
  isOpen = false;
  openModal() { this.isOpen = true; }
  closeModal() { this.isOpen = false; }

  get nomComplet(): string {
    return `${this.user.prenom} ${this.user.nom}`;
  }

  get initiales(): string {
    return `${this.user.prenom?.[0] ?? ''}${this.user.nom?.[0] ?? ''}`.toUpperCase();
  }

  get specialite(): string | null {
    return (this.user as any).specialite ?? null;
  }

  get posteActuel(): string | null {
    return (this.user as any).posteActuel ?? null;
  }

  get sousTitre(): string {
    switch (this.user.role) {
      case 'FORMATEUR':    return (this.user as Formateur).specialite ?? 'Formateur';
      case 'APPRENANT':    return (this.user as Apprenant).posteActuel ?? 'Apprenant';
      case 'MANAGER':      return 'Manager';
      case 'PLANIFICATEUR':return 'Planificateur';
      case 'FINANCIER':    return 'Financier';
      case 'ADMIN':        return 'Administrateur';
      default:             return this.user.role;
    }
  }
 
   handleSave() {
    console.log('Saving changes...');
    this.modal.closeModal();
  }

}