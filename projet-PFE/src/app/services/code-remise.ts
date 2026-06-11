import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
export interface CodeRemiseRequest {
  apprenantId: number;
  pourcentage: number;
  dateExpiration: string;
}

export interface CodeRemiseResponse {
  id: number;
  code: string;
  pourcentage: number;
  dateExpiration: string;
  actif: boolean;
  utilise: boolean;
  apprenantId: number;
  apprenantNom: string;
  apprenantPrenom: string;
}
export interface ApprenantResponse {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  dateCreation: string;
  codeRemiseActif?: {
    code: string;
    pourcentage: number;
    dateExpiration: string;
  } | null;
}
@Injectable({
  providedIn: 'root',
})
export class CodeRemise {
  private api = 'http://localhost:8081/api/codes-remise';

  constructor(private http: HttpClient) {}

  creerCode(request: CodeRemiseRequest): Observable<CodeRemiseResponse> {
    return this.http.post<CodeRemiseResponse>(this.api, request);
  }

  getAllCodes(): Observable<CodeRemiseResponse[]> {
    return this.http.get<CodeRemiseResponse[]>(this.api);
  }

  getCodesByApprenant(apprenantId: number): Observable<CodeRemiseResponse[]> {
    return this.http.get<CodeRemiseResponse[]>(`${this.api}/apprenant/${apprenantId}`);
  }

  desactiverCode(id: number): Observable<void> {
    return this.http.patch<void>(`${this.api}/${id}/desactiver`, {});
  }

  appliquerCode(factureId: number, code: string): Observable<CodeRemiseResponse> {
    const params = new HttpParams()
      .set('factureId', factureId)
      .set('code', code);
    return this.http.post<CodeRemiseResponse>(`${this.api}/appliquer`, {}, { params });
  }
  validerCode(code: string, apprenantId: number): Observable<CodeRemiseResponse> {
  return this.http.get<CodeRemiseResponse>(
    `${this.api}/valider?code=${code}&apprenantId=${apprenantId}`
  );
}
  
}
