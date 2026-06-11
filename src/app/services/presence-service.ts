import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
export interface SeanceColonneDTO {
  id: number;
  numero: number;
  date: string;      
  heureDebut: string;  
  heureFin: string;   
  label: string;      
}
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
  seanceId: number;
  seanceDate: string;
  seanceHeureDebut: string;
  seanceHeureFin: string;
  salleNumero: string;
}

export interface LignePresenceResponseDTO {
  inscriptionId: number;
  apprenantId: number;
  nomApprenant: string;
  prenomApprenant: string;
  presencesParSeance: { [seanceId: number]: PresenceResponseDTO }; 
}

export interface TableauPresenceResponseDTO {
  sessionId: number;
  nomFormation: string;
  nombreSeances: number;      
  seances: SeanceColonneDTO[];   
  lignes: LignePresenceResponseDTO[];
}

export interface PresenceRequestDTO {
  inscriptionId: number;
  seanceId: number;  
  statut: StatutPresence;
  commentaireFormateur?: string;
  justificatifAbsence?: string;
}
export interface InitPresenceResultDTO {
  message: string;
  apprenants: number;
  seances: number;
  lignesCrees: number;
}

export type RoleUser ='FORMATEUR'|'APPRENANT'|'ADMIN'|'PLANIFICATEUR';

export type StatutPresence ='NON_SAISI'|'PRESENT'|'ABSENT'|'RETARD'|'EXCUSE';
@Injectable({
  providedIn: 'root',
})
export class PresenceService {
  private planificateurApi = '/api/planificateur/presences';
  private formateurApi     = 'http://localhost:8081/api/formateur/presences';
  private presencesApi     = '/api/presences';

  constructor(private http: HttpClient) {}

  initialiserFiche(sessionId: number): Observable<InitPresenceResultDTO> {
    return this.http.post<InitPresenceResultDTO>(
      `${this.planificateurApi}/session/${sessionId}/initialiser`, {}
    );
  }

  getTableau(sessionId: number): Observable<TableauPresenceResponseDTO> {
    return this.http.get<TableauPresenceResponseDTO>(
      `${this.planificateurApi}/session/${sessionId}/tableau`
    );
  }

  // Formateur
  initialiserFicheFormateur(sessionId: number): Observable<InitPresenceResultDTO> {
    return this.http.post<InitPresenceResultDTO>(
      `${this.formateurApi}/session/${sessionId}/initialiser`, {}
    );
  }

  getTableauFormateur(sessionId: number): Observable<TableauPresenceResponseDTO> {
    return this.http.get<TableauPresenceResponseDTO>(
      `${this.formateurApi}/session/${sessionId}/tableau`
    );
  }


  
  marquerPresence(dto: PresenceRequestDTO): Observable<PresenceResponseDTO> {
  return this.http.post<PresenceResponseDTO>(
    `${this.formateurApi}/marquer`, dto  // ✅ /api/formateur/presences/marquer
  );
}
  
}
