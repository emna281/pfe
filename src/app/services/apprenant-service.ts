import { Injectable, inject, PLATFORM_ID  } from '@angular/core';
import { BaseUser } from '../shared/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { InscriptionResponseDTO } from './inscription-service';
import { PaiementDTO } from './paiement-service';
import { ApprenantResponse } from './code-remise';
import { isPlatformBrowser } from '@angular/common';
import { EMPTY } from 'rxjs';
export interface ApprenantProfil extends BaseUser {
  posteActuel: string;
  niveauEtude: string;
  numeroEnregistrement: number;
}
export interface SessionApprenant {
  id: number;
  nom: string;
  code: string;
  dateDebut: string;
  dateFin: string;
  heureDebut: string;
  heureFin: string;
  lieu: string;
  lienVisio: string;
  mode: string;
  statut: string;
  formateurNom: string | null;
  formationNom: string;
  placesRestantes: number;
  prix: number;
  nombreSeances: number;
  nombreSeancesRealisees: number;
}
export interface FactureApprenant {
  id: number;
  numeroFacture: string;
  dateEmission: string;
  dateEcheance: string;
  statut: string;
  montantHT: number;
  montantTVA: number;
  montantTTC: number;
  montantPaye: number;
  montantRestant: number;
  sessionNom: string;
  formationTitre: string;
  inscriptionId: number;
  paiements: PaiementDTO[];
}
export interface UpdateProfilRequest {
  prenom?: string;
  nom?: string;
  telephone?: string;
  email?:string;
  posteActuel?: string;
  niveauEtude?: string;
  specialite?: string;
  anneesExperience?: number;
  competences?: string[];
}
@Injectable({
  providedIn: 'root',
})
export class ApprenantService {
  private baseUrl = '/api/apprenant';
  private platformId = inject(PLATFORM_ID);
  constructor(private http: HttpClient) {}

  getMonProfil(): Observable<ApprenantProfil> {
  return this.http.get<ApprenantProfil>(`${this.baseUrl}/me`).pipe(
    tap(data => console.log('Profil reçu:', data)) 
  );
}
  getInscriptions(): Observable<InscriptionResponseDTO[]> {
    return this.http.get<InscriptionResponseDTO[]>('/api/apprenant/mes-inscriptions'); // ✅
  }
  getMesSessions(): Observable<SessionApprenant[]> {
    return this.http.get<SessionApprenant[]>('/api/apprenant/mes-sessions');
  }
  getMesFactures(): Observable<FactureApprenant[]> {
  return this.http.get<FactureApprenant[]>('/api/apprenant/mes-factures');
}

  noterInscription(inscriptionId: number, noteFormateur: number, noteFormation: number): Observable<void> {
  return this.http.put<void>(
    `/api/apprenant/inscriptions/${inscriptionId}/noter`,
    { noteFormateur, noteFormation }
  );
}
getApprenantsPourFinancier(): Observable<ApprenantResponse[]> {
    if (!isPlatformBrowser(this.platformId)) {
      return EMPTY;
    }
    return this.http.get<ApprenantResponse[]>('/api/financier/apprenants/avec-codes');
  }
  updateMonProfil(data: UpdateProfilRequest): Observable<any> {
  return this.http.put(`${this.baseUrl}/me`, data);
}
}
