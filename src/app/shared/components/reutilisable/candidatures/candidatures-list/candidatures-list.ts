import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { AppelCandidatureDTO, AppelCandidatureService } from '../../../../../services/appel-candidature-service';

@Component({
  selector: 'app-candidatures-list',
  imports: [CommonModule],
  templateUrl: './candidatures-list.html',
  styleUrl: './candidatures-list.css',
})
export class CandidaturesList {
  @Input() sessionId!: number;
  @Input() formateurDejaAffecte: boolean = false; // ← true si session a déjà un formateur

  candidaturesAcceptees: AppelCandidatureDTO[] = [];
  candidaturesEnAttente: AppelCandidatureDTO[] = [];
  candidaturesRefusees: AppelCandidatureDTO[] = [];
  choisirEnCours: number | null = null;
  loading = true;

  constructor(
    private appelService: AppelCandidatureService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.chargerCandidatures();
  }

  chargerCandidatures(): void {
    this.loading = true;
    this.appelService.getCandidaturesParSession(this.sessionId).subscribe({
      next: (data) => {
        this.candidaturesAcceptees = data.filter(c => c.statut === 'ACCEPTEE');
        this.candidaturesEnAttente = data.filter(c => c.statut === 'ENVOYEE');
        this.candidaturesRefusees  = data.filter(c => c.statut === 'REFUSEE');
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Erreur candidatures:', err);
        this.loading = false;
        this.cdr.markForCheck();
      }
    });
  }

  get total(): number {
    return this.candidaturesAcceptees.length
      + this.candidaturesEnAttente.length
      + this.candidaturesRefusees.length;
  }

  getInitiales(prenom: string, nom: string): string {
    return (prenom?.[0] ?? '') + (nom?.[0] ?? '');
  }

  choisirFormateur(candidatureId: number): void {
    this.choisirEnCours = candidatureId;
    this.appelService.choisirFormateur(candidatureId).subscribe({
      next: () => {
        alert('✅ Formateur affecté avec succès !');
        this.choisirEnCours = null;
        this.formateurDejaAffecte = true;
        this.chargerCandidatures();
      },
      error: (err) => {
        console.error('Erreur affectation:', err);
        this.choisirEnCours = null;
        this.cdr.markForCheck();
      }
    });
  }
}
