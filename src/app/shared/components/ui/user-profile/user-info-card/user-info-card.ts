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


@Component({
  selector: 'app-user-info-card',
  imports: [InputFieldComponent,Boutton,Label,Modal,FormsModule,CommonModule,Alert,LucideAngularModule],
  templateUrl: './user-info-card.html',
  styleUrl: './user-info-card.css',
})
export class UserInfoCard {
  @Input() user!:BaseUser;
  @Input() isAdminView: boolean = false;
  constructor(public modal:ModalService){}
  isOpen=false;
  openModal(){this.isOpen=true}
  closeModal(){ this.isOpen=false}

  

  handleSave(){
    console.log('Saving changes...');
    this.modal.closeModal();
  }
  

}
