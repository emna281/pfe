import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
export interface DashboardAdminDTO {
  nbApprenants: number;
  nbFormateurs: number;
  nbFinanciers: number;
  nbPlanificateurs: number;
  nbManagers: number;
  nbUtilisateursActifs: number;
  nbUtilisateursInactifs: number;
  nbSessionsPlanifiees: number;
  nbSessionsOuvertes: number;
  nbSessionsConfirmees: number;
  nbSessionsTerminees: number;
  nbSessionsTotal: number;
  nbSessionsSansFormateur: number;
  resumeFinancier: {
    totalRevenus: number;
    totalCharges: number;
    resultatNet: number;
    tauxRentabilite: number;
    nbSessions: number;
    nbInscriptions: number;
    graphiqueRevenus: { label: string; valeur: number }[];
    graphiqueCharges: { label: string; valeur: number }[];
  };
  topFormations: { titreFormation: string; nbInscriptions: number; revenuTotal: number }[];
  repartitionUtilisateurs: { label: string; valeur: number }[];
}
@Injectable({
  providedIn: 'root',
})
export class AdminDashboardService {
  private readonly apiUrl = 'http://localhost:8081/api/admin/dashboard';

  constructor(private http: HttpClient) {}

  getDashboard(): Observable<DashboardAdminDTO> {
    return this.http.get<DashboardAdminDTO>(this.apiUrl);
  }
}
