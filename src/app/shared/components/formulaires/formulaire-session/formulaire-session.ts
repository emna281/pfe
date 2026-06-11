import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnInit, ChangeDetectorRef } from '@angular/core';
import { Modal } from '../../ui/modal/modal';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SessionService, SessionDTO, SessionRequest } from '../../../../services/session-service';
import { FormationService, FormationAdminDTO } from '../../../../services/formation-service';
import { AppelCandidatureService } from '../../../../services/appel-candidature-service';
import { LucideAngularModule ,Plus} from 'lucide-angular';

@Component({
  selector: 'app-formulaire-session',
  imports: [Modal, FormsModule, CommonModule,LucideAngularModule],
  templateUrl: './formulaire-session.html',
  styleUrl: './formulaire-session.css',
})
export class FormulaireSession implements OnChanges, OnInit {
  @Input() selectedSession: SessionDTO | null = null;
  @Input() formationCode: string | undefined = '';
  @Output() closeFormulaire = new EventEmitter<void>();
  @Input() isOpen: boolean = false;

  formateurs: any[] = [];
  formations: FormationAdminDTO[] = [];  // ← liste des formations
  competenceFormation: string = '';
  modesAffectation = [
  { value: 'directe', label: 'Sélection directe',    icon: 'user-check' },
  { value: 'appel',   label: 'Appel à candidature',  icon: 'megaphone' },
];
  modeAffectation: string = 'directe';

  sessionData: SessionRequest = {
    nom: '',
    dateDebut: '',
    dateFin: '',
    heureDebut: '',
    heureFin: '',
    statut: '',
    mode: '',
    lieu: '',
    lienVisio: '',
    materielRequis: '',
    placesMax: null,
    formationCode: '',
    formateurId: null,
  };

