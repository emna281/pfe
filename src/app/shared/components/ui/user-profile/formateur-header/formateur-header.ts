import { CommonModule } from '@angular/common';
import { Component, Input, Output,EventEmitter } from '@angular/core';
import { FormateurProfil } from '../../../../../services/formateur-service';
import { LucideAngularModule,Calendar,User,Book,Star } from 'lucide-angular';


@Component({
  selector: 'app-formateur-header',
  imports: [CommonModule,LucideAngularModule],
  templateUrl: './formateur-header.html',
  styleUrl: './formateur-header.css',
})
export class FormateurHeader {
  @Input() profil!: FormateurProfil;
  @Input() nombreSessions = 0;
  @Input() activeTab = 'sessions';
  @Input() tabs: { id: string; label: string }[] = [];
  @Output() tabChange = new EventEmitter<string>();

  calendar=Calendar;
  user=User;
  book=Book;
  star=Star;

  getInitiales(): string {
    return `${this.profil.prenom[0]}${this.profil.nom[0]}`.toUpperCase();
  }

}
