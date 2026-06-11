import { HttpParams,HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
export interface FormationAdminDTO{
  id: number;
  code: string;
  titre: string;
  description?: string;
  dureeJours?: number|null;
  dureeHeures:number|null;
  prixPublic:number|null;
  publicCible?:string|null;
  prerequis?:string|null;
  programme?:string|null;
  version:string ;
  actif:boolean;
  codesSessions?: any[];   
  competenceDetail?: any[];
  competence:string;
}
export interface FormationRequest{
  titre: string;
  description?: string;
  dureeJours?: number | null;
  dureeHeures: number|null;
  prixPublic: number|null;
  publicCible?: string | null;
  prerequis?: string | null;
  programme?: string | null;
  version: string;
  actif: boolean;
  competenceNoms?: string[];
}
@Injectable({
  providedIn: 'root',
})
export class FormationService {
  private apiUrl = 'http://localhost:8081/api/formations';
  constructor(private http: HttpClient){}

  //getAllFormation(actif?: boolean):Observable<FormationAdminDTO[]>{
  //  let params = new HttpParams();
  //  if(actif!==undefined){
  //    params=params.set('actif',actif.toString());
  //  }
  //  return this.http.get<FormationAdminDTO[]>(this.apiUrl,{params});
  //}

  getAllFormations(): Observable<FormationAdminDTO[]> {
  return this.http.get<FormationAdminDTO[]>(`${this.apiUrl}/all`);
}

  getFormationById(id: number): Observable<FormationAdminDTO> {
    return this.http.get<FormationAdminDTO>(`${this.apiUrl}/${id}`);
  }

 
  getFormationByCode(code: string): Observable<FormationAdminDTO> {
    return this.http.get<FormationAdminDTO>(`${this.apiUrl}/code/${code}`);
  }


  searchFormations(keyword: string): Observable<FormationAdminDTO[]> {
    const params = new HttpParams().set('keyword', keyword);
    return this.http.get<FormationAdminDTO[]>(`${this.apiUrl}/search`, { params });
  }

 
  createFormation(formation: FormationRequest): Observable<FormationAdminDTO> {
    return this.http.post<FormationAdminDTO>(this.apiUrl, formation);
  }

  updateFormation(id: number, formation: FormationRequest): Observable<FormationAdminDTO> {
    return this.http.put<FormationAdminDTO>(`${this.apiUrl}/${id}`, formation);
  }


  deleteFormation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  
  toggleActivation(id: number): Observable<FormationAdminDTO> {
    return this.http.patch<FormationAdminDTO>(`${this.apiUrl}/${id}/toggle-activation`, {});
  }
}
