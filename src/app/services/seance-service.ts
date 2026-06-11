import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
export interface SeanceResponseDTO{
  id:number;
  date:string;
  heureDebut:string;
  heureFin:string;
  sessionId:number;
  sessionCode:string;
  sessionNom:string;
  formateurId:number;
  formateurNom:String;
  formateurPrenom:String;
  salleId:number;
  salleNumero:string;
  salleBatiment:string;
  salleCapacite:number;
  titre?: string;
}
export interface SeanceRequestDTO{
  date:string;
  heureDebut:string;
  heureFin:string;
  sessionId:number;
  salleId:number;
}
export interface ProgressionDTO {
  sessionId:   number;
  progression: number;  
  unite:       string;  
}
export interface SalleDisponibleDTO {
  id: number;
  numero: string;
  batiment: string;
  capacite: number;
}
export interface StatutPlanificationDTO{
  sessionId:number;
  sessionCode:string;
  sessionNom:string;
  seancesPlanifiees:number;
  seancesRequises:number;     
  manquantes:number;
  complet:boolean;
}
@Injectable({
  providedIn: 'root',
})
export class SeanceService {
  private apiUrl = '/api/seances';
 
  constructor(private http: HttpClient) {}
 
  createSeance(seance: SeanceRequestDTO): Observable<SeanceResponseDTO> {
    return this.http.post<SeanceResponseDTO>(this.apiUrl, seance);
  }
 
  getSeanceById(id: number): Observable<SeanceResponseDTO> {
    return this.http.get<SeanceResponseDTO>(`${this.apiUrl}/${id}`);
  }
 
  getSeancesBySession(sessionId: number): Observable<SeanceResponseDTO[]> {
    const params = new HttpParams().set('sessionId', sessionId);
    return this.http.get<SeanceResponseDTO[]>(this.apiUrl, { params });
  }
 
  updateSeance(id: number, seance: SeanceRequestDTO): Observable<SeanceResponseDTO> {
    return this.http.put<SeanceResponseDTO>(`${this.apiUrl}/${id}`, seance);
  }

  deleteSeance(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
 

  getProgression(sessionId: number): Observable<ProgressionDTO> {
    const params = new HttpParams().set('sessionId', sessionId);
    return this.http.get<ProgressionDTO>(`${this.apiUrl}/progression`, { params });
  }
  
  getDatesBySession(sessionId: number): Observable<string[]> {
  const params = new HttpParams().set('sessionId', sessionId);
  return this.http.get<string[]>(`${this.apiUrl}/dates`, { params });
}

getSallesDisponibles(
  date: string,
  debut: string,
  fin: string
): Observable<SalleDisponibleDTO[]> {
  const params = new HttpParams()
    .set('date', date)
    .set('debut', debut)
    .set('fin', fin);
  return this.http.get<SalleDisponibleDTO[]>(`${this.apiUrl}/salles-disponibles`, { params });
}
getStatutPlanification(sessionId: number): Observable<StatutPlanificationDTO> {
  const params = new HttpParams().set('sessionId', sessionId);

  return this.http.get<StatutPlanificationDTO>(
    `${this.apiUrl}/statut-planification`,
    { params }
  );
}
}
