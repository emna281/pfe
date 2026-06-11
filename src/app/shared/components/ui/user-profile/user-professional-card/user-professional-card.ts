import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApprenantService, UpdateProfilRequest } from '../../../../../services/apprenant-service';
import { LucideAngularModule ,Pencil} from 'lucide-angular';

@Component({
  selector: 'app-user-professional-card',
  imports: [CommonModule,FormsModule,LucideAngularModule],
  templateUrl: './user-professional-card.html',
  styleUrl: './user-professional-card.css',
})
export class UserProfessionalCard {
  @Input() user!: any;
  @Input() isAdminView = false;

  editMode = false;
  saving = false;
  success = false;
  form: UpdateProfilRequest = {};

  get isApprenant(): boolean {
    return this.user?.role === 'APPRENANT';
  }

  get isFormateur(): boolean {
    return this.user?.role === 'FORMATEUR';
  }

  constructor(private apprenantService: ApprenantService) {}

  ngOnInit(): void {}

  startEdit(): void {
    this.form = {
      posteActuel:       this.user?.posteActuel,
      niveauEtude:       this.user?.niveauEtude,
      specialite:        this.user?.specialite,
      anneesExperience:  this.user?.anneesExperience,
      competences:       [...(this.user?.competences ?? [])],
    };
    this.editMode = true;
    this.success = false;
  }

  cancelEdit(): void {
    this.editMode = false;
  }

  saveEdit(): void {
    this.saving = true;
    this.apprenantService.updateMonProfil(this.form).subscribe({
      next: (updated) => {
        Object.assign(this.user, updated);
        this.saving = false;
        this.editMode = false;
        this.success = true;
        setTimeout(() => this.success = false, 3000);
      },
      error: () => { this.saving = false; }
    });
  }

}
