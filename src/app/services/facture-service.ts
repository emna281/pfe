import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { HttpParams ,HttpClient} from '@angular/common/http';
import { PaiementDTO } from './paiement-service';

export interface FactureResponseDTO{
  id: number;
  numeroFacture: string;
  dateEmission: string;
  dateEcheance: string;
  statut: string;
  montantHT: number;
  montantTVA: number;
  montantTTC: number;
  remise: number;
  notes: string;
  inscriptionId: number;
  apprenantId:number;
  apprenantNom: string;
  apprenantPrenom: string;
  apprenantEmail: string;
  sessionId: number;
  sessionNom: string;
  formationTitre: string;
  paiements: PaiementDTO[];
  montantPaye: number;
  montantRestant: number;
	 
}
export interface FactureRequestDTO{
  dateEcheance: string;
  remise?: number;  
  notes?: string;      
  inscriptionId: number; 
  statut:string
}
export interface FactureCreateDTO {
  dateEcheance: string;
  remise?: number;
  notes?: string;
  inscriptionId: number;
}
export interface FactureUpdateDTO {
  dateEcheance?: string;
  remise?: number;
  notes?: string;
  statut?: string;
}
export interface RappelResponseDTO {
  id: number;
  factureId: number;
  numeroFacture: string;
  apprenantNom: string;
  apprenantPrenom: string;
  apprenantEmail: string;
  dateEcheance: string;
  montantTTC: number;
  montantRestant: number;
  joursRetard: number;
  statut: string;
}
@Injectable({
  providedIn: 'root',
})
export class FactureService {
  private apiUrl = 'http://localhost:8081/api/financier/factures';
  constructor(private http: HttpClient){}
  getAllFactures(): Observable<FactureResponseDTO[]> {
    return this.http.get<FactureResponseDTO[]>(this.apiUrl);
  }
  
  getFactureById(id: number): Observable<FactureResponseDTO> {
    return this.http.get<FactureResponseDTO>(`${this.apiUrl}/${id}`);
  }

  updateFacture(id: number, request: FactureUpdateDTO): Observable<FactureResponseDTO> {
    return this.http.put<FactureResponseDTO>(`${this.apiUrl}/${id}`, request);
  }
 
  updateStatut(id: number, statut: string): Observable<FactureResponseDTO> {
    const params = new HttpParams().set('statut', statut);
    return this.http.patch<FactureResponseDTO>(`${this.apiUrl}/${id}/statut`, null, { params });
  }
  creerFacture(request: FactureCreateDTO): Observable<FactureResponseDTO> {
    return this.http.post<FactureResponseDTO>(this.apiUrl, request);
  }
  archiverFacture(id: number): Observable<void> {
  return this.http.patch<void>(
    `${this.apiUrl}/${id}/archiver`, {}
  );
}
  getFacturesEnRetard(): Observable<FactureResponseDTO[]> {
    return this.http.get<FactureResponseDTO[]>(`${this.apiUrl}/en-retard`);
  }

  getEcheancesProches(): Observable<FactureResponseDTO[]> {
    return this.http.get<FactureResponseDTO[]>(`${this.apiUrl}/echeances-proches`);
  }

  relancerFacture(id: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${id}/relancer`, null);
  }

  envoyerAlerte(id: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${id}/alerte`, null);
  }
  

}
