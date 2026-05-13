import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParams,HttpClient } from '@angular/common/http';
import { FormationAdminDTO } from './formation-service';
export interface CompetenceInfoDTO{
  id: number;
  code: string;
  nom: string;
  description?: string;
  categorie:string;
  formations?: FormationAdminDTO[];
}
export interface CompetenceRequest{

  code?: string;
  nom: string;
  description?: string;
  categorie:string;
  formations?: FormationAdminDTO[];
}
@Injectable({
  providedIn: 'root',
})
export class CompetenceService {
  private apiUrl = '/api/competences';
  constructor(private http: HttpClient){}
  getAllCompetence(actif?: boolean):Observable<CompetenceInfoDTO[]>{
    let params = new HttpParams();
    
    return this.http.get<CompetenceInfoDTO[]>(this.apiUrl,{params});
  }

  getCompetenceById(id: number): Observable<CompetenceInfoDTO> {
    return this.http.get<CompetenceInfoDTO>(`${this.apiUrl}/${id}`);
  }

 
  getCompetenceByCode(code: string): Observable<CompetenceInfoDTO> {
    return this.http.get<CompetenceInfoDTO>(`${this.apiUrl}/code/${code}`);
  }

  createCompetence(formation: CompetenceRequest): Observable<CompetenceInfoDTO> {
      return this.http.post<CompetenceInfoDTO>(this.apiUrl, formation);
    }
  
    updateCompetence(id: number, formation: CompetenceRequest): Observable<CompetenceInfoDTO> {
      return this.http.put<CompetenceInfoDTO>(`${this.apiUrl}/${id}`, formation);
    }
  
  
    deleteCompetence(id: number): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

  
}
