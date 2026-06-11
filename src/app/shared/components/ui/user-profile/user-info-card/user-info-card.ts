import { Component, Input } from '@angular/core';
import { InputFieldComponent } from '../../input-field';
import { Boutton } from '../../../button/boutton/boutton';
import { Label } from '../../../input/label/label';
import { Modal } from '../../modal/modal';
import { ModalService } from '../../../../services/modal.service';
import { BaseUser } from '../../../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Alert } from '../../alert/alert';
import { LucideAngularModule,Pencil ,User} from 'lucide-angular';
import { ApprenantService, UpdateProfilRequest } from '../../../../../services/apprenant-service';


@Component({
  selector: 'app-user-info-card',
  imports: [FormsModule,CommonModule,LucideAngularModule],
  templateUrl: './user-info-card.html',
  styleUrl: './user-info-card.css',
})
export class UserInfoCard {
  @Input() user!:BaseUser;
  @Input() isAdminView: boolean = false;
  constructor(private apprenantService:ApprenantService){}
  
  

  editMode = false;
    saving = false;
    success = false;
    form: UpdateProfilRequest = {};
  
    
  startEdit(): void {
    this.form = {
      nom:       this.user?.nom,
      prenom:       this.user?.prenom,
      telephone:        this.user?.telephone,
      
    };
    this.editMode = true;
    this.success = false;
  }

  cancelEdit(): void {
    this.editMode = false;
  }

  saveEdit(): void {
    this.saving = true;
    this.apprenantService.updateMonProfil(this.form).subscribe({
      next: (updated) => {
        Object.assign(this.user, updated);
        this.saving = false;
        this.editMode = false;
        this.success = true;
        setTimeout(() => this.success = false, 3000);
      },
      error: () => { this.saving = false; }
    });
  }

}
