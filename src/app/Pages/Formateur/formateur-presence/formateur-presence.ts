import { Component } from '@angular/core';
import { SessionDTO } from '../../../services/session-service';
import { PresenceService, RoleUser } from '../../../services/presence-service';
import { CommonModule } from '@angular/common';
import { PresenceComponent } from '../../../shared/components/presence-component/presence-component';
@Component({
  selector: 'app-formateur-presence',
  imports: [CommonModule,PresenceComponent],
  templateUrl: './formateur-presence.html',
  styleUrl: './formateur-presence.css',
})
export class FormateurPresence {
  session!:SessionDTO;
  role: RoleUser = 'FORMATEUR';
  activeTab = 'infos';
  constructor(private presenceService:PresenceService){}

  tabs = [
    { key: 'infos', label: 'Informations' },
    { key: 'apprenants', label: 'Apprenants' },
    { key: 'presences',  label: 'Presences' },
    { key: 'notes', label: 'Notes' },
  ];
}
