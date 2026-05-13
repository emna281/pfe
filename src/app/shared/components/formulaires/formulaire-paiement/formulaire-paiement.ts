import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { FactureResponseDTO} from '../../../../services/facture-service';
import { CodeRemise } from '../../../../services/code-remise';

@Component({
  selector: 'app-formulaire-paiement',
  imports: [CommonModule,FormsModule],
  templateUrl: './formulaire-paiement.html',
  styleUrl: './formulaire-paiement.css',
})
export class FormulairePaiement {
 
  @Input() selectedFacture: FactureResponseDTO | null = null;

  @Input() paiementData:any = {
    datePaiement: new Date().toISOString().substring(0, 10),
    montant: null as number | null,
    modePaiement: '',
    codeRemise: null as string | null
  };

  @Output() paiementDataChange = new EventEmitter<any>();

  modesPaiement = ['ESPECES', 'CHEQUE', 'VIREMENT', 'CARTE'];
  errorMessage = '';

  codeRemiseSaisi = '';
  loadingCode = false;
  erreurCode = '';
  codeApplique = false;
  montantTTCApresRemise: number | null = null;
  
  constructor(private codeRemiseService: CodeRemise){}
  
   ngOnInit(): void {
    // Pré-remplir montant avec le restant
    if (this.paiementData.montant === null) {
      this.paiementData.montant = this.getMontantRestant();
    }
  }

  getMontantRestant(): number {
    if (this.montantTTCApresRemise !== null) {
      const paye = this.selectedFacture?.montantPaye ?? 0;
      return Math.max(0, this.montantTTCApresRemise - paye);
    }
    return this.selectedFacture?.montantRestant ?? 0;
  }

  getMontantTTC(): number {
    return this.montantTTCApresRemise ?? this.selectedFacture?.montantTTC ?? 0;
  }

  get remiseDejaAppliquee(): boolean {
    return (this.selectedFacture?.remise ?? 0) > 0;
  }

  appliquerCode(): void {
  if (!this.codeRemiseSaisi.trim() || !this.selectedFacture) return;
  this.loadingCode = true;
  this.erreurCode = '';

  const apprenantId = this.selectedFacture.apprenantId;

  this.codeRemiseService
    .validerCode(this.codeRemiseSaisi, apprenantId)
    .subscribe({
      next: (codeReponse) => {
        // Recalcul local uniquement
        const prixOriginal = this.selectedFacture!.montantHT /
          (1 - (this.selectedFacture!.remise ?? 0) / 100);
        const nouveauHT = prixOriginal * (1 - codeReponse.pourcentage / 100);
        const nouveauTTC = Math.round(nouveauHT * 1.20 * 100) / 100;

        this.montantTTCApresRemise = nouveauTTC;
        this.codeApplique = true;
        this.paiementData.codeRemise = this.codeRemiseSaisi; // envoyé au backend au submit
        this.paiementData.montant = this.getMontantRestant();
        this.loadingCode = false;
        this.onChampChange();
      },
      error: (err) => {
        this.erreurCode = err.error?.message || 'Code invalide ou expiré';
        this.loadingCode = false;
      }
    });
}

  onChampChange() {
    this.paiementDataChange.emit(this.paiementData);
  }


}
