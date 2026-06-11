import { Component,Output,Input, OnChanges ,SimpleChanges, OnInit} from '@angular/core';
import { TableauPresenceResponseDTO,PresenceService,LignePresenceResponseDTO,PresenceResponseDTO,StatutPresence ,RoleUser} from '../../../services/presence-service';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-presence-component',
  imports: [CommonModule],
  templateUrl: './presence-component.html',
  styleUrl: './presence-component.css',
})
export class PresenceComponent implements OnInit,OnChanges {
  @Input() sessionId!: number;
  @Input() role!: RoleUser;

  tableau: TableauPresenceResponseDTO | null = null;
  loading = false;
  initLoading = false;
  ficheInitialisee = false;
  savingKey = '';
  errorMsg = '';
  successMsg = '';
  
  constructor(private presenceService: PresenceService) {}
 
  ngOnInit(): void {
    this.chargerTableau();
  }
  ngOnChanges(changes: SimpleChanges): void {
  if (changes['sessionId'] && !changes['sessionId'].firstChange) {
    this.chargerTableau();
  }
}

  chargerTableau(): void {
  if (!this.sessionId) return;
  this.loading = true;
  this.errorMsg = '';

  // ✅ Choisir l'endpoint selon le rôle
  const tableau$ = this.role === 'FORMATEUR'
    ? this.presenceService.getTableauFormateur(this.sessionId)
    : this.presenceService.getTableau(this.sessionId);

  tableau$.pipe(finalize(() => this.loading = false)).subscribe({
    next: (data) => {
      this.tableau = data;
      this.ficheInitialisee = data.lignes.length > 0;
    },
    error: (err) => {
      console.log('Erreur tableau:', err.status);
      this.ficheInitialisee = false;
    }
  });
}

initialiserFiche(): void {
  this.initLoading = true;
  this.errorMsg = '';
  this.successMsg = '';


  const initialiser$ = this.role === 'FORMATEUR'
    ? this.presenceService.initialiserFicheFormateur(this.sessionId)
    : this.presenceService.initialiserFiche(this.sessionId);

  initialiser$.subscribe({
    next: (res) => {
      this.successMsg = `Fiche initialisée : ${res.apprenants} apprenants × ${res.joursParApprenant} jours`;
      this.initLoading = false;
      this.chargerTableau();
    },
    error: (err) => {
      this.errorMsg = err.error?.message || 'Erreur lors de l\'initialisation.';
      this.initLoading = false;
    }
  });
}

  onCheckboxChange(
    ligne: LignePresenceResponseDTO,
    jourNumero: number,
    statut: StatutPresence
  ): void {
    if (!this.peutModifier) return;

    const actuel = ligne.presencesParJour[jourNumero]?.statut ?? 'NON_SAISI';
    const nouveau: StatutPresence = actuel === statut ? 'NON_SAISI' : statut;

    this.savingKey = `${ligne.inscriptionId}-${jourNumero}`;
    this.errorMsg = '';

    this.presenceService.marquerPresence({
      inscriptionId: ligne.inscriptionId,
      jourNumero,
      statut: nouveau
    }).subscribe({
      next: (updated: PresenceResponseDTO) => {
        ligne.presencesParJour[jourNumero] = updated;
        this.savingKey = '';
      },
      error: () => {
        this.errorMsg = 'Erreur lors du marquage.';
        this.savingKey = '';
      }
    });
  }
  getStatut(ligne: LignePresenceResponseDTO, jourNumero: number): StatutPresence {
    return ligne.presencesParJour[jourNumero]?.statut ?? 'NON_SAISI';
  }

  isSaving(ligne: LignePresenceResponseDTO, jourNumero: number): boolean {
    return this.savingKey === `${ligne.inscriptionId}-${jourNumero}`;
  }

  getNombrePresents(ligne: LignePresenceResponseDTO): number {
    return Object.values(ligne.presencesParJour)
      .filter(p => p.statut === 'PRESENT').length;
  }

  getTaux(ligne: LignePresenceResponseDTO): number {
    if (!this.tableau?.dureeJours) return 0;
    return Math.round(
      (this.getNombrePresents(ligne) / this.tableau.dureeJours) * 100
    );
  }

  getBadgeClass(taux: number): string {
    if (taux >= 75) return 'bg-green-100 text-green-700';
    if (taux >= 50) return 'bg-yellow-100 text-yellow-700';
    return 'bg-red-100 text-red-700';
  }

  get joursArray(): number[] {
    if (!this.tableau) return [];
    return Array.from({ length: this.tableau.dureeJours }, (_, i) => i + 1);
  }
  get peutModifier(): boolean {
    return this.role === 'FORMATEUR';
  }

  get peutInitialiser(): boolean {
    return !this.ficheInitialisee && (this.role === 'PLANIFICATEUR' || this.role === 'FORMATEUR');
  }

  trackByInscription(_: number, l: LignePresenceResponseDTO): number {
    return l.inscriptionId;
  }

}
