import { Component,Output,Input, OnChanges ,SimpleChanges, OnInit, ChangeDetectorRef} from '@angular/core';
import { TableauPresenceResponseDTO,PresenceService,LignePresenceResponseDTO,PresenceResponseDTO,StatutPresence ,RoleUser, SeanceColonneDTO} from '../../../services/presence-service';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-presence-component',
  imports: [CommonModule,FormsModule],
  templateUrl: './presence-component.html',
  styleUrl: './presence-component.css',
})
export class PresenceComponent implements OnInit,OnChanges {
  @Input() sessionId!: number;
  @Input() role!: RoleUser;
 
  // ── État ──
  tableau: TableauPresenceResponseDTO | null = null;
  loading       = false;
  initLoading   = false;
  ficheInitialisee = false;
  savingKey     = '';
  errorMsg      = '';
  successMsg    = '';
 
  // ── Popup commentaire ──
  popupVisible  = false;
  popupLigne:   LignePresenceResponseDTO | null = null;
  popupSeanceId: number | null = null;
  popupStatut:  StatutPresence = 'NON_SAISI';
  popupCommentaire  = '';
  popupJustificatif = '';
  popupSaving   = false;
  popupError    = '';
 
  constructor(
    private presenceService: PresenceService,
    private cdr: ChangeDetectorRef
  ) {}
 
  ngOnInit(): void { this.chargerTableau(); }
 
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['sessionId'] && !changes['sessionId'].firstChange)
      this.chargerTableau();
  }

  chargerTableau(): void {
    if (!this.sessionId) return;
    this.loading  = true;
    this.errorMsg = '';
 
    const obs$ = this.role === 'FORMATEUR'
      ? this.presenceService.getTableauFormateur(this.sessionId)
      : this.presenceService.getTableau(this.sessionId);
 
    obs$.pipe(finalize(() => { this.loading = false; this.cdr.markForCheck(); }))
      .subscribe({
        next: (data) => {
          this.tableau = data;
          this.ficheInitialisee = data.lignes.length > 0;
        },
        error: () => { this.ficheInitialisee = false; }
      });
  }

  initialiserFiche(): void {
    this.initLoading = true;
    this.errorMsg    = '';
    this.successMsg  = '';
 
    const obs$ = this.role === 'FORMATEUR'
      ? this.presenceService.initialiserFicheFormateur(this.sessionId)
      : this.presenceService.initialiserFiche(this.sessionId);
 
    obs$.pipe(finalize(() => { this.initLoading = false; this.cdr.markForCheck(); }))
      .subscribe({
        next: (res) => {
          this.successMsg = `Fiche initialisée : ${res.apprenants} apprenant(s) × ${res.seances} séance(s).`;
          this.chargerTableau();
        },
        error: (err) => {
          this.errorMsg = err?.error?.message ?? 'Erreur lors de l\'initialisation.';
        }
      });
  }

  onCheckboxChange(
    ligne: LignePresenceResponseDTO,
    seanceId: number,
    statut: StatutPresence
  ): void {
    if (!this.peutModifier) return;
 
    const actuel = ligne.presencesParSeance[seanceId]?.statut ?? 'NON_SAISI';
    const nouveau: StatutPresence = actuel === statut ? 'NON_SAISI' : statut;
 
    this.savingKey = `${ligne.inscriptionId}-${seanceId}`;
    this.errorMsg  = '';
 
    this.presenceService.marquerPresence({
      inscriptionId: ligne.inscriptionId,
      seanceId,
      statut: nouveau,
    }).subscribe({
      next: (updated) => {
        ligne.presencesParSeance[seanceId] = updated;
        this.savingKey = '';
        this.cdr.markForCheck();
      },
      error: () => {
        this.errorMsg  = 'Erreur lors du marquage.';
        this.savingKey = '';
        this.cdr.markForCheck();
      }
    });
  }
 
  // ── Popup commentaire ──────────────────────────────────────────
 
  openPopup(ligne: LignePresenceResponseDTO, seanceId: number): void {
    if (!this.peutModifier) return;
    const p = ligne.presencesParSeance[seanceId];
    this.popupLigne        = ligne;
    this.popupSeanceId     = seanceId;
    this.popupStatut       = p?.statut ?? 'PRESENT';
    this.popupCommentaire  = p?.commentaireFormateur ?? '';
    this.popupJustificatif = p?.justificatifAbsence  ?? '';
    this.popupError        = '';
    this.popupVisible      = true;
    this.cdr.markForCheck();
  }
 
  closePopup(): void { this.popupVisible = false; this.cdr.markForCheck(); }
 
  savePopup(): void {
    if (!this.popupLigne || this.popupSeanceId === null) return;
    this.popupSaving = true;
    this.popupError  = '';
 
    this.presenceService.marquerPresence({
      inscriptionId:        this.popupLigne.inscriptionId,
      seanceId:             this.popupSeanceId,
      statut:               this.popupStatut,
      commentaireFormateur: this.popupCommentaire  || undefined,
      justificatifAbsence:  this.popupJustificatif || undefined,
    }).subscribe({
      next: (updated) => {
        this.popupLigne!.presencesParSeance[this.popupSeanceId!] = updated;
        this.popupSaving  = false;
        this.popupVisible = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        this.popupError  = err?.error?.message ?? 'Erreur.';
        this.popupSaving = false;
        this.cdr.markForCheck();
      }
    });
  }
 
  // ── Helpers ────────────────────────────────────────────────────
 
  getStatut(ligne: LignePresenceResponseDTO, seanceId: number): StatutPresence {
    return ligne.presencesParSeance[seanceId]?.statut ?? 'NON_SAISI';
  }
 
  isSaving(ligne: LignePresenceResponseDTO, seanceId: number): boolean {
    return this.savingKey === `${ligne.inscriptionId}-${seanceId}`;
  }
 
  getNombrePresents(ligne: LignePresenceResponseDTO): number {
    return Object.values(ligne.presencesParSeance)
      .filter(p => p.statut === 'PRESENT').length;
  }
 
  getTaux(ligne: LignePresenceResponseDTO): number {
    if (!this.tableau?.nombreSeances) return 0;
    return Math.round((this.getNombrePresents(ligne) / this.tableau.nombreSeances) * 100);
  }
 
  getBadgeClass(taux: number): string {
    if (taux >= 75) return 'bg-green-100 text-green-700';
    if (taux >= 50) return 'bg-yellow-100 text-yellow-700';
    return 'bg-red-100 text-red-700';
  }
 
  hasCommentaire(ligne: LignePresenceResponseDTO, seanceId: number): boolean {
    const p = ligne.presencesParSeance[seanceId];
    return !!(p?.commentaireFormateur || p?.justificatifAbsence);
  }
 
  get seancesArray(): SeanceColonneDTO[] {
    return this.tableau?.seances ?? [];
  }
 
  get peutModifier(): boolean {
    return this.role === 'FORMATEUR';
  }
 
  get peutInitialiser(): boolean {
    return !this.ficheInitialisee &&
      (this.role === 'PLANIFICATEUR' || this.role === 'FORMATEUR');
  }
 
  trackByInscription(_: number, l: LignePresenceResponseDTO): number {
    return l.inscriptionId;
  }
 
  trackBySeance(_: number, s: SeanceColonneDTO): number {
    return s.id;
  }
}
