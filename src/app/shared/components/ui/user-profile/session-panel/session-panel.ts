import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApprenantService, FactureApprenant, SessionApprenant } from '../../../../../services/apprenant-service';
import { InscriptionResponseDTO } from '../../../../../services/inscription-service';

@Component({
  selector: 'app-session-panel',
  imports: [CommonModule,FormsModule],
  templateUrl: './session-panel.html',
  styleUrl: './session-panel.css',
})
export class SessionPanel {
  @Input() session: SessionApprenant | null = null;
  @Input() inscription: InscriptionResponseDTO | null = null;
  @Input() facture: FactureApprenant | null = null;
  @Input() ouvert = false;

  @Output() fermer = new EventEmitter<void>();
  @Output() notesSauvegardees = new EventEmitter<void>();

  noteFormateur = 0;
  noteFormation = 0;
  succes = false;
  erreur = '';

  constructor(private apprenantService: ApprenantService) {}

 
  ngOnChanges(): void {
    this.noteFormateur = this.inscription?.noteFormateur ?? 0;
    this.noteFormation = this.inscription?.noteFormation ?? 0;
    this.succes = false;
    this.erreur = '';
  }

  get estTerminee(): boolean {
    return this.inscription?.statut === 'TERMINEE';
  }

  sauvegarder(): void {
    if (!this.inscription) return;
    this.apprenantService.noterInscription(
      this.inscription.id,
      this.noteFormateur,
      this.noteFormation
    ).subscribe({
      next: () => {
        this.succes = true;
        this.erreur = '';
        this.notesSauvegardees.emit();
      },
      error: () => this.erreur = 'Erreur lors de la sauvegarde.'
    });
  }

  getStatutClass(statut: string): string {
    const map: Record<string, string> = {
      'CONFIRMEE':  'bg-green-100 text-green-700',
      'EN_ATTENTE': 'bg-yellow-100 text-yellow-700',
      'EN_COURS':   'bg-blue-100 text-blue-700',
      'TERMINEE':   'bg-gray-100 text-gray-500',
      'ANNULEE':    'bg-red-100 text-red-600',
    };
    return map[statut] ?? 'bg-gray-100 text-gray-500';
  }

  getStatutFactureClass(statut: string): string {
    const map: Record<string, string> = {
      'PAYEE':      'bg-green-100 text-green-700',
      'EN_ATTENTE': 'bg-yellow-100 text-yellow-700',
      'IMPAYEE':    'bg-red-100 text-red-700',
      'EMISE':      'bg-blue-100 text-blue-700',
    };
    return map[statut] ?? 'bg-gray-100 text-gray-500';
  }

  range(n: number): number[] {
    return Array.from({ length: n }, (_, i) => i + 1);
  }

}
