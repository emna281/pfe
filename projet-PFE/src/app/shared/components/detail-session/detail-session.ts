import { CommonModule } from '@angular/common';
import { Component,ChangeDetectorRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionDTO, SessionService } from '../../../services/session-service';
import { PresenceComponent } from '../presence-component/presence-component';
import { RoleUser } from '../../../services/presence-service';
import { InscriptionService } from '../../../services/inscription-service';
import { NoteComponent } from '../note-component/note-component';

@Component({
  selector: 'app-detail-session',
  imports: [CommonModule,PresenceComponent,NoteComponent],
  templateUrl: './detail-session.html',
  styleUrl: './detail-session.css',
})
export class DetailSession implements OnInit{
  session!:SessionDTO;
  role: RoleUser = 'PLANIFICATEUR';
  infoFields: { label: string; value: string }[] = [];
  activeTab = 'infos';
  apprenants: any[] = [];
  constructor(private route : ActivatedRoute,private router :Router , private cdr:ChangeDetectorRef,private sessionService:SessionService,private inscriptionService:InscriptionService){}
  ngOnInit(): void {
    const id= this.route.snapshot.params['id'];
    console.log('ID:', id);
    this.sessionService.getSessionById(id).subscribe(s=>{
      this.session=s;
      this.buildInfoFields();
      this.loadApprenants();
      this.cdr.detectChanges();
    })
  }
  private buildInfoFields(): void {
    if (!this.session) { this.infoFields = []; return; }
    const s = this.session;
    this.infoFields = [
      { label: 'Code',             value: s.code ?? '' },
      { label: 'Formation',        value: s.formationNom ?? '' },
      { label: 'Formateur',        value: s.formateurNom ?? '' },
      { label: 'Places max',       value: String(s.placesMax ?? '') },
      { label: 'Places restantes', value: String(s.placesRestantes ?? '') },
      { label: 'Mode',             value: s.mode ?? '' },
      { label: 'Lieu',             value: s.lieu ?? '' },
      { label: 'Date début',       value: s.dateDebut ?? '' },
      { label: 'Date fin',         value: s.dateFin ?? '' },
    ];
  }
  getInitiales(titre?: string): string {
    if (!titre) return '??';
    return titre.split(' ').slice(0, 2).map(w => w[0]?.toUpperCase() ?? '').join('');
  }
  tabs = [
    { key: 'infos', label: 'Informations' },
    { key: 'apprenants', label: 'Apprenants' },
    { key: 'presences',  label: 'Presences' },
    { key: 'notes', label: 'Notes' },
  ];

 

loadApprenants() {
  this.inscriptionService
    .getInscriptionsBySession(this.session.id)
    .subscribe(res => {
      this.apprenants = res.map(i => ({
        nom: i.apprenantNom,
        prenom: i.apprenantPrenom
      }));
    });
}
}

