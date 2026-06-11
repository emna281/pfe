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

@Component({
  selector: 'app-profil-formateur',
  imports: [CommonModule,FormateurHeader,MesSession,SessionGestion,FormateurParametres],
  templateUrl: './profil-formateur.html',
  styleUrl: './profil-formateur.css',
})
export class ProfilFormateur {
  profil = signal<FormateurProfil | null>(null);
  nombreSessions = signal(0);
  role: RoleUser = 'FORMATEUR';
vue = signal<'liste' | 'presences' | 'notes'>('liste');
activeTab = signal('sessions');
  tabs = [
    { id: 'sessions',   label: 'Mes sessions' },
    { id: 'parametres', label: 'Paramètres'   },
  ];

 
   sessionSelectionnee = signal<SessionDTO | null>(null);

  constructor(
    private formateurService: FormateurService,
    @Inject(PLATFORM_ID) private platformId: Object,
    
  ) {}

   ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.formateurService.getMonProfil().subscribe({
        next: (profil) => this.profil.set(profil),
        error: (err) => console.error('Erreur profil:', err)
      });
      this.formateurService.getMesSessions().subscribe({
        next: (sessions) => this.nombreSessions.set(sessions.length)
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

}
