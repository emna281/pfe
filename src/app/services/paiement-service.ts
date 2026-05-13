import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParams,HttpClient } from '@angular/common/http';
import { FactureResponseDTO } from './facture-service';

export interface PaiementRequestDTO{
  datePaiement:string;
  montant:number;
  modePaiement:string;
  codeRemise?: string;
}
export interface PaiementDTO{
  id:number;
  datePaiement:string;
  montant:number;
  modePaiement:string;
}
@Injectable({
  providedIn: 'root',
})


export class PaiementService {
  private apiUrl = 'http://localhost:8081/api/paiements';
  constructor(private http: HttpClient){}
  ajouterPaiement(factureId: number, request: PaiementRequestDTO): Observable<FactureResponseDTO> {
  return this.http.post<FactureResponseDTO>(
    `${this.apiUrl}/facture/${factureId}`,
    request
  );
}
  
}
