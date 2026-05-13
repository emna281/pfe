import { Component,Input,Output,EventEmitter ,SimpleChanges, inject} from '@angular/core';
import { Modal } from '../../ui/modal/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AdminService, CreateUtilisateurRequest, ExtraChamps, Role, UtilisateurResponse } from '../../../../services/admin-service';
import { Dropzone } from '../../ui/dropzone/dropzone';
import { LucideAngularModule, User, Mail, Phone, Briefcase, Calendar, FileText,GraduationCapIcon } from 'lucide-angular';
import { Inject,PLATFORM_ID } from '@angular/core';
import { platformBrowser } from '@angular/platform-browser';
import { CompetenceInfoDTO, CompetenceService } from '../../../../services/competence-service';
@Component({
  selector: 'app-formulaire-utilisateur',
  imports: [Modal,FormsModule,CommonModule,ReactiveFormsModule,Dropzone,LucideAngularModule],
  standalone: true,
  templateUrl: './formulaire-utilisateur.html',
  styleUrl: './formulaire-utilisateur.css',
})
export class FormulaireUtilisateur {
  @Input() selectedUtilisateur: UtilisateurResponse | null = null;
  @Output() closeFormulaire = new EventEmitter<void>();
  @Input() isOpen: boolean = false;
  @Input() roleFixe: string | null = null;
  private plateformId=inject(PLATFORM_ID);
  competences: CompetenceInfoDTO[] = [];
  selectedCompetenceNoms: string[] = [];
  ngOnInit(): void {
    this.competenceService.getAllCompetence().subscribe({
      next:(data)=>{
      console.log('Compétences reçues:', data);
      this.competences=data;
      },
      error:(err)=> console.error('erreur competence',err)
    });
  }

    utilisateurData: CreateUtilisateurRequest = {  
      nom: "",
      prenom: "",
      email: "",
      telephone: "",
      role:'MANAGER',
      actif: true,
      specialite: "",
      anneesExperience: 0,
      cvPath: "",
      
    };
  
    constructor(private adminService: AdminService,private competenceService:CompetenceService) {}
     
  ngOnChanges(changes: SimpleChanges) {
    if (!isPlatformBrowser(this.plateformId))return;
    if (this.roleFixe) {
      this.utilisateurData.role = this.roleFixe as Role;
    }
    if (changes['selectedUtilisateur']) {
    if (this.selectedUtilisateur) {
      this.utilisateurData = {
        nom: this.selectedUtilisateur.nom,
        prenom: this.selectedUtilisateur.prenom,
        email: this.selectedUtilisateur.email,
        telephone: this.selectedUtilisateur.telephone,
        role: this.selectedUtilisateur.role,
        actif: this.selectedUtilisateur.actif,
        specialite: this.selectedUtilisateur.specialite,
        anneesExperience: this.selectedUtilisateur.anneesExperience,
        cvPath: this.selectedUtilisateur.cvPath,
      };
      this.selectedCompetenceNoms=this.selectedUtilisateur.competenceNoms ??[];
    } else {
      this.resetForm();
      this.selectedCompetenceNoms=[];
    }
  }
}
onCompetenceChange(event: Event): void {
  const select = event.target as HTMLSelectElement;
  this.selectedCompetenceNoms = Array.from(select.selectedOptions)
    .map(option => option.value);
}
      closeModal() {
        this.closeFormulaire.emit();
        this.resetForm();
        
      }
    
      resetForm() {
        this.utilisateurData = {
          nom: "",
          prenom: "",
          email: "",
          telephone: "",
          role: (this.roleFixe as Role) ?? 'MANAGER',
          actif: true,
          specialite: "",
          anneesExperience: 0,
          cvPath: "", 
        };
      }
      cvFile: File | null = null;

      onCvSelected(file: File) {
        this.cvFile = file;
      }
     

  handleAddOrUpdateEvent() {
     if (this.roleFixe) {
    this.utilisateurData.role = this.roleFixe as Role; // ✅ sécurité finale
  }

  console.log('🎯 Rôle envoyé:', this.utilisateurData.role);
  const token = localStorage.getItem('token');
  console.log('🔑 Token:', token ? token.substring(0, 30) + '...' : 'NULL');

  const utilisateurRequest: CreateUtilisateurRequest = {
    nom: this.utilisateurData.nom,
    prenom: this.utilisateurData.prenom,
    email: this.utilisateurData.email,
    telephone: this.utilisateurData.telephone,
    role: this.utilisateurData.role,
    actif: this.utilisateurData.actif,
    specialite: this.utilisateurData.specialite,
    anneesExperience: this.utilisateurData.anneesExperience,
    cvPath: "",
    competenceNoms: this.selectedCompetenceNoms,
  };

  const uploadCvSiPresent = (userId: number) => {
    if (this.cvFile != null) {
      this.adminService.uploadCv(userId, this.cvFile!).subscribe();
    }
  };

  if (this.selectedUtilisateur != null) {
    const id = this.selectedUtilisateur.id;
    this.adminService.updateUtilisateur(id, utilisateurRequest).subscribe({
      next: (res: UtilisateurResponse) => {
        uploadCvSiPresent(res.id);
        this.closeModal();
      },
      error: (err: any) => console.error('Erreur update:', err),
    });
  } else {
    this.adminService.creerUtilisateur(utilisateurRequest).subscribe({
      next: (res: UtilisateurResponse) => {
        uploadCvSiPresent(res.id);
        this.closeModal();
      },
      error: (err: any) => {
        console.error('Erreur ajout:', err);
        alert('Erreur: ' + (err.error?.message || 'Inconnue'));
      },
    });
  }
}   
 
}
