import { Component,Input,Output,EventEmitter ,OnChanges,SimpleChanges,OnInit, ChangeDetectorRef} from '@angular/core';
import { Modal } from '../ui/modal/modal';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SwitchComponent } from '../ui/switch.component';
import { FormationService ,FormationRequest,FormationAdminDTO} from '../../../services/formation-service';
import { CompetenceService,CompetenceInfoDTO } from '../../../services/competence-service';
import { LucideAngularModule ,SquarePen,Plus} from 'lucide-angular';
@Component({
  selector: 'app-formulaire-formation',
  standalone: true,
  imports: [Modal,FormsModule,CommonModule,SwitchComponent,LucideAngularModule],
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
      this.cdr.detectChanges();
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
  toggleCompetence(nom: string) {
  const index = this.selectedCompetenceNoms.indexOf(nom);
  if (index === -1) {
    this.selectedCompetenceNoms = [...this.selectedCompetenceNoms, nom]; // nouveau tableau → détection
  } else {
    this.selectedCompetenceNoms = this.selectedCompetenceNoms.filter(n => n !== nom);
  }
}
  constructor(private formationService: FormationService,
    private competenceService:CompetenceService,
    private cdr: ChangeDetectorRef ) {}

  closeModal() {
    this.closeFormulaire.emit();
    this.resetForm();
    this.cdr.detectChanges();
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

activeTab: string = 'general';

tabs = [
  { id: 'general',   label: 'Informations générales', icon: 'info' },
  { id: 'duree',     label: 'Durée',                  icon: 'clock' },
  { id: 'pedagogie', label: 'Détails pédagogiques',   icon: 'book-open' },
  { id: 'statut',    label: 'Statut',                 icon: 'toggle-left' },
];

}
