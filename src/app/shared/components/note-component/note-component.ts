import { CommonModule } from '@angular/common';
import { Component ,Input, OnInit} from '@angular/core';
import { RoleUser } from '../../../services/presence-service';
import { NoteRequest, NoteResponse, NoteService } from '../../../services/note-service';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
@Component({
  selector: 'app-note-component',
  imports: [CommonModule,FormsModule,LucideAngularModule],
  templateUrl: './note-component.html',
  styleUrl: './note-component.css',
})
export class NoteComponent implements OnInit{
  @Input() sessionId!: number;
  @Input() role: 'FORMATEUR' | 'PLANIFICATEUR' = 'PLANIFICATEUR';

  notes: NoteResponse[] = [];
  loading = false;
  saving: { [inscriptionId: number]: boolean } = {};
  notesEditees: { [inscriptionId: number]: number } = {};

  constructor(private noteService: NoteService) {}

  ngOnInit(): void {
    this.chargerNotes();
  }

  chargerNotes(): void {
    this.loading = true;
    this.noteService.getTableauNotes(this.sessionId).subscribe({
      next: (data) => {
        this.notes = data;
        data.forEach(n => {
          if (n.note !== null) {
            this.notesEditees[n.inscriptionId] = n.note;
          }
        });
        this.loading = false;
      },
      error: (err: any) => {
        console.error('Erreur chargement notes:', err);
        this.loading = false;
      }
    });
  }

  initialiser(): void {
    this.loading = true;
    this.noteService.initialiserNotes(this.sessionId).subscribe({
      next: (data) => {
        this.notes = data;
        this.loading = false;
      },
      error: (err: any) => {
        console.error('Erreur initialisation:', err);
        this.loading = false;
      }
    });
  }

  sauvegarderNote(note: NoteResponse): void {
    const valeur = this.notesEditees[note.inscriptionId];
    if (valeur === undefined || valeur === null) return;
    if (valeur < 0 || valeur > 20) {
      alert('La note doit être entre 0 et 20');
      return;
    }

    this.saving[note.inscriptionId] = true;

    const request: NoteRequest = {
      inscriptionId: note.inscriptionId,
      note: valeur
    };

    this.noteService.ajouterNote(this.sessionId, request).subscribe({
      next: (updated) => {
        const index = this.notes.findIndex(n => n.inscriptionId === note.inscriptionId);
        if (index !== -1) this.notes[index] = updated;
        this.saving[note.inscriptionId] = false;
      },
      error: (err: any) => {
        console.error('Erreur sauvegarde:', err);
        this.saving[note.inscriptionId] = false;
      }
    });
  }

  getBadgeClass(evaluation: string | null): string {
    switch (evaluation) {
      case 'EXCELLENT':  return 'bg-green-100 text-green-700';
      case 'TRES_BIEN':  return 'bg-blue-100 text-blue-700';
      case 'BIEN':       return 'bg-cyan-100 text-cyan-700';
      case 'PASSABLE':   return 'bg-yellow-100 text-yellow-700';
      case 'INSUFFISANT': return 'bg-red-100 text-red-700';
      default:           return 'bg-gray-100 text-gray-500';
    }
  }

  getNoteColor(note: number | null): string {
    if (note === null) return 'text-gray-400';
    if (note >= 16) return 'text-green-600 font-bold';
    if (note >= 10) return 'text-blue-600 font-semibold';
    return 'text-red-600 font-semibold';
  }
  get peutEditer(): boolean {
  return this.role === 'FORMATEUR';
}
}