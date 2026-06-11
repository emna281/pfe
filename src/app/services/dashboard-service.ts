import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface PointGraphiqueDTO {
  label: string;
  valeur: number | null;
}

export interface RentabiliteSessionDTO {
  sessionId: number;
  sessionNom: string;
  revenus: number;
  charges: number;
  resultatNet: number;
  tauxRentabilite: number;
  nbInscriptions: number;
}

export interface DashboardCentreDTO {
  totalRevenus: number;
  totalCharges: number;
  resultatNet: number;
  tauxRentabilite: number;
  nbSessions: number;
  nbInscriptions: number;
  sessionsRentabilite: RentabiliteSessionDTO[];
  graphiqueRevenus: PointGraphiqueDTO[];
  graphiqueCharges: PointGraphiqueDTO[];
}
@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private api = '/api/financier/dashboard';

  constructor(private http: HttpClient) {}

  getDashboardCentre(debut: string, fin: string): Observable<DashboardCentreDTO> {
    const params = new HttpParams().set('debut', debut).set('fin', fin);
    return this.http.get<DashboardCentreDTO>(`${this.api}/centre`, { params });
  }

  getRentabiliteSession(sessionId: number): Observable<RentabiliteSessionDTO> {
    return this.http.get<RentabiliteSessionDTO>(`${this.api}/session/${sessionId}`);
  }
  
}
