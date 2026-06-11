import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParams,HttpClient } from '@angular/common/http';


export interface SessionDTO{
  id: number;
  code: string;
  nom: string;
  dateDebut: string;   
  dateFin: string;
  heureDebut: string; 
  heureFin: string;
  placesMax: number;
  placesRestantes: number;
  statut: string;
  mode: string;
  lieu: string;
  lienVisio: string;
  materielRequis: string;
  formationCode: string;
  formationNom: string;
  formateurId: number;
  formateurNom: string;
  salleCode: number;
  salleNom: string;
  inscriptionIds: number[];
  nombrePresences: number;
  factureIds: number[];  
  chargeIds: number[]; 
  nombreSeances: number;
nombreSeancesRealisees: number;
}
export interface SessionRequest{
  
  nom: string;
  dateDebut: string;
  dateFin: string;
  heureDebut: string;
  heureFin: string;
  placesMax: number|null;
  statut: string;
  mode: string;
  lieu: string;
  lienVisio: string;
  materielRequis: string;
  formationCode: string;
  formateurId?: number | null;

}



@Injectable({
  providedIn: 'root',
})
export class SessionService {
  
  private publicUrl = 'http://localhost:8081/api/public/sessions';
  private planificateurUrl = 'http://localhost:8081/api/planificateur/sessions';
  constructor(private http: HttpClient){}
  getAllSession():Observable<SessionDTO[]>{
    let params = new HttpParams();   
    return this.http.get<SessionDTO[]>(this.publicUrl,{params});
  }
  
  getSessionById(id: number): Observable<SessionDTO> {
    return this.http.get<SessionDTO>(`${this.publicUrl}/${id}`);
  }
  
   
  getSessionByCode(code: string): Observable<SessionDTO> {
    return this.http.get<SessionDTO>(`${this.publicUrl}/code/${code}`);
  }
  
  createSession(session: SessionRequest): Observable<SessionDTO> {
    return this.http.post<SessionDTO>(this.planificateurUrl, session);
  }
    
  updateSession(id: number, session: SessionRequest): Observable<SessionDTO> {
    return this.http.put<SessionDTO>(`${this.planificateurUrl}/${id}`, session);
  }
    
    
  deleteSession(id: number): Observable<void> {
    return this.http.delete<void>(`${this.planificateurUrl}/${id}`);
  }

  ouvrirSession(id: number): Observable<SessionDTO> {
    return this.http.patch<SessionDTO>(`${this.planificateurUrl}/${id}/ouvrir`, {});
  }

  
  confirmerSession(id: number): Observable<SessionDTO> {
    return this.http.patch<SessionDTO>(`${this.planificateurUrl}/${id}/confirmer`, {});
  }
  getFormateursByCompetence(competence: string): Observable<any[]> {
  return this.http.get<any[]>(
    `/api/planificateur/formateurs/par-competence?competence=${competence}`
  );
}
  
}
