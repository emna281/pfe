import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SessionDTO } from './session-service';
import { HttpClient } from '@angular/common/http';
import { SeanceResponseDTO } from './seance-service';
import { UpdateProfilRequest } from './apprenant-service';

export interface FormateurProfil {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  specialite: string;
  anneesExperience: number;
  noteMoyenne: number;
  heuresEnseigneesTotal: number;
  disponibilite: boolean;
  competenceNoms: string[];
  role: string;
  nombreSeances: number;
  nombreSeancesRealisees: number;
  nombreApprenants: number;
  seancesAVenir: number;
}
@Injectable({
  providedIn: 'root',
})
export class FormateurService {
  private baseUrl = 'http://localhost:8081/api/formateur';

  constructor(private http: HttpClient) {}
  
  getMonProfil(): Observable<FormateurProfil> {
    return this.http.get<FormateurProfil>(`${this.baseUrl}/me`);
  }

  getMesSessions(): Observable<SessionDTO[]> {
    return this.http.get<SessionDTO[]>(`${this.baseUrl}/mes-sessions`);
  }
  getSeancesSession(sessionId: number): Observable<SeanceResponseDTO[]> {
    return this.http.get<SeanceResponseDTO[]>(`/api/seances?sessionId=${sessionId}`);
  }
  getProchaineSeance(): Observable<SeanceResponseDTO> {
  return this.http.get<SeanceResponseDTO>(`${this.baseUrl}/prochaine-seance`);
}
updateMonProfil(data: UpdateProfilRequest): Observable<any> {
  return this.http.put(`${this.baseUrl}/me`, data);
}
}
