import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID, signal, computed } from '@angular/core';
import { ApprenantService, FactureApprenant, SessionApprenant } from '../../../../../services/apprenant-service';
import { InscriptionResponseDTO } from '../../../../../services/inscription-service';
import { FormsModule } from '@angular/forms';
import { SessionPanel } from '../session-panel/session-panel';
import { SeanceResponseDTO, SeanceService } from '../../../../../services/seance-service';
import { LucideAngularModule, Clock, MapPin, Check } from 'lucide-angular';

@Component({
  selector: 'app-planing',
  imports: [CommonModule, FormsModule, SessionPanel, LucideAngularModule],
  templateUrl: './planing.html',
  styleUrl: './planing.css',
})
export class Planing {

  sessions = signal<SessionApprenant[]>([]);
  inscriptions = signal<InscriptionResponseDTO[]>([]);
  factures = signal<FactureApprenant[]>([]);
  loading = signal(true);
  filterStatut = signal('TOUS');
  statuts = ['TOUS', 'CONFIRMEE', 'EN_ATTENTE', 'EN_COURS', 'TERMINEE'];

  panelOuvert = signal(false);
  sessionSelectionnee = signal<SessionApprenant | null>(null);
  inscriptionSelectionnee = signal<InscriptionResponseDTO | null>(null);
  factureSelectionnee = signal<FactureApprenant | null>(null);

  seancesOuvertes = signal<Record<number, boolean>>({});
  seancesMap = signal<Record<number, SeanceResponseDTO[]>>({});
  seancesLoading = signal<Record<number, boolean>>({});

  totalSeances = signal(0);
  assiduite = signal(0);

  constructor(
    private apprenantService: ApprenantService,
    private seanceService: SeanceService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.apprenantService.getMesSessions().subscribe(s => {
        this.sessions.set(s);
        this.totalSeances.set(s.reduce((acc, sess) => acc + (sess.nombreSeances ?? 0), 0));
      });
      this.apprenantService.getInscriptions().subscribe(i => this.inscriptions.set(i));
      this.apprenantService.getMesFactures().subscribe(f => {
        this.factures.set(f);
        this.loading.set(false);
      });
    }
  }

  get sessionsFiltrees(): SessionApprenant[] {
    if (this.filterStatut() === 'TOUS') return this.sessions();
    return this.sessions().filter(s => s.statut === this.filterStatut());
  }

  get prochaineSession(): SessionApprenant | null {
    const today = new Date();
    return this.sessions()
      .filter(s => new Date(s.dateDebut) >= today)
      .sort((a, b) => new Date(a.dateDebut).getTime() - new Date(b.dateDebut).getTime())[0] ?? null;
  }

  get terminees(): InscriptionResponseDTO[] {
    return this.inscriptions().filter(i => {
      const session = this.sessions().find(s => s.nom === i.sessionNom);
      return session?.statut === 'TERMINEE';
    });
  }

  get enCours(): InscriptionResponseDTO[] {
    return this.inscriptions().filter(i => {
      const session = this.sessions().find(s => s.nom === i.sessionNom);
      return session?.statut !== 'TERMINEE';
    });
  }

  get progressionPct(): number {
    if (this.inscriptions().length === 0) return 0;
    return Math.round((this.terminees.length / this.inscriptions().length) * 100);
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

  ouvrirPanel(session: SessionApprenant): void {
    this.sessionSelectionnee.set(session);
    this.inscriptionSelectionnee.set(
      this.inscriptions().find(i => i.sessionNom === session.nom) ?? null
    );
    this.factureSelectionnee.set(
      this.factures().find(f => f.sessionNom === session.nom) ?? null
    );
    this.panelOuvert.set(true);
  }

  fermerPanel(): void {
    this.panelOuvert.set(false);
  }

  notesSauvegardees(): void {
    this.apprenantService.getInscriptions().subscribe(i => this.inscriptions.set(i));
  }

  toggleSeances(session: SessionApprenant): void {
    const id = session.id;
    const ouvertes = { ...this.seancesOuvertes() };
    ouvertes[id] = !ouvertes[id];
    this.seancesOuvertes.set(ouvertes);

    if (ouvertes[id] && !this.seancesMap()[id]) {
      const loading = { ...this.seancesLoading() };
      loading[id] = true;
      this.seancesLoading.set(loading);

      this.seanceService.getSeancesBySession(id).subscribe({
        next: (seances) => {
          const map = { ...this.seancesMap() };
          map[id] = seances.sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
          );
          this.seancesMap.set(map);
          const l = { ...this.seancesLoading() };
          l[id] = false;
          this.seancesLoading.set(l);
        },
        error: () => {
          const map = { ...this.seancesMap() };
          map[id] = [];
          this.seancesMap.set(map);
          const l = { ...this.seancesLoading() };
          l[id] = false;
          this.seancesLoading.set(l);
        }
      });
    }
  }

  seancesEffectuees(sessionId: number): number {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return (this.seancesMap()[sessionId] ?? [])
      .filter(s => new Date(s.date) < today).length;
  }

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

  getModeIcon(mode: string): string {
    return mode === 'DISTANCIEL' ? '🎥' : '📍';
  }
}