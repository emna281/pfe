import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, inject, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { ParametreService } from '../../../services/parametre-service';
interface ParametreItem {
  cle: string;
  label: string;
  description: string;
  valeur: number;
}
@Component({
  selector: 'app-parametres-systeme',
  imports: [CommonModule,FormsModule,LucideAngularModule],
  templateUrl: './parametres-systeme.html',
  styleUrl: './parametres-systeme.css',
})
export class ParametresSysteme {
private platformId = inject(PLATFORM_ID);

  parametres: ParametreItem[] = [
    {
      cle: 'MAX_APPRENANTS_ACTIFS',
      label: 'Nombre maximal d\'apprenants actifs',
      description: 'Limite globale du nombre d\'apprenants actifs simultanément',
      valeur: 100,
    },
    {
      cle: 'MAX_SESSIONS_EN_COURS',
      label: 'Nombre maximal de sessions en cours',
      description: 'Limite globale du nombre de sessions ayant le statut EN_COURS',
      valeur: 20,
    },
  ];
  loading = false;
  saving = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private parametreService: ParametreService) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.charger();
  }
  charger(): void {
    this.loading = true;
    this.parametreService.getAll().subscribe({
      next: (data) => {
        this.parametres.forEach((p) => {
          if (data[p.cle] !== undefined) {
            p.valeur = Number(data[p.cle]);
          }
        });
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }
  enregistrer(): void {
    this.saving = true;
    this.errorMessage = null;
    this.successMessage = null;

    const payload: Record<string, string> = {};
    this.parametres.forEach((p) => {
      payload[p.cle] = String(p.valeur);
    });

    this.parametreService.update(payload).subscribe({
      next: () => {
        this.saving = false;
        this.successMessage = 'Paramètres enregistrés avec succès';
        setTimeout(() => (this.successMessage = null), 3000);
      },
      error: (err) => {
        this.saving = false;
        this.errorMessage = err.error?.message || 'Erreur lors de l\'enregistrement';
        setTimeout(() => (this.errorMessage = null), 3000);
      },
    });
  }
}


