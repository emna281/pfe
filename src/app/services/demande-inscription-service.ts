import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { HttpParams ,HttpClient} from '@angular/common/http';

export interface DemandeInscriptionRequest {
  nom: string;
  prenom: string;
  email: string;
  genre: string;
  posteActuel: string;
  entreprise: string;
  niveauDeclare: string;
  maitrisePrerequis: string;
  moyenInscription: string;
  commentaires: string;
}

export interface DemandeInscriptionResponse {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  genre: string;
  posteActuel: string;
  entreprise: string;
  niveauDeclare: string;
  maitrisePrerequis: string;
  moyenInscription: string;
  commentaires: string;
  statut: string;
  dateDemande: string;
  commentaireAdmin: string;
  sessionCode:string;
}
export type ActionDemande = 'ACCEPTER' | 'REFUSER';
@Injectable({
  providedIn: 'root',
})


export class DemandeInscriptionService {
  private publicUrl = '/api/public';
  private adminUrl  = 'http://localhost:8081/api/planificateur';
  constructor(private http: HttpClient){}

  createDemande(sessionId: number, request: DemandeInscriptionRequest): Observable<DemandeInscriptionResponse> {
  return this.http.post<DemandeInscriptionResponse>(
    `${this.publicUrl}/sessions/${sessionId}/demandes`,
    request
  );
  }
  getAllDemandes(): Observable<DemandeInscriptionResponse[]> {
    return this.http.get<DemandeInscriptionResponse[]>(`${this.adminUrl}/demandes`);
  }
  getDemandesByEmail(email: string): Observable<DemandeInscriptionResponse[]> {
  return this.http.get<DemandeInscriptionResponse[]>(
    `${this.adminUrl}/demandes/email/${email}`
  );
  }
  traiterDemande(id: number, action: ActionDemande): Observable<DemandeInscriptionResponse> {
  let params = new HttpParams().set('action', action);

  return this.http.put<DemandeInscriptionResponse>(
    `${this.adminUrl}/demandes/${id}/traiter`,
    {},
    { params }
  );
  
}
}
