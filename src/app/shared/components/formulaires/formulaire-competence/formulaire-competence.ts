import { Component,Input,Output,EventEmitter } from '@angular/core';
import { Modal } from '../../ui/modal/modal';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CompetenceInfoDTO ,CompetenceRequest,CompetenceService} from '../../../../services/competence-service';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-formulaire-competence',
  imports: [Modal,FormsModule,CommonModule,LucideAngularModule],
  templateUrl: './formulaire-competence.html',
  styleUrl: './formulaire-competence.css',
})
export class FormulaireCompetence {
  @Input() selectedCompetence: CompetenceInfoDTO | null = null;
  @Output() closeFormulaire = new EventEmitter<void>();
  @Input() isOpen: boolean = false;
  competenceData: any = {   
    name: '',
    description: '',
    categorie:'',
    formation:null,
  };

  constructor(private competenceService: CompetenceService) {}
  
    closeModal() {
      this.closeFormulaire.emit();
      this.resetForm();
    }
  
    resetForm() {
      this.competenceData = {
        name: '',
        description: '',
        categorie:'',
        formation:null,
      };
    }
  
    handleAddOrUpdateEvent() {
    const competenceRequest: CompetenceRequest = {
      nom: this.competenceData.nom,
      description: this.competenceData.description,
      categorie: this.competenceData.categorie,
      formations: this.competenceData.formations,
      
    };
    console.log('Envoi sans code:', competenceRequest);
    if (this.selectedCompetence) {
      // Mise à jour
      this.competenceService.updateCompetence(this.selectedCompetence.id, competenceRequest)
        .subscribe({
          next: (res) => {
            console.log('Formation mise à jour:', res);
            console.log('Code généré:', res.code);
            this.closeModal();
          },
          error: (err) => {console.error('Erreur mise à jour:', err);
            console.error('❌ Erreur:', err);
          }
        });
    } else {
      // Création
      this.competenceService.createCompetence(competenceRequest)
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
  
}
