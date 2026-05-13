import { Component,Input,Output,EventEmitter,OnChanges,SimpleChanges } from '@angular/core';
import { Modal } from '../../ui/modal/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SessionService,SessionDTO,SessionRequest } from '../../../../services/session-service';
import { FormationService } from '../../../../services/formation-service';

@Component({
  selector: 'app-formulaire-session',
  imports: [Modal,FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './formulaire-session.html',
  styleUrl: './formulaire-session.css',
})
export class FormulaireSession implements  OnChanges{
  @Input() selectedSession: SessionDTO | null = null;
  @Input() formationCode:string |undefined='';
    @Output() closeFormulaire = new EventEmitter<void>();
    @Input() isOpen: boolean = false;
  formateurs: any[] = [];
  competenceFormation: string = '';


    sessionData: SessionRequest = {  
      nom: "",
      dateDebut:"" ,
      dateFin: "",
      heureDebut: "",
      heureFin: "",
          
      statut: "",
      mode: "",
      lieu: "",
      lienVisio: "",
      materielRequis: "",
      placesMax: null,     
          
      formationCode: '', 
      formateurId:null,
    };
  
    constructor(private sessionService: SessionService,private formationService:FormationService) {}
     
      ngOnChanges(changes: SimpleChanges) {
        if(changes['selectedSession']){
          if(this.selectedSession){
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
              formateurId: this.sessionData.formateurId ?? null,
            }; 
            if (this.selectedSession.formationCode) {
              this.chargerFormateurs(this.selectedSession.formationCode);
            }
          }
          else{
            this.resetForm();            
          }
        }
        if (changes['formationCode'] && this.formationCode) {
          this.sessionData.formationCode = this.formationCode;
          this.chargerFormateurs(this.formationCode);
        }
      }
      closeModal() {
        this.closeFormulaire.emit();
        this.resetForm();
        this.sessionData.formationCode = this.formationCode || '';
      }
    
      resetForm() {
        this.sessionData = {
          nom: "",
          dateDebut:"" ,
          dateFin: "",
          heureDebut: "",
          heureFin: "",
          
          statut: "",
          mode: "",
          lieu: "",
          lienVisio: "",
          materielRequis: "",
          placesMax: null,     
         
          formationCode: this.formationCode||'',
          formateurId:null,
        };
        this.formateurs=[];
        this.competenceFormation='';
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
        formateurId: this.sessionData.formateurId ?? null,
      };
      console.log('Envoi sans code:', sessionRequest);
      if (this.selectedSession) {
        // Mise à jour
        this.sessionService.updateSession(this.selectedSession.id, sessionRequest)
          .subscribe({
            next: (res) => {
              console.log('Formation mise à jour:', res);
              console.log('Code généré:', res.code);
              this.closeModal();
            },
            error: (err) => {console.error('Erreur mise à jour:', err);
              console.error('❌ Erreur:', err);
              console.log("Status:", err.status);
  console.log("Backend message:", err.error);

  if (err.error && Array.isArray(err.error.errors)) {
    err.error.errors.forEach((e: any) => {
      console.log("FIELD:", e.field);
      console.log("MESSAGE:", e.defaultMessage);
    });
  } else {
    console.log("Pas de détails de validation, erreur serveur !");
  }
            }
          });
      } else {
        // Création
        this.sessionService.createSession(sessionRequest)
          .subscribe({
            next: (res) => {
              console.log('Formation ajoutée:', res);
              console.log('Code généré automatiquement:', res.code);
              this.closeModal();
            },
            error: (err) => {console.error('Erreur ajout:', err);alert('Erreur: ' + (err.error?.message || err.error || 'Inconnue'));}
          });
      }
    }
    chargerFormateurs(formationCode: string): void {
  this.formationService.getFormationByCode(formationCode).subscribe({
    next: (formation) => {
      // ✅ competenceDetail est un tableau d'objets
      const competences = formation.competenceDetail ?? [];
      
      if (competences.length === 0) {
        console.warn('Aucune compétence pour cette formation');
        this.formateurs = [];
        return;
      }

      // ✅ Prendre le nom de la première compétence
      this.competenceFormation = competences[0].nom;
      console.log('Compétence:', this.competenceFormation);

      this.sessionService.getFormateursByCompetence(this.competenceFormation).subscribe({
        next: (formateurs) => {
          console.log('Formateurs reçus:', formateurs);
          this.formateurs = formateurs;
        },
        error: (err) => console.error('Erreur formateurs:', err)
      });
    },
    error: (err) => console.error('Erreur formation:', err)
  });
}

  }
