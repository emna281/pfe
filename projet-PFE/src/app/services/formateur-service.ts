import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SessionDTO } from './session-service';
import { HttpClient } from '@angular/common/http';

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
}
@Injectable({
  providedIn: 'root',
})
export class FormateurService {
  private baseUrl = '/api/formateur';

  constructor(private http: HttpClient) {}
  
  getMonProfil(): Observable<FormateurProfil> {
    return this.http.get<FormateurProfil>(`${this.baseUrl}/me`);
  }

  getMesSessions(): Observable<SessionDTO[]> {
    return this.http.get<SessionDTO[]>(`${this.baseUrl}/mes-sessions`);
  }
  
}
