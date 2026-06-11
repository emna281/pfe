import { Component } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { TableSession } from '../../../shared/components/tables/table-session/table-session';
import { FormulaireSession } from '../../../shared/components/formulaires/formulaire-session/formulaire-session';

@Component({
  selector: 'app-session',
  imports: [TableSession,FormsModule,FormulaireSession,CommonModule],
  templateUrl: './session.html',
  styleUrl: './session.css',
})
export class Session {
  isFormulaireOpen = false;

  openFormulaire() {
   
    this.isFormulaireOpen = true;
  
  }
  fermerFormulaire() {
    this.isFormulaireOpen = false;
  }

}
