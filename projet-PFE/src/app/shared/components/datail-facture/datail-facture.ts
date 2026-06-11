import { Component,Input ,Output,EventEmitter,OnChanges,SimpleChanges} from '@angular/core';
import { Modal } from '../ui/modal/modal';
import { FactureResponseDTO ,FactureService} from '../../../services/facture-service';
import { CommonModule, DecimalPipe } from '@angular/common';
@Component({
  selector: 'app-datail-facture',
  imports: [Modal,CommonModule,DecimalPipe],
  templateUrl: './datail-facture.html',
  styleUrls: ['./datail-facture.css'],
})
export class DatailFacture implements OnChanges{
  @Input() isOpen: boolean = false;
  @Input() facture: FactureResponseDTO | null = null;
  @Output() closeFiche = new EventEmitter<void>();
  activeDetailTab: 'general' | 'apprenant' | 'montants' = 'general';
  constructor(private factureService:FactureService) {}
  
  ngOnChanges(changes: SimpleChanges): void {
    // Réinitialiser l'onglet à chaque ouverture
    if (changes['isOpen'] && this.isOpen) {
      this.activeDetailTab = 'general';
    }
  }


  closeModal() {
    this.closeFiche.emit()
    this.activeDetailTab = 'general';
    this.isOpen=false
  }
  
}
