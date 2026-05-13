import { Component } from '@angular/core';
import { TableFormation } from '../../../shared/components/table-formation/table-formation';
import { FormsModule } from '@angular/forms';
import { FormulaireFormation } from '../../../shared/components/formulaire-formation/formulaire-formation';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-formation',
  imports: [TableFormation,FormsModule,FormulaireFormation,CommonModule],
  templateUrl: './formation.html',
  styleUrl: './formation.css',
})
export class Formation {
  isFormulaireOpen = false;

  openFormulaire() {
    
    this.isFormulaireOpen = true;
 
  }
  fermerFormulaire() {
    this.isFormulaireOpen = false;
  }
}