  activeTab: string = 'identification';
  tabs = [
  { id: 'identification', label: 'Identification',    icon: 'badge-info' },
  { id: 'planification',  label: 'Planification',     icon: 'calendar-days' },
  { id: 'etat',           label: 'État & Config',     icon: 'settings-2' },
  { id: 'lieu',           label: 'Lieu & Ressources', icon: 'map-pin' },
  { id: 'formateur',      label: 'Formateur',         icon: 'user-check' },
];
  constructor(
    private sessionService: SessionService,
    private formationService: FormationService,
    private appelService: AppelCandidatureService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // ← charger toutes les formations au démarrage
    this.formationService.getAllFormations().subscribe({
      next: (data) => {
        this.formations = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Erreur chargement formations:', err)
    });
  }

  ngOnChanges(changes: SimpleChanges) {
  if (changes['isOpen'] && this.isOpen) {
    // Reset l'onglet à chaque ouverture
    this.activeTab = 'identification';
  }

  if (changes['selectedSession']) {
    if (this.selectedSession) {
      this.sessionData = {
        nom: this.selectedSession.nom,
        dateDebut: this.selectedSession.dateDebut,
        dateFin: this.selectedSession.dateFin,
        heureDebut: this.selectedSession.heureDebut?.substring(0, 5),
        heureFin: this.selectedSession.heureFin?.substring(0, 5),
        statut: this.selectedSession.statut,
        mode: this.selectedSession.mode,
        lieu: this.selectedSession.lieu,
        lienVisio: this.selectedSession.lienVisio,
        materielRequis: this.selectedSession.materielRequis,
        placesMax: this.selectedSession.placesMax,
        formationCode: this.selectedSession.formationCode,
        formateurId: this.selectedSession.formateurId ?? null,
      };

      // ✅ Toujours charger si on a un formationCode
      const code = this.selectedSession.formationCode || this.formationCode;
      if (code) {
        this.chargerFormateurs(code);
      }

    } else {
      this.resetForm();
      if (this.formationCode) {
        this.chargerFormateurs(this.formationCode);
      }
    }
  }

  if (changes['formationCode'] && this.formationCode) {
    this.sessionData.formationCode = this.formationCode;
    this.chargerFormateurs(this.formationCode);
  }
}

  // ← appelé quand l'utilisateur change la formation dans le select
  onFormationChange(): void {
  if (this.sessionData.formationCode) {
    this.formateurs = [];          // reset d'abord
    this.competenceFormation = '';
    this.chargerFormateurs(this.sessionData.formationCode);
  } else {
    this.formateurs = [];
    this.competenceFormation = '';
    this.cdr.detectChanges();
  }
}

  closeModal() {
    this.closeFormulaire.emit();
    this.resetForm();
    this.sessionData.formationCode = this.formationCode || '';
  }

  resetForm() {
    this.sessionData = {
      nom: '',
      dateDebut: '',
      dateFin: '',
      heureDebut: '',
      heureFin: '',
      statut: '',
      mode: '',
      lieu: '',
      lienVisio: '',
      materielRequis: '',
      placesMax: null,
      formationCode: this.formationCode || '',
      formateurId: null,
    };
    this.formateurs = [];
    this.competenceFormation = '';
    
  }

  handleAddOrUpdateEvent() {
    const sessionRequest: SessionRequest = {
      nom: this.sessionData.nom,
      dateDebut: this.sessionData.dateDebut,
      dateFin: this.sessionData.dateFin,
      heureDebut: this.sessionData.heureDebut + ':00',
      heureFin: this.sessionData.heureFin + ':00',
      placesMax: this.sessionData.placesMax,
      statut: this.sessionData.statut,
      mode: this.sessionData.mode,
      lieu: this.sessionData.lieu,
      lienVisio: this.sessionData.lienVisio,
      materielRequis: this.sessionData.materielRequis,
      formationCode: this.sessionData.formationCode,
      formateurId: this.modeAffectation === 'directe'
        ? (this.sessionData.formateurId ?? null)
        : null,
    };

    if (this.selectedSession) {
      this.sessionService.updateSession(this.selectedSession.id, sessionRequest).subscribe({
        next: (res) => {
          if (this.modeAffectation === 'appel') {
            this.appelService.envoyerAppel(res.id).subscribe({
              next: (appels) => {
                alert(`✅ Appel envoyé à ${appels.length} formateur(s)`);
                this.closeModal();
              },
              error: () => this.closeModal()
            });
          } else {
            this.closeModal();
          }
        },
        error: (err) => console.error('Erreur mise à jour:', err)
      });
    } else {
      this.sessionService.createSession(sessionRequest).subscribe({
        next: (session) => {
          if (this.modeAffectation === 'appel') {
            this.appelService.envoyerAppel(session.id).subscribe({
              next: (appels) => {
                alert(`✅ Appel envoyé à ${appels.length} formateur(s)`);
                this.closeModal();
              },
              error: () => this.closeModal()
            });
          } else {
            this.closeModal();
          }
        },
        error: (err) => {
          console.error('Erreur ajout:', err);
          alert('Erreur: ' + (err.error?.message || 'Inconnue'));
        }
      });
    }
  }

  chargerFormateurs(formationCode: string): void {
  this.formateurs = [];
  this.competenceFormation = '';
console.log('🔍 chargerFormateurs appelé avec:', formationCode);
  this.formationService.getFormationByCode(formationCode).subscribe({
    next: (formation) => {
      console.log('📦 Formation reçue:', formation);
      console.log('🎯 competenceDetail:', formation.competenceDetail);
      const competences = formation.competenceDetail ?? [];
      console.log('📋 Nombre de compétences:', competences.length);
      if (competences.length === 0) {
        console.warn('⚠️ Aucune compétence trouvée');
        this.cdr.detectChanges();
        return;
      }

      this.competenceFormation = competences[0].nom;  
      console.log('✅ competenceFormation:', this.competenceFormation);
      this.cdr.detectChanges();                        

      this.sessionService.getFormateursByCompetence(this.competenceFormation).subscribe({
        next: (formateurs) => {
          console.log('👥 Formateurs reçus:', formateurs);
          this.formateurs = [...formateurs];
          this.cdr.detectChanges();
        },
        
        error: (err) => console.error('Erreur formateurs:', err)
      });
    },
    error: (err) => console.error('Erreur formation:', err)
  });
}
}