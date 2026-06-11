import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Apprenant } from '../shared/services/auth.service';
export interface InscriptionRequest{
  apprenantEmail: string; 
  sessionId:number;
}
export interface InscriptionResponseDTO{
  id:number;
  dateInscription: string;
  statut: string;
  noteFormateur: number;
  noteFormation: number;
  apprenantNom: string;
  apprenantPrenom: string;
  apprenantEmail: string;
  sessionNom: string;
  sessionCode: string;
  numeroFacture: string;
  statutFacture: string;
  facturee: boolean;
  prixSession: number;
}
@Injectable({
  providedIn: 'root',
})
export class InscriptionService {
  private adminUrl  = 'http://localhost:8081/api/planificateur';
  private publicUrl = 'http://localhost:8081/api/public';
  private financierUrl = 'http://localhost:8081/api/financier';
  constructor(private http: HttpClient) {}
  
  createInscription(request: InscriptionRequest): Observable<InscriptionResponseDTO> {
    return this.http.post<InscriptionResponseDTO>(
      `${this.adminUrl}/inscriptions`,
      request
    );
  }
  getAllInscriptions(): Observable<InscriptionResponseDTO[]> {
    return this.http.get<InscriptionResponseDTO[]>(
      `${this.adminUrl}/inscriptions`
    );
  }
  getInscriptionById(id:number):Observable<InscriptionResponseDTO[]>{
    return this.http.get<InscriptionResponseDTO[]>(
      `${this.adminUrl}/inscriptions/${id}`
    );
  }

  getInscriptionsBySession(
    sessionId: number
  ): Observable<InscriptionResponseDTO[]> {
    return this.http.get<InscriptionResponseDTO[]>(
      `${this.adminUrl}/inscriptions/session/${sessionId}`
    );
  }

  getInscriptionsByApprenant(
    apprenantId: number
  ): Observable<InscriptionResponseDTO[]> {
    return this.http.get<InscriptionResponseDTO[]>(
      `${this.adminUrl}/inscriptions/apprenant/${apprenantId}`
    );
  }

  deleteInscription(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.adminUrl}/inscriptions/${id}`
    );
  }
  getInscriptionsNonFacturees(): Observable<InscriptionResponseDTO[]> {
    return this.http.get<InscriptionResponseDTO[]>(
    `${this.financierUrl}/inscriptions/non-facturees`
    );
  }
  getApprenantsCertifiables(sessionId: number): Observable<Apprenant[]> {
    return this.http.get<Apprenant[]>(
    `/api/sessions/${sessionId}/apprenants/certifiables`
  );
}
}
