import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { InscriptionResponseDTO } from '../../../../services/inscription-service';
import { CertificatService } from '../../../services/certification.service';
import { AuthService } from '../../../services/auth.service';
import { ApprenantService } from '../../../../services/apprenant-service';

@Component({
  selector: 'app-apprenant-certificats',
  imports: [CommonModule],
  templateUrl: './apprenant-certificats.html',
  styleUrl: './apprenant-certificats.css',
})
export class ApprenantCertificats implements OnInit {

  inscriptions = signal<InscriptionResponseDTO[]>([]);
  loading = signal(true);

  constructor(
    private apprenantService: ApprenantService,
    private certificatService: CertificatService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const user = this.authService.getUser();
    if (!user?.id) return;

    this.apprenantService.getInscriptions().subscribe({
      next: (res) => {
        this.inscriptions.set(res.filter(i => i.statutSession === 'TERMINEE'));
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  telecharger(i: InscriptionResponseDTO): void {
    const user = this.authService.getUser();
    this.certificatService.imprimerToutesLesAttestations(
      [{
        id: String(user?.id),
        nom: i.apprenantNom,
        prenom: i.apprenantPrenom,
        email: i.apprenantEmail,
        actif: true,
        role: 'APPRENANT',
        dateCreation: '',
        posteActuel: '',
        niveauEtude: '',
        inscriptions: [],
        telephone: undefined
      }],
      {
        formation: i.sessionNom,
        dateDebut: i.dateInscription,
        dateFin: i.dateInscription,
      }
    );
  }
}