import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
export interface AppelCandidatureDTO {
  id: number;
  sessionId: number;
  sessionNom: string;
  sessionDateDebut: string;
  sessionDateFin: string;
  sessionLieu: string;
  sessionMode: string;
  formateurId: number;
  formateurNom: string;
  formateurPrenom: string;
  statut: 'ENVOYEE' | 'ACCEPTEE' | 'REFUSEE' | 'EXPIREE';
  dateEnvoi: string;
  dateReponse: string;
  messageFormateur: string;
}
@Injectable({
  providedIn: 'root',
})
export class AppelCandidatureService {
  private planifUrl = '/api/planificateur/candidatures';
  private formateurUrl = '/api/formateur/candidatures';

  constructor(private http: HttpClient) {}

  envoyerAppel(sessionId: number): Observable<AppelCandidatureDTO[]> {
    return this.http.post<AppelCandidatureDTO[]>(
      `${this.planifUrl}/session/${sessionId}/envoyer`, {}
    );
  }

  getCandidaturesParSession(sessionId: number): Observable<AppelCandidatureDTO[]> {
    return this.http.get<AppelCandidatureDTO[]>(
      `${this.planifUrl}/session/${sessionId}`
    );
  }

  choisirFormateur(candidatureId: number): Observable<AppelCandidatureDTO> {
    return this.http.post<AppelCandidatureDTO>(
      `${this.planifUrl}/${candidatureId}/choisir`, {}
    );
  }

  // Formateur
  getMesDemandes(formateurId: number): Observable<AppelCandidatureDTO[]> {
    return this.http.get<AppelCandidatureDTO[]>(
      `${this.formateurUrl}/mes-demandes`, { params: { formateurId } }
    );
  }

  accepter(id: number, message: string): Observable<AppelCandidatureDTO> {
    return this.http.patch<AppelCandidatureDTO>(
      `${this.formateurUrl}/${id}/accepter`, { messageFormateur: message }
    );
  }

  refuser(id: number, message: string): Observable<AppelCandidatureDTO> {
    return this.http.patch<AppelCandidatureDTO>(
      `${this.formateurUrl}/${id}/refuser`, { messageFormateur: message }
    );
  }
}
