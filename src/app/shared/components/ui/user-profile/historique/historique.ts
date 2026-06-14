import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InscriptionResponseDTO } from '../../../../../services/inscription-service';
import { ApprenantService, FactureApprenant, SessionApprenant } from '../../../../../services/apprenant-service';
import { SessionPanel } from '../session-panel/session-panel';

@Component({
  selector: 'app-historique',
  imports: [CommonModule, FormsModule, SessionPanel],
  templateUrl: './historique.html',
  styleUrl: './historique.css',
})
export class Historique {

  inscriptions = signal<InscriptionResponseDTO[]>([]);
  sessions = signal<SessionApprenant[]>([]);
  factures = signal<FactureApprenant[]>([]);
  loading = signal(true);

  panelOuvert = signal(false);
  sessionSelectionnee = signal<SessionApprenant | null>(null);
  inscriptionSelectionnee = signal<InscriptionResponseDTO | null>(null);
  factureSelectionnee = signal<FactureApprenant | null>(null);

  constructor(
    private apprenantService: ApprenantService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.apprenantService.getInscriptions().subscribe(i => this.inscriptions.set(i));
      this.apprenantService.getMesSessions().subscribe(s => this.sessions.set(s));
      this.apprenantService.getMesFactures().subscribe(f => {
        this.factures.set(f);
        this.loading.set(false);
      });
    }
  }

  get inscriptionsTerminees(): InscriptionResponseDTO[] {
    return this.inscriptions().filter(i => {
      const session = this.sessions().find(s => s.nom === i.sessionNom);
      return session?.statut === 'TERMINEE';
    });
  }

  ouvrirPanel(inscription: InscriptionResponseDTO): void {
    this.inscriptionSelectionnee.set(inscription);
    this.sessionSelectionnee.set(
      this.sessions().find(s => s.nom === inscription.sessionNom) ?? null
    );
    this.factureSelectionnee.set(
      this.factures().find(f => f.sessionNom === inscription.sessionNom) ?? null
    );
    this.panelOuvert.set(true);
  }

  fermerPanel(): void {
    this.panelOuvert.set(false);
  }

  notesSauvegardees(): void {
    this.apprenantService.getInscriptions().subscribe(i => this.inscriptions.set(i));
  }
}