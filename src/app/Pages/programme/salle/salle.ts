import { Component } from '@angular/core';
import { TableSalle } from '../../../shared/components/tables/table-salle/table-salle';
import { FormulaireSalle } from '../../../shared/components/formulaires/formulaire-salle/formulaire-salle';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-salle',
  imports: [TableSalle,FormulaireSalle,FormsModule,CommonModule],
  templateUrl: './salle.html',
  styleUrl: './salle.css',
})
export class Salle {
  isFormulaireOpen = false;

  openFormulaire() {
    
    this.isFormulaireOpen = true;
 
  }
  fermerFormulaire() {
    this.isFormulaireOpen = false;
  }

  
}
