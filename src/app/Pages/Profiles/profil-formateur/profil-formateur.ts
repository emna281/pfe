import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID, signal } from '@angular/core';
import { FormateurHeader } from '../../../shared/components/ui/user-profile/formateur-header/formateur-header';

import { MesSession, PanelEvent } from '../../../shared/components/ui/user-profile/mes-session/mes-session';
import { SessionDTO } from '../../../services/session-service';
import { FormateurProfil, FormateurService } from '../../../services/formateur-service';
import { PresenceComponent } from '../../../shared/components/presence-component/presence-component';
import { NoteComponent } from '../../../shared/components/note-component/note-component';
import { RoleUser } from '../../../services/presence-service';
import { SessionGestion } from '../../../shared/components/ui/user-profile/session-gestion/session-gestion';
import { FormateurParametres } from '../../../shared/components/ui/user-profile/formateur-parametres/formateur-parametres';
import { ProchaineSeance } from '../../../shared/components/ui/user-profile/prochaine-seance/prochaine-seance';
import { SeanceResponseDTO } from '../../../services/seance-service';
import { AppelCandidatureDTO, AppelCandidatureService } from '../../../services/appel-candidature-service';

@Component({
  selector: 'app-profil-formateur',
  imports: [CommonModule,FormateurHeader,MesSession,SessionGestion,FormateurParametres,ProchaineSeance],
  templateUrl: './profil-formateur.html',
  styleUrl: './profil-formateur.css',
})
export class ProfilFormateur {
  profil = signal<FormateurProfil | null>(null);
  nombreSessions = signal(0);
  role: RoleUser = 'FORMATEUR';
  vue = signal<'liste' | 'presences' | 'notes'>('liste');
  activeTab = signal('sessions');
  candidatures = signal<AppelCandidatureDTO[]>([]);
  tabs = [
    { id: 'sessions',   label: 'Mes sessions' },
    { id: 'candidatures',  label: 'Candidatures' },
    { id: 'parametres', label: 'Profil'   },
  ];

 
   sessionSelectionnee = signal<SessionDTO | null>(null);
  prochaineSeance = signal<SeanceResponseDTO | null>(null);
  constructor(
    private formateurService: FormateurService,
    private appelService:AppelCandidatureService,
    @Inject(PLATFORM_ID) private platformId: Object,
    
  ) {}

   ngOnInit(): void {
    this.formateurService.getMonProfil().subscribe({
      next: (profil) => this.profil.set(profil),
      error: (err) => console.error('Erreur profil:', err)
    });

    this.formateurService.getMesSessions().subscribe({
      next: (sessions) => this.nombreSessions.set(sessions.length),
      error: (err) => console.error('Erreur sessions:', err)
    });

    this.formateurService.getProchaineSeance().subscribe({
      next: (seance) => this.prochaineSeance.set(seance),
    });
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user?.id) {
      this.appelService.getMesDemandes(user.id).subscribe({
        next: (data) => this.candidatures.set(data),
        error: (err) => console.error('Erreur candidatures:', err)
      });
    }
}

  onOpenPanel(event: PanelEvent): void {
    this.sessionSelectionnee.set(event.session);
  }

  fermerPanel(): void {
    this.sessionSelectionnee.set(null);
  }

changerOnglet(tab: string): void {
  this.activeTab.set(tab);
  this.fermerPanel();
}
accepterCandidature(id: number): void {
    this.appelService.accepter(id, '').subscribe({
      next: (updated) => {
        this.candidatures.update(list =>
          list.map(c => c.id === id ? updated : c)
        );
      }
    });
  }

  refuserCandidature(id: number): void {
    this.appelService.refuser(id, '').subscribe({
      next: (updated) => {
        this.candidatures.update(list =>
          list.map(c => c.id === id ? updated : c)
        );
      }
    });
  }


}
