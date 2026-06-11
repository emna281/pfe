import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, PLATFORM_ID } from '@angular/core';
import { ApprenantService, FactureApprenant, SessionApprenant } from '../../../../../services/apprenant-service';
import { InscriptionResponseDTO } from '../../../../../services/inscription-service';
import { FormsModule } from '@angular/forms';
import { SessionPanel } from '../session-panel/session-panel';

@Component({
  selector: 'app-planing',
  imports: [CommonModule,FormsModule,SessionPanel],
  templateUrl: './planing.html',
  styleUrl: './planing.css',
})
export class Planing {
  
  sessions:SessionApprenant[]=[];
  inscriptions: InscriptionResponseDTO[] = [];
  factures: FactureApprenant[] = [];
  loading = true;
  filterStatut='TOUS';
  statuts = ['TOUS', 'CONFIRMEE', 'EN_ATTENTE', 'EN_COURS', 'TERMINEE'];

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
      this.apprenantService.getMesSessions().subscribe(s => this.sessions = s);
      this.apprenantService.getInscriptions().subscribe(i => this.inscriptions = i);
      this.apprenantService.getMesFactures().subscribe(f => {
        this.factures = f;
        this.loading = false;
      });
    }
  }

  get sessionsFiltrees(): SessionApprenant[] {
    if (this.filterStatut === 'TOUS') return this.sessions;
    return this.sessions.filter(s => s.statut === this.filterStatut);
  }

  get prochaineSession(): SessionApprenant | null {
    const today = new Date();
    return this.sessions
      .filter(s => new Date(s.dateDebut) >= today)
      .sort((a, b) => new Date(a.dateDebut).getTime() - new Date(b.dateDebut).getTime())[0] ?? null;
  }
  get terminees(): InscriptionResponseDTO[] {
    return this.inscriptions.filter(i => i.statut === 'TERMINEE');
  }

  get enCours(): InscriptionResponseDTO[] {
    return this.inscriptions.filter(i =>
      ['EN_ATTENTE', 'CONFIRMEE', 'EN_COURS'].includes(i.statut)
    );
  }

  get progressionPct(): number {
    if (this.inscriptions.length === 0) return 0;
    return Math.round((this.terminees.length / this.inscriptions.length) * 100);
  }
  getStatutClass(statut: string): string {
    const map: Record<string, string> = {
      'CONFIRMEE':  'bg-green-100 text-green-600',
      'EN_ATTENTE': 'bg-yellow-100 text-yellow-600',
      'EN_COURS':   'bg-blue-100 text-blue-600',
      'TERMINEE':   'bg-gray-100 text-gray-500',
      'ANNULEE':    'bg-red-100 text-red-600',
    };
    return map[statut] ?? 'bg-gray-100 text-gray-500';
  }
  getModeIcon(mode:string):string{
    return mode === 'DISTANCIEL'? '🎥' : '📍';
  }
  ouvrirPanel(session: SessionApprenant): void {
  this.sessionSelectionnee = session;
  this.inscriptionSelectionnee = this.inscriptions.find(
    i => i.sessionNom === session.nom
  ) ?? null;
  this.factureSelectionnee = this.factures.find(
    f => f.sessionNom === session.nom
  ) ?? null;
  this.panelOuvert = true;
}

fermerPanel(): void {
  this.panelOuvert = false;
}

notesSauvegardees(): void {
  // optionnel : recharger les inscriptions
  this.apprenantService.getInscriptions().subscribe(i => this.inscriptions = i);
}

}
