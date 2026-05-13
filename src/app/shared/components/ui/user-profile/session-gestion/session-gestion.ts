import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PresenceRequestDTO, PresenceService, StatutPresence, TableauPresenceResponseDTO } from '../../../../../services/presence-service';
import { NoteRequest, NoteResponse, NoteService } from '../../../../../services/note-service';
import { SessionDTO } from '../../../../../services/session-service';
import { PresenceComponent } from '../../../presence-component/presence-component';
import { NoteComponent } from '../../../note-component/note-component';

@Component({
  selector: 'app-session-gestion',
  imports: [CommonModule,FormsModule,PresenceComponent,NoteComponent],
  templateUrl: './session-gestion.html',
  styleUrl: './session-gestion.css',
})
export class SessionGestion implements OnChanges{
  @Input() session: SessionDTO | null = null;
  @Input() ouvert = false;
  @Output() fermer = new EventEmitter<void>();

  panelTab = 'presences';
  

  constructor(
    private presenceService: PresenceService,
    private noteService: NoteService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['ouvert'] && this.ouvert) {
      this.panelTab = 'presences';
      
    }
    
  }

  setPanelTab(tab: string): void {
    this.panelTab = tab;
  }

  getStatutPresenceClass(statut: StatutPresence): string {
    const map: Record<string, string> = {
      'PRESENT':   'bg-green-500 text-white',
      'ABSENT':    'bg-red-500 text-white',
      'RETARD':    'bg-yellow-500 text-white',
      'EXCUSE':    'bg-blue-400 text-white',
      'NON_SAISI': 'bg-gray-200 text-gray-500',
    };
    return map[statut] ?? 'bg-gray-200 text-gray-500';
  }

}
