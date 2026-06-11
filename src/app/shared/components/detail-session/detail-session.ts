import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component,ChangeDetectorRef, OnInit, ChangeDetectionStrategy, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionDTO, SessionService } from '../../../services/session-service';
import { PresenceComponent } from '../presence-component/presence-component';
import { RoleUser } from '../../../services/presence-service';
import { InscriptionService } from '../../../services/inscription-service';
import { NoteComponent } from '../note-component/note-component';
import { SeanceComponent } from '../seance-component/seance-component';
import { CandidaturesList } from '../reutilisable/candidatures/candidatures-list/candidatures-list';
import { Label } from '../input/label/label';
import { Apprenant } from '../../services/auth.service';
import { CertificatBatchConfig } from '../../services/certification.service';
import { CertificatDialog } from '../ui/certificat-dialog/certificat-dialog';

@Component({
  selector: 'app-detail-session',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule,PresenceComponent,NoteComponent,SeanceComponent,CandidaturesList,CertificatDialog],
  templateUrl: './detail-session.html',
  styleUrl: './detail-session.css',
})
export class DetailSession implements OnInit{
  session!:SessionDTO;
  role: RoleUser = 'PLANIFICATEUR';
  infoFields: { label: string; value: string }[] = [];
  activeTab = 'infos';
  apprenants: any[] = [];
  constructor(private route : ActivatedRoute,
    private router :Router , 
    private cdr:ChangeDetectorRef,
    private sessionService:SessionService,
    private inscriptionService:InscriptionService,
  @Inject(PLATFORM_ID) private platformId: Object){}
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token') ?? '';
      if (token) {
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          this.role = (payload.role as RoleUser) ?? 'PLANIFICATEUR';
        } catch {
          this.role = 'PLANIFICATEUR';
        }
      }
    }
    const id= this.route.snapshot.params['id'];
    console.log('ID:', id);
    this.sessionService.getSessionById(id).subscribe(s=>{
      this.session=s;
      this.buildInfoFields();
      this.loadApprenants();
      this.loadApprenantsCertifiables();
      this.cdr.markForCheck();
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
    { key: 'seances', label: 'Séances' },
    { key: 'candidatures',label:'Candidatures'},
    { key: 'certificats',  label: '🎓 Certificats' },
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

  apprenantsCertifiables: Apprenant[] = [];
  loadingCertifiables = false;
  dialogImprimerOuvert = false;
  certifConfig?: Partial<CertificatBatchConfig>;

  loadApprenantsCertifiables(): void {
  this.loadingCertifiables = true;
  this.inscriptionService
    .getApprenantsCertifiables(this.session.id) 
    .subscribe({
      next: (res) => {
        this.apprenantsCertifiables = res;
        this.loadingCertifiables = false;
        this.cdr.markForCheck();
      },
      error: () => { this.loadingCertifiables = false; }
    });
  }
  ouvrirImpression(): void {
 
  this.certifConfig = {
    formation:   this.session.formationNom ?? '',
    dateDebut:   this.session.dateDebut    ?? '',
    dateFin:     this.session.dateFin      ?? '',
    formateur:   this.session.formateurNom ?? '',
  };
  this.dialogImprimerOuvert = true;
  this.cdr.markForCheck();
}

fermerImpression(): void {
  this.dialogImprimerOuvert = false;
  this.cdr.markForCheck();
}

// changement des status
  planificationComplete = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;


  onPlanificationComplete(complet: boolean): void {
    this.planificationComplete = complet;
    this.cdr.markForCheck();
  }

  ouvrirSession(): void {
    if (!this.session.formateurId) {
      this.errorMessage = 'Assignez un formateur avant d\'ouvrir la session.';
      this.clearMessages();
      return;
    }
    this.sessionService.ouvrirSession(this.session.id).subscribe({
      next: (updated) => {
        this.session = updated;
        this.successMessage = 'Session ouverte avec succès ✅';
        this.cdr.markForCheck();
        this.clearMessages();
      },
      error: (err) => {
        this.errorMessage = err?.error?.message ?? 'Erreur lors de l\'ouverture.';
        this.cdr.markForCheck();
        this.clearMessages();
      }
    });
  }

  badgeClass(statut: string): string {
    const map: Record<string, string> = {
      'PLANIFIEE': 'bg-gray-100 text-gray-600',
      'OUVERTE':   'bg-blue-100 text-blue-600',
      'CONFIRMEE': 'bg-green-100 text-green-600',
      'EN_COURS':  'bg-yellow-100 text-yellow-600',
      'TERMINEE':  'bg-purple-100 text-purple-600',
      'ANNULEE':   'bg-red-100 text-red-600',
    };
    return map[statut] ?? 'bg-gray-100 text-gray-500';
  }

  private clearMessages(): void {
    setTimeout(() => {
      this.successMessage = null;
      this.errorMessage = null;
      this.cdr.markForCheck();
    }, 3000);
  }

  confirmerSession(): void {
  this.sessionService.confirmerSession(this.session.id).subscribe({
    next: (updated) => {
      this.session = updated;
      this.successMessage = 'Session confirmée ✅';
      this.cdr.markForCheck();
      this.clearMessages();
    },
    error: (err) => {
      this.errorMessage = err?.error?.message ?? 'Erreur lors de la confirmation.';
      this.cdr.markForCheck();
      this.clearMessages();
    }
  });
}
}

