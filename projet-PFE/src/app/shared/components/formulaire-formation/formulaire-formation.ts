import { Component,Input,Output,EventEmitter ,OnChanges,SimpleChanges,OnInit} from '@angular/core';
import { Modal } from '../ui/modal/modal';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SwitchComponent } from '../ui/switch.component';
import { FormationService ,FormationRequest,FormationAdminDTO} from '../../../services/formation-service';
import { CompetenceService,CompetenceInfoDTO } from '../../../services/competence-service';
@Component({
  selector: 'app-formulaire-formation',
  standalone: true,
  imports: [Modal,FormsModule,CommonModule,SwitchComponent],
  templateUrl: './formulaire-formation.html',
  styleUrl: './formulaire-formation.css',
})
export class FormulaireFormation implements OnChanges,OnInit{
  @Input() selectedFormation: FormationAdminDTO | null = null;
  @Output() closeFormulaire = new EventEmitter<void>();
  @Input() isOpen: boolean = false;

  competences: CompetenceInfoDTO[] = [];
  selectedCompetenceNoms: string[] = [];
  isLoading = false;
  formationData: FormationRequest = {
    
    titre: '',
    description: '',
    dureeJours: null,
    dureeHeures: null,
    publicCible: '',
    prixPublic: null,
    prerequis: '',
    programme: '',
    version: '',
    actif: true
  };
  ngOnInit(): void {
    this.competenceService.getAllCompetence().subscribe(data=>{
      this.competences=data;
    });
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedFormation']) {
      if (this.selectedFormation) {
        this.formationData = { ...this.selectedFormation };
        this.selectedCompetenceNoms=this.selectedFormation.competenceDetail?.map(c=>c.nom)??[];
      } else {
        this.resetForm();
        this.selectedCompetenceNoms=[];
      }
      this.isLoading = false;
    }
  }
  toggleCompetence(nom:string){
    const index= this.selectedCompetenceNoms.indexOf(nom);
    if(index===-1){
      this.selectedCompetenceNoms.push(nom);
    }
    else{
      this.selectedCompetenceNoms.splice(index,1);
    }
  }
  constructor(private formationService: FormationService,private competenceService:CompetenceService) {}

  closeModal() {
    this.closeFormulaire.emit();
    this.resetForm();
  }

  resetForm() {
    this.formationData = {
      titre: '',
      description: '',
      dureeJours: null,
      dureeHeures: null,
      publicCible: '',
      prixPublic: null,
      prerequis: '',
      programme: '',
      version: '',
      actif: true,

    };
  }

  handleAddOrUpdateEvent() {
  const formationRequest: FormationRequest = {
    
    titre: this.formationData.titre,
    description: this.formationData.description,
    dureeHeures: this.formationData.dureeHeures,
    dureeJours: this.formationData.dureeJours, 
    prixPublic: this.formationData.prixPublic,
    publicCible: this.formationData.publicCible,
    prerequis: this.formationData.prerequis,
    programme: this.formationData.programme,
    version: this.formationData.version,
    actif: this.formationData.actif,
    competenceNoms: this.selectedCompetenceNoms,
  };
  console.log('Envoi sans code:', formationRequest);
  
  if (this.isLoading) return;
  this.isLoading = true;

  if (this.selectedFormation) {
    // Mise à jour
    this.formationService.updateFormation(this.selectedFormation.id, formationRequest)
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
    this.formationService.createFormation(formationRequest)
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
