import { Component } from '@angular/core';
import { TableCompetence } from '../../../shared/components/tables/table-competence/table-competence';
import { FormsModule } from '@angular/forms';
import { FormulaireCompetence } from '../../../shared/components/formulaires/formulaire-competence/formulaire-competence';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-competence',
  imports: [TableCompetence,FormsModule,FormulaireCompetence,CommonModule],
  templateUrl: './competence.html',
  styleUrl: './competence.css',
})
export class Competence {
  isFormulaireOpen = false;

  openFormulaire() {
    
    this.isFormulaireOpen = true;
  
  }
  fermerFormulaire() {
    this.isFormulaireOpen = false;
  }
}
