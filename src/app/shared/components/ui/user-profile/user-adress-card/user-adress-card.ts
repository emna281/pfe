import { Component, Input } from '@angular/core';
import { InputFieldComponent } from '../../input-field';
import { Boutton } from '../../../button/boutton/boutton';
import { Label } from '../../../input/label/label';
import { Modal } from '../../modal/modal';
import { FormsModule } from '@angular/forms';
import { ModalService } from '../../../../services/modal.service';
import { Apprenant, BaseUser } from '../../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Dropzone } from '../../dropzone/dropzone';
import { LucideAngularModule ,Pencil,Briefcase} from 'lucide-angular';

@Component({
  selector: 'app-user-adress-card',
  imports: [InputFieldComponent,Boutton,Label,Modal,FormsModule,CommonModule,LucideAngularModule],
  templateUrl: './user-adress-card.html',
  styleUrl: './user-adress-card.css',
})
export class UserAdressCard {
  @Input() isAdminView: boolean = false;
  @Input() user!:BaseUser;
  constructor(public modal:ModalService){}
  isOpen=false;
  openModal(){this.isOpen=true}
  closeModal(){this.isOpen=false}

  get specialite(): string | null {
    const u = this.user as any;
    return u.specialite ?? null;
  }

  get anneesExperience(): number | null {
    const u = this.user as any;
    return u.anneesExperience ?? null;
  }

  get cvPath(): string | null {
    const u = this.user as any;
    return u.cvPath ?? null;
  }

  get posteActuel(): string | null {
    return this.user.role === 'APPRENANT'
      ? (this.user as Apprenant).posteActuel ?? null
      : null;
  }

  get niveauEtude(): string | null {
    return this.user.role === 'APPRENANT'
      ? (this.user as Apprenant).niveauEtude ?? null
      : null;
  }
  get hasProFields(): boolean {
    return ['FORMATEUR', 'PLANIFICATEUR', 'MANAGER', 'FINANCIER'].includes(this.user?.role);
  }

  get isApprenant(): boolean {
    return this.user?.role === 'APPRENANT';
  }
  handleSave(){
    console.log('saving changes ...');
    this.modal.closeModal();
  }
}
