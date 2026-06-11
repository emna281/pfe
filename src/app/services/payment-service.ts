import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private apiUrl = 'http://localhost:8081/api/payment';

  constructor(private http: HttpClient) {}

  createIntent(montant: number, factureId: number) {
    return this.http.post<any>(`${this.apiUrl}/create-intent`, 
      { montant, factureId });
  }

  confirmerPaiement(factureId: number) {
    return this.http.post<any>(`${this.apiUrl}/confirm`, { factureId });
  }
}
