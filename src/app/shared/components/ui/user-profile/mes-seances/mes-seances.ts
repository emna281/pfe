import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, signal } from '@angular/core';
import { SeanceResponseDTO } from '../../../../../services/seance-service';
import { FormateurService } from '../../../../../services/formateur-service';
import { SessionDTO } from '../../../../../services/session-service';

@Component({
  selector: 'app-mes-seances',
  imports: [CommonModule],
  templateUrl: './mes-seances.html',
  styleUrl: './mes-seances.css',
})
export class MesSeances implements OnInit{
  @Input() session!: SessionDTO;
 
  seances     = signal<SeanceResponseDTO[]>([]);
  loading     = signal(true);
  erreur      = signal('');
 
  today = new Date();
  
 
  constructor(private formateurService: FormateurService) {}
 
  ngOnInit(): void {
    this.today.setHours(0, 0, 0, 0);
    this.formateurService.getSeancesSession(this.session.id).subscribe({
      next: (data) => {
        this.seances.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.erreur.set('Impossible de charger les séances.');
        this.loading.set(false);
      }
    });
  }

  get nombreTotal(): number {
    return this.seances().length;
  }
 
  get nombreRealisees(): number {
    return this.seances().filter(s => this.estRealisee(s)).length;
  }
 
  get progression(): number {
    if (this.nombreTotal === 0) return 0;
    return Math.round((this.nombreRealisees / this.nombreTotal) * 100);
  }
 
  estRealisee(seance: SeanceResponseDTO): boolean {
    const dateSeance = new Date(seance.date);
    dateSeance.setHours(0, 0, 0, 0);
    return dateSeance <= this.today;
  }
 
  formatHeure(heure: string): string {
    return heure?.slice(0, 5) ?? '—';
  }
 
  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('fr-FR', {
      weekday: 'short', day: '2-digit', month: 'short'
    });
  }
}
