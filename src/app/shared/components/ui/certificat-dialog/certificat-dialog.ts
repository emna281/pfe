import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Apprenant } from '../../../services/auth.service';
import { CertificatBatchConfig, CertificatService } from '../../../services/certification.service';

@Component({
  selector: 'app-certificat-dialog',
  imports: [CommonModule,FormsModule],
  templateUrl: './certificat-dialog.html',
  styleUrl: './certificat-dialog.css',
})
export class CertificatDialog implements OnInit{
  @Input()  apprenants: Apprenant[] = [];
  @Output() closed = new EventEmitter<void>();

  @Input() sessionFormation = '';
  @Input() sessionDateDebut = '';
  @Input() sessionDateFin   = '';
  @Input() sessionFormateur = '';
  @Input() sessionDuree?: number;
 
  formation    = '';
  dateDebut    = '';
  dateFin      = '';
  formateur    = '';
  dureeHeures?: number;
 
  constructor(private certificatService: CertificatService) {}
 

  ngOnInit(): void {
    this.formation   = this.sessionFormation;
    this.dateDebut   = this.sessionDateDebut;  
    this.dateFin     = this.sessionDateFin;
    this.formateur   = this.sessionFormateur;
    this.dureeHeures = this.sessionDuree;
  }

  peutImprimer(): boolean {
    return !!this.formation && !!this.dateDebut && !!this.dateFin && this.apprenants.length > 0;
  }
 
  imprimer(): void {
    if (!this.peutImprimer()) return;
 
    const config: CertificatBatchConfig = {
      formation:   this.formation,
      dateDebut:   new Date(this.dateDebut).toLocaleDateString('fr-FR'),
      dateFin:     new Date(this.dateFin).toLocaleDateString('fr-FR'),
      formateur:   this.formateur || undefined,
      dureeHeures: this.dureeHeures || undefined,
    };
 
    this.certificatService.imprimerToutesLesAttestations(this.apprenants, config);
    this.fermer();
  }
 
  fermer(): void { this.closed.emit(); }
}
