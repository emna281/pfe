import { CommonModule } from '@angular/common';
import { Component ,Input,Output,EventEmitter} from '@angular/core';


@Component({
  selector: 'app-confirmation-modal',
  imports: [CommonModule],
  templateUrl: './confirmation-modal.html',
  styleUrl: './confirmation-modal.css',
})
export class ConfirmationModal {
  @Input() visible = false;
  @Input() titre = 'Confirmation';
  @Input() message = 'Êtes-vous sûr ?';
  @Input() labelConfirmer = 'Confirmer';
  @Input() labelAnnuler = 'Annuler';
  @Input() type: 'danger' | 'warning' | 'info' = 'warning';

  @Output() confirmer = new EventEmitter<void>();
  @Output() annuler = new EventEmitter<void>();

}
