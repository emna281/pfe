import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, PLATFORM_ID } from '@angular/core';
import { ApprenantService, FactureApprenant, SessionApprenant } from '../../../../../services/apprenant-service';
import { InscriptionResponseDTO } from '../../../../../services/inscription-service';
import { FormsModule } from '@angular/forms';
import { SessionPanel } from '../session-panel/session-panel';
import { SeanceResponseDTO, SeanceService } from '../../../../../services/seance-service';
import { LucideAngularModule ,Clock,MapPin} from 'lucide-angular';

@Component({
  selector: 'app-planing',
  imports: [CommonModule,FormsModule,SessionPanel,LucideAngularModule],
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

  seancesOuvertes: Record<number, boolean> = {};
  seancesMap: Record<number, SeanceResponseDTO[]> = {};
  seancesLoading: Record<number, boolean> = {};

  totalSeances = 0;
  assiduite = 0;

  
  constructor(
    private apprenantService: ApprenantService,
    private seanceService: SeanceService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.apprenantService.getMesSessions().subscribe(s => {
      this.sessions = s;
      this.totalSeances = s.reduce((acc, sess) => acc + (sess.nombreSeances?? 0), 0);
    });
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
      'OUVERTE':    'bg-green-100 text-green-700',
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


  // Toggle dépliage séances d'une session
toggleSeances(session: SessionApprenant): void {
  const id = session.id;
  this.seancesOuvertes[id] = !this.seancesOuvertes[id];

  // Charger les séances si pas encore fait
  if (this.seancesOuvertes[id] && !this.seancesMap[id]) {
    this.seancesLoading[id] = true;
    this.seanceService.getSeancesBySession(id).subscribe({
      next: (seances) => {
        this.seancesMap[id] = seances.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
        this.seancesLoading[id] = false;
      },
      error: () => {
        this.seancesMap[id] = [];
        this.seancesLoading[id] = false;
      }
    });
  }
}

// Nombre de séances effectuées (date passée)
seancesEffectuees(sessionId: number): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return (this.seancesMap[sessionId] ?? [])
    .filter(s => new Date(s.date) < today).length;
}

// États d'une séance
isSeanceFaite(seance: SeanceResponseDTO): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(seance.date) < today;
}

isSeanceCourante(seance: SeanceResponseDTO): boolean {
  const today = new Date();
  const d = new Date(seance.date);
  return d.toDateString() === today.toDateString();
}

isSeanceFuture(seance: SeanceResponseDTO): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(seance.date) > today;
}

// Classe CSS du numéro de séance
getSeanceNumClass(seance: SeanceResponseDTO): string {
  if (this.isSeanceFaite(seance))
    return 'bg-green-100 text-green-700';
  if (this.isSeanceCourante(seance))
    return 'text-white' ; // avec style inline background:#378ADD
  return 'bg-gray-100 text-gray-400 dark:bg-gray-700';
}

}
