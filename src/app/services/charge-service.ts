import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export type TypeCharge =
  | 'INFRASTRUCTURE'
  | 'LOGICIELS'
  | 'PEDAGOGIE'
  | 'SERVICES'
  | 'FOURNITURES'
  | 'SALLE'
  | 'AUTRE';

export type StatutCharge = 'EN_ATTENTE' | 'PAYEE' | 'EN_RETARD';

export interface ChargeResponse {
  id: number;
  numeroCharge: string;
  type: TypeCharge;
  statut: StatutCharge;
  description: string;
  dateCharge: string;
  periode: string;
  montant: number;
  facturable: boolean;
  justificatifPath: string;
  sessionId: number | null;
  sessionNom: string | null;
}

export interface ChargeRequest {
  type: TypeCharge;
  description: string;
  dateCharge: string;
  periode?: string;
  montant: number;
  facturable: boolean;
  justificatifPath?: string;
  sessionId?: number | null;
}

@Injectable({
  providedIn: 'root',
})
export class ChargeService {
    private api = '/api/financier/charges';

  constructor(private http: HttpClient) {}

  getAll(): Observable<ChargeResponse[]> {
    return this.http.get<ChargeResponse[]>(this.api);
  }

  getById(id: number): Observable<ChargeResponse> {
    return this.http.get<ChargeResponse>(`${this.api}/${id}`);
  }

  create(request: ChargeRequest): Observable<ChargeResponse> {
    return this.http.post<ChargeResponse>(this.api, request);
  }

  update(id: number, request: ChargeRequest): Observable<ChargeResponse> {
    return this.http.put<ChargeResponse>(`${this.api}/${id}`, request);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }

  updateStatut(id: number, statut: StatutCharge): Observable<ChargeResponse> {
    const params = new HttpParams().set('statut', statut);
    return this.http.patch<ChargeResponse>(
      `${this.api}/${id}/statut`, null, { params }
    );
  }

  getBySession(sessionId: number): Observable<ChargeResponse[]> {
    return this.http.get<ChargeResponse[]>(`${this.api}/session/${sessionId}`);
  }

  getGenerales(): Observable<ChargeResponse[]> {
    return this.http.get<ChargeResponse[]>(`${this.api}/generales`);
  }

  exportCSV(charges: ChargeResponse[]): void {
    const headers = [
      'Numéro', 'Type', 'Description', 'Date',
      'Montant', 'Session', 'Statut', 'Facturable'
    ];

    const rows = charges.map(c => [
      c.numeroCharge,
      c.type,
      `"${c.description}"`,
      c.dateCharge,
      c.montant.toString().replace('.', ','),
      c.sessionNom ?? 'Générale',
      c.statut,
      c.facturable ? 'Oui' : 'Non'
    ]);

    const csvContent = [headers, ...rows]
      .map(row => row.join(';'))
      .join('\n');

    const blob = new Blob(
      ['\uFEFF' + csvContent], // BOM pour Excel
      { type: 'text/csv;charset=utf-8;' }
    );

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `charges_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }
  
}
