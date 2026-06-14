import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalService } from '../../../../services/modal.service';
import { Apprenant, BaseUser } from '../../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Dropzone } from '../../dropzone/dropzone';
import { LucideAngularModule, Pencil, Briefcase } from 'lucide-angular';
import { ApprenantService, UpdateProfilRequest } from '../../../../../services/apprenant-service';

@Component({
  selector: 'app-user-adress-card',
  imports: [FormsModule, CommonModule, LucideAngularModule],
  templateUrl: './user-adress-card.html',
  styleUrl: './user-adress-card.css',
})
export class UserAdressCard {
  @Input() isAdminView: boolean = false;
  @Input() user!: BaseUser;

  constructor(public modal: ModalService, private apprenantService: ApprenantService) {}

  editMode = false;
  saving = false;
  success = false;
  form: UpdateProfilRequest = {};

  startEdit(): void {
    this.form = {
      specialite: this.specialite ?? undefined,
      anneesExperience: this.anneesExperience ?? undefined,
      posteActuel: this.posteActuel ?? undefined,
      niveauEtude: this.niveauEtude ?? undefined,
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

  get specialite(): string | null {
    return (this.user as any).specialite ?? null;
  }

  get anneesExperience(): number | null {
    return (this.user as any).anneesExperience ?? null;
  }

  get cvPath(): string | null {
    const u = this.user as any;
    return u.cvPath ?? u.cvNomFichier ?? null;
  }

  get posteActuel(): string | null {
    return this.user.role === 'APPRENANT'
      ? (this.user as Apprenant).posteActuel ?? null
      : null;
  }

  get niveauEtude(): string | null {
    return this.user.role === 'APPRENANT'
      ? (this.user as Apprenant).niveauEtude ?? null
      : null;
  }

  get hasProFields(): boolean {
    return ['FORMATEUR', 'PLANIFICATEUR', 'MANAGER', 'FINANCIER'].includes(this.user?.role);
  }

  get isApprenant(): boolean {
    return this.user?.role === 'APPRENANT';
  }
}