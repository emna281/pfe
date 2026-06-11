import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
export interface SalleRequestDTO{
  numero:string;
  batiment:string;
  capacite:number;
  description:string;
  active:boolean
}
export interface SalleResponsetDTO{
  id:number;
  numero:string;
  batiment:string;
  capacite:number;
  description:string;
  active:boolean
}
@Injectable({
  providedIn: 'root',
})
export class SalleService {
  private apiUrl = 'http://localhost:8081/api/planificateur/salles';
  constructor(private http: HttpClient){}


  createSalle(salle: SalleRequestDTO): Observable<SalleResponsetDTO> {
      return this.http.post<SalleResponsetDTO>(this.apiUrl, salle);
    }
  getAllSalles(): Observable<SalleResponsetDTO[]> {
    return this.http.get<SalleResponsetDTO[]>(`${this.apiUrl}`);
  }
  
  getSalleById(id: number): Observable<SalleResponsetDTO> {
    return this.http.get<SalleResponsetDTO>(`${this.apiUrl}/${id}`);
  }
  getSallesDisponibles(date: string,heureDebut: string,heureFin: string): Observable<SalleResponsetDTO[]> {
    const params = new HttpParams()
      .set('date', date)
      .set('heureDebut', heureDebut)
      .set('heureFin', heureFin);
    return this.http.get<SalleResponsetDTO[]>(`${this.apiUrl}/disponibles`, { params });
  }
  updateSalle(id: number, salle: SalleRequestDTO): Observable<SalleResponsetDTO> {
      return this.http.put<SalleResponsetDTO>(`${this.apiUrl}/${id}`, salle);
    }
  
  
    deleteSession(id: number): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
