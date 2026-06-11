import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, model, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { SessionDTO, SessionService } from '../../../../services/session-service';
import { InscriptionRequest, InscriptionResponseDTO, InscriptionService } from '../../../../services/inscription-service';
import { Modal } from '../../ui/modal/modal';

@Component({
  selector: 'app-formulaire-inscr-apprenant',
  imports: [CommonModule,FormsModule,LucideAngularModule,Modal],
  templateUrl: './formulaire-inscr-apprenant.html',
  styleUrl: './formulaire-inscr-apprenant.css',
})
export class FormulaireInscrApprenant implements OnChanges{
    @Input() isOpen: boolean = false;
  @Input() sessionId: number | null = null;   
@Input() apprenantEmail: string | null = null;
  @Output() closeFormulaire = new EventEmitter<void>();
  @Output() inscriptionCreee = new EventEmitter<InscriptionResponseDTO>();

  sessions: SessionDTO[] = [];
  isLoading = false;
  errorMessage = '';

  inscriptionData: InscriptionRequest = {
    apprenantEmail: '',

    sessionId: 0,
  };

  constructor(
    private inscriptionService: InscriptionService,
    private sessionService: SessionService,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isOpen'] && this.isOpen) {
      this.resetForm();
      this.chargerSessions();
    }
    if (changes['sessionId'] && this.sessionId) {
      this.inscriptionData.sessionId = this.sessionId;
    }
    if (changes['apprenantEmail'] && this.apprenantEmail) {
      this.inscriptionData.apprenantEmail = this.apprenantEmail;
    }
  }

  chargerSessions(): void {
    this.sessionService.getAllSession().subscribe({
      next: (data) => this.sessions = data,
      error: (err) => console.error('Erreur chargement sessions:', err),
    });
  }

  handleSubmit(): void {
    if (!this.inscriptionData.apprenantEmail || !this.inscriptionData.sessionId) {
      this.errorMessage = 'Veuillez remplir tous les champs obligatoires.';
      return;
    }
    this.isLoading = true;
    this.errorMessage = '';
    this.inscriptionService.createInscription(this.inscriptionData).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.inscriptionCreee.emit(res);
        this.closeModal();
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error?.message || 'Une erreur est survenue.';
      },
    });
  }

  closeModal(): void {
    this.closeFormulaire.emit();
    this.resetForm();
  }

  resetForm(): void {
    this.inscriptionData = {
      apprenantEmail: this.apprenantEmail ?? '',
      sessionId: this.sessionId ?? 0,
    };
    this.errorMessage = '';
    this.isLoading = false;
  }
}
