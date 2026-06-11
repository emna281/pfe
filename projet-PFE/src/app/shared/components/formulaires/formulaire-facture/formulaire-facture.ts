import { Component,Input,Output,EventEmitter,OnChanges,SimpleChanges} from '@angular/core';
import { FactureResponseDTO, FactureService,FactureCreateDTO,FactureUpdateDTO } from '../../../../services/facture-service';
import { Modal } from '../../ui/modal/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { FormulairePaiement } from '../formulaire-paiement/formulaire-paiement';
import { PaiementService ,PaiementRequestDTO} from '../../../../services/paiement-service';
@Component({
  selector: 'app-formulaire-facture',
  imports: [Modal,FormsModule,CommonModule,ReactiveFormsModule,FormulairePaiement],
  templateUrl: './formulaire-facture.html',
  styleUrl: './formulaire-facture.css',
})
export class FormulaireFacture {
  @Input() selectedFacture: FactureResponseDTO | null = null;
  @Output() closeFormulaire = new EventEmitter<void>();
  @Output() factureUpdated = new EventEmitter<void>();
  @Input() isOpen: boolean = false;
  factureData: any = { 
    dateEcheance: '',
    remise: null as number | null,
    notes: '',
    statut:'',
  };

  paiementData: any = {
    datePaiement: new Date().toISOString().substring(0, 10),
    montant: null,
    modePaiement: ''
  };
  errorMessage = '';
  activeTab: 'parametres' | 'paiement' = 'parametres';
  constructor(private factureService:FactureService,private paiementService: PaiementService) {}
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedFacture'] && this.selectedFacture) {
      this.activeTab = 'parametres';
      this.errorMessage = '';
      this.factureData = {
        dateEcheance: this.selectedFacture.dateEcheance
          ? this.selectedFacture.dateEcheance.toString().substring(0, 10)
          : '',
        remise: this.selectedFacture.remise
          ? Number(this.selectedFacture.remise)
          : null,
        notes: this.selectedFacture.notes || '',
        statut:this.selectedFacture.statut || '',
      };
    } else if (changes['selectedFacture'] && !this.selectedFacture) {
      this.resetForm();
    }
  }
  getMontantRestant(): number {
    return this.selectedFacture?.montantRestant || 0;
  }
  validerChampsPaiement(): boolean {
    this.errorMessage = '';
    if (!this.paiementData.montant || this.paiementData.montant <= 0) {
      this.errorMessage = 'Le montant doit être supérieur à 0';
      return false;
    }
    if (this.paiementData.montant > this.getMontantRestant()) {
      this.errorMessage = `Le montant ne peut pas dépasser ${this.getMontantRestant().toFixed(2)} TND`;
      return false;
    }
    if (!this.paiementData.modePaiement) {
      this.errorMessage = 'Veuillez choisir un mode de paiement';
      return false;
    }
    return true;
  }
  closeModal() {
    this.closeFormulaire.emit();
    this.resetForm();
  }
    
  resetForm() {
    this.activeTab = 'parametres'; 
    this.errorMessage = '';
    this.factureData = {
      dateEcheance: '',
      remise: null,
      notes: '',    
      statut:'',
    };
  }
    
  handleUpdateEvent() {
    console.log('selectedFacture:', this.selectedFacture);      // ← est-il null ?
    console.log('factureData:', this.factureData);
    if (!this.selectedFacture){ 
      console.log('STOP : selectedFacture est null');
      return
    };

    const factureRequest: FactureUpdateDTO = {
      dateEcheance: this.factureData.dateEcheance || undefined,
      remise: this.factureData.remise,
      notes: this.factureData.notes,
      statut: this.factureData.statut,
    };
    if (this.factureData.statut === 'PAYE') {
      // ✅ Valider les champs paiement avant d'envoyer
      if (!this.validerChampsPaiement()) return;

      // ✅ updateFacture → puis ajouterPaiement en séquence
      this.factureService.updateFacture(this.selectedFacture.id, factureRequest)
        .pipe(
          switchMap(() => {
            const paiementRequest: PaiementRequestDTO = {
              datePaiement: this.paiementData.datePaiement,
              montant: this.paiementData.montant,
              modePaiement: this.paiementData.modePaiement
            };
            return this.paiementService.ajouterPaiement(this.selectedFacture!.id, paiementRequest);
          })
        ).subscribe({
          next: () => {
            this.factureUpdated.emit();
            this.closeModal();
          },
          error: (err) => {
            this.errorMessage = err.error || 'Erreur lors de l\'enregistrement';
          }
        });

    } else { this.factureService.updateFacture(this.selectedFacture.id, factureRequest)
        .subscribe({
          next: () => {
            this.factureUpdated.emit();
            this.closeModal();
          },
          error: (err) => console.error('Erreur mise à jour:', err)
        });
    }
  }
  


}
