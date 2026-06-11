import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SeanceResponseDTO } from '../../../../../services/seance-service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-prochaine-seance',
  imports: [CommonModule,RouterModule],
  templateUrl: './prochaine-seance.html',
  styleUrl: './prochaine-seance.css',
})
export class ProchaineSeance {
  @Input() seance!: SeanceResponseDTO;
  @Output() demarrer = new EventEmitter<SeanceResponseDTO>();
  @Output() feuillePresence = new EventEmitter<SeanceResponseDTO>();

}
