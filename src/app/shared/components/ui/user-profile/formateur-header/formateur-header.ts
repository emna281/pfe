import { CommonModule } from '@angular/common';
import { Component, Input, Output,EventEmitter } from '@angular/core';
import { FormateurProfil } from '../../../../../services/formateur-service';


@Component({
  selector: 'app-formateur-header',
  imports: [CommonModule],
  templateUrl: './formateur-header.html',
  styleUrl: './formateur-header.css',
})
export class FormateurHeader {
  @Input() profil!: FormateurProfil;
  @Input() nombreSessions = 0;
  @Input() activeTab = 'sessions';
  @Input() tabs: { id: string; label: string }[] = [];
  @Output() tabChange = new EventEmitter<string>();

  getInitiales(): string {
    return `${this.profil.prenom[0]}${this.profil.nom[0]}`.toUpperCase();
  }

}
