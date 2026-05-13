import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InscriptionResponseDTO } from '../../../../../services/inscription-service';
import { ApprenantService, FactureApprenant, SessionApprenant } from '../../../../../services/apprenant-service';
import { SessionPanel } from '../session-panel/session-panel';

@Component({
  selector: 'app-historique',
  imports: [CommonModule,FormsModule,SessionPanel],
  templateUrl: './historique.html',
  styleUrl: './historique.css',
})
export class Historique {
  inscriptions: InscriptionResponseDTO[] = [];
  sessions: SessionApprenant[] = [];
  factures: FactureApprenant[] = [];
  loading = true;

  panelOuvert = false;
  sessionSelectionnee: SessionApprenant | null = null;
  inscriptionSelectionnee: InscriptionResponseDTO | null = null;
  factureSelectionnee: FactureApprenant | null = null;



  constructor(
    private apprenantService: ApprenantService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.apprenantService.getInscriptions().subscribe(i => this.inscriptions = i);
      this.apprenantService.getMesSessions().subscribe(s => this.sessions = s);
      this.apprenantService.getMesFactures().subscribe(f => {
        this.factures = f;
        this.loading = false;
      });
    }
  }

  get inscriptionsTerminees(): InscriptionResponseDTO[] {
    return this.inscriptions.filter(i => i.statut === 'TERMINEE');
  }

ouvrirPanel(inscription: InscriptionResponseDTO): void {
  this.inscriptionSelectionnee=inscription;
  this.sessionSelectionnee=this.sessions.find(
    s=>s.nom===inscription.sessionNom
  )?? null;
  this.factureSelectionnee=this.factures.find(
    f=>f.sessionNom===inscription.sessionNom
  )?? null;
  this.panelOuvert=true;
}

fermerPanel(): void {
  this.panelOuvert = false;
}

notesSauvegardees(): void {
  // optionnel : recharger les inscriptions
  this.apprenantService.getInscriptions().subscribe(i => this.inscriptions = i);
}


}
