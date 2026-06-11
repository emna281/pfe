import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
export interface UtilisateurResponse {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  role: Role;
  actif: boolean;
  specialite: string;
  anneesExperience: number;
  competenceNoms?: string[];
  competence:string;
  
  cvNomFichier?: string;  
}

export interface CreateUtilisateurRequest {
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  role: Role;
  actif: boolean;
  specialite: string;
  anneesExperience: number;

  competenceNoms?: string[];
}
export interface PagedResponse<T> {
  data: T[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
export interface ExtraChamps {
  label: string;
  controlName: string;  
  type: 'text' | 'email' | 'date' | 'number' | 'select';
  placeholder?: string;
  options?: { label: string; value: string }[];  
  required?: boolean;
}

export type Role = 'PLANIFICATEUR'|'FINANCIER'| 'MANAGER'| 'FORMATEUR';
@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private apiUrl = '/api/admin';
  constructor(private http:HttpClient){}

  creerUtilisateur(
    utilisateur: CreateUtilisateurRequest
  ): Observable<UtilisateurResponse> {
    return this.http.post<UtilisateurResponse>(
      `${this.apiUrl}/utilisateurs`,
      utilisateur
    );
  }

  getAllUtilisateurs(): Observable<UtilisateurResponse[]> {
    return this.http.get<UtilisateurResponse[]>(
      `${this.apiUrl}/utilisateurs`
    );
  }

 
  toggleActif(id: number): Observable<void> {
    return this.http.put<void>(
      `${this.apiUrl}/utilisateurs/${id}/actif`,
      {}
    );
  }

  updateUtilisateur(id: number, data: CreateUtilisateurRequest) {
  return this.http.put<UtilisateurResponse>(`${this.apiUrl}/utilisateurs/${id}`, data);
}

 
  supprimerUtilisateur(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/utilisateurs/${id}`
    );
  }
  uploadCv(id: number, file: File) {
    console.log('📤 Envoi CV:', file.name, file.size + ' bytes', 'pour user id:', id);
  const formData = new FormData();
  formData.append('file', file, file.name);
  return this.http.post(`${this.apiUrl}/utilisateurs/${id}/cv`, formData,{ responseType: 'text' } );
}
  
}
