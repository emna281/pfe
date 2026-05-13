import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseUser, Financier, Formateur, Manager, Planificateur,Apprenant, UserRole } from '../shared/services/auth.service';
import { map, Observable } from 'rxjs';

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}
 
export interface UserQueryParams {
  role?: string;
  search?: string;
  statut?: string;
  page?: number;
  limit?: number;
}
@Injectable({
  providedIn: 'root',
})
export class UtilisateurService {

  private baseUrl = '/api/admin/utilisateurs';
  private filtreUrl = '/api/admin/utilisateurs/filtre';
 
  constructor(private http: HttpClient) {}

  getByRole<T extends BaseUser>(params: UserQueryParams): Observable<PaginatedResponse<T>> {
    let httpParams = new HttpParams();
 
    if (params.role)    httpParams = httpParams.set('role',    params.role.toUpperCase());
    if (params.search)  httpParams = httpParams.set('search',  params.search);
    if (params.statut)  httpParams = httpParams.set('statut',  params.statut);
    if (params.page !== undefined)    httpParams = httpParams.set('page',    params.page.toString());
    if (params.limit !== undefined)   httpParams = httpParams.set('limit',   params.limit?.toString() ?? '20');
 
    console.log('📡 Requête envoyée vers :', this.filtreUrl);
    console.log('📡 Params :', httpParams.toString());
    return this.http.get<PaginatedResponse<T>>(this.filtreUrl, { params: httpParams });
  }
  getFormateurs(search?: string, statut?: string): Observable<PaginatedResponse<Formateur>> {
    return this.getByRole<Formateur>({ role: 'formateur', search, statut });
  }
 
  getApprenants(search?: string, statut?: string): Observable<PaginatedResponse<Apprenant>> {
    return this.getByRole<Apprenant>({ role: 'apprenant', search, statut });
  }
 
  getPlanificateurs(search?: string, statut?: string): Observable<PaginatedResponse<Planificateur>> {
    return this.getByRole<Planificateur>({ role: 'planificateur', search, statut });
  }
 
  getManagers(search?: string, statut?: string): Observable<PaginatedResponse<Manager>> {
    return this.getByRole<Manager>({ role: 'manager', search, statut });
  }
 
  getFinanciers(search?: string, statut?: string): Observable<PaginatedResponse<Financier>> {
    return this.getByRole<Financier>({ role: 'financier', search, statut });
  }
  getById(id: string): Observable<BaseUser> {
    return this.http.get<BaseUser>(`${this.baseUrl}/${id}`);
  }
 
  create(user: Partial<BaseUser>): Observable<BaseUser> {
    return this.http.post<BaseUser>(this.baseUrl, user);
  }
 
  update(id: string, user: Partial<BaseUser>): Observable<BaseUser> {
    return this.http.put<BaseUser>(`${this.baseUrl}/${id}`, user);
  }
 
  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
 
  getListByRole(role: UserRole, search?: string): Observable<BaseUser[]> {
    return this.getByRole<BaseUser>({ role, search }).pipe(
      map(response => response.data)
    );
  }
  getMonProfil(): Observable<BaseUser> {
    return this.http.get<BaseUser>('http://localhost:8081/api/utilisateurs/me');
  }
  
  changerMotDePasse(ancienMotDePasse: string, nouveauMotDePasse: string): Observable<any> {
  return this.http.put('/api/user/changer-mot-de-passe', {
    ancienMotDePasse,
    nouveauMotDePasse
  });
}
  
}
