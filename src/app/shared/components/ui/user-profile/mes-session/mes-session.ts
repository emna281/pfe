import { ChangeDetectorRef, Component, EventEmitter, Inject, OnInit, Output, PLATFORM_ID } from '@angular/core';
import { FormateurService } from '../../../../../services/formateur-service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { SessionDTO } from '../../../../../services/session-service';
import { MesSeances } from '../mes-seances/mes-seances';
export type PanelType = 'presence' | 'note';
export interface PanelEvent {
  session: SessionDTO;
  type: PanelType;
}
@Component({
  selector: 'app-mes-session',
  imports: [CommonModule,MesSeances],
  templateUrl: './mes-session.html',
  styleUrl: './mes-session.css',
})
export class MesSession implements OnInit{
    @Output() sessionClicked = new EventEmitter<SessionDTO>();
  @Output() openPanel      = new EventEmitter<PanelEvent>();
 
  sessions         : SessionDTO[] = [];
  filteredSessions : SessionDTO[] = [];
  loading          = true;
  filtreActif      : string = 'TOUS';
 
  // Séances panel — géré localement dans le composant
  sessionSeances   : SessionDTO | null = null;
 
  readonly filtres = [
    { label: 'Toutes',    value: 'TOUS'      },
    { label: 'En cours',  value: 'EN_COURS'  },
    { label: 'À venir',   value: 'PLANIFIEE' },
    { label: 'Confirmée', value: 'CONFIRMEE' },
    { label: 'Terminée',  value: 'TERMINEE'  },
  ];
 
  constructor(
    private formateurService: FormateurService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdr: ChangeDetectorRef
  ) {}
 
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.formateurService.getMesSessions().subscribe({
        next: (sessions) => {
          this.sessions = sessions;
          this.appliquerFilter();
          this.loading = false;
          this.cdr.detectChanges();
        },
        error: () => {
          this.loading = false;
          this.cdr.detectChanges();
        }
      });
    }
  }
 
  getStatutClass(statut: string): string {
    const map: Record<string, string> = {
      'CONFIRMEE':  'bg-green-100 text-green-700',
      'EN_ATTENTE': 'bg-yellow-100 text-yellow-700',
      'EN_COURS':   'bg-blue-100 text-blue-700',
      'TERMINEE':   'bg-gray-100 text-gray-500',
      'PLANIFIEE':  'bg-violet-100 text-violet-600',
    };
    return map[statut] ?? 'bg-gray-100 text-gray-500';
  }
 
  setFiltre(value: string): void {
    this.filtreActif = value;
    this.appliquerFilter();
  }
 
  private appliquerFilter(): void {
    this.filteredSessions = this.filtreActif === 'TOUS'
      ? [...this.sessions]
      : this.sessions.filter(s => s.statut === this.filtreActif);
  }
 
  onPresences(s: SessionDTO): void {
    this.sessionSeances = null;
    this.openPanel.emit({ session: s, type: 'presence' });
  }
 
  onNotes(s: SessionDTO): void {
    this.sessionSeances = null;
    this.openPanel.emit({ session: s, type: 'note' });
  }

  onSeances(s: SessionDTO): void {
    this.sessionSeances = this.sessionSeances?.id === s.id ? null : s;
  }
 
  fermerSeances(): void {
    this.sessionSeances = null;
  }

}
