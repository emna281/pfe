import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PresenceResponseDTO {
  id: number | null;
  jourNumero: number;
  jourLabel: string;
  statut: StatutPresence;
  inscriptionId: number;
  nomApprenant: string;
  prenomApprenant: string;
  valideParFormateur: boolean;
  commentaireFormateur: string | null;
  justificatifAbsence: string | null;
}

export interface LignePresenceResponseDTO {
  inscriptionId: number;
  apprenantId: number;
  nomApprenant: string;
  prenomApprenant: string;
  presencesParJour: { [jourNumero: number]: PresenceResponseDTO };
}

export interface TableauPresenceResponseDTO {
  sessionId: number;
  nomFormation: string;
  dureeJours: number;
  joursLabels: string[];
  lignes: LignePresenceResponseDTO[];
}

export interface PresenceRequestDTO {
  inscriptionId: number;
  jourNumero: number;
  statut: StatutPresence;
  commentaireFormateur?: string;
  justificatifAbsence?: string;
}


export type RoleUser ='FORMATEUR'|'APPRENANT'|'ADMIN'|'PLANIFICATEUR';

export type StatutPresence ='NON_SAISI'|'PRESENT'|'ABSENT'|'RETARD'|'EXCUSE';
@Injectable({
  providedIn: 'root',
})
export class PresenceService {
  private api = '/api/presences';
  private planificateurApi='/api/planificateur/presences';
  private formateurApi='/api/formateur/presences';

  constructor(private http: HttpClient) {}

  initialiserFiche(sessionId: number): Observable<any> {
    return this.http.post(`${this.planificateurApi}/session/${sessionId}/initialiser`, {});
  }

  initialiserFicheFormateur(sessionId: number): Observable<any> {
    return this.http.post(
      `${this.formateurApi}/session/${sessionId}/initialiser`, {}
    );
  }

  getTableau(sessionId: number): Observable<TableauPresenceResponseDTO> {
    return this.http.get<TableauPresenceResponseDTO>(
      `${this.planificateurApi}/session/${sessionId}/tableau`
    );
  }

  getTableauFormateur(sessionId: number): Observable<TableauPresenceResponseDTO> {
    return this.http.get<TableauPresenceResponseDTO>(
      `${this.formateurApi}/session/${sessionId}/tableau`
    );
  }

  marquerPresence(dto: PresenceRequestDTO): Observable<PresenceResponseDTO> {
    return this.http.put<PresenceResponseDTO>(`${this.api}/marquer`, dto);
  }
  
}
