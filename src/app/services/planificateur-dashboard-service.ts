import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
export interface DashboardPlanificateurDTO {

  nbSessionsPlanifiees: number;
  nbSessionsOuvertes: number;
  nbSessionsConfirmees: number;
  nbSessionsTerminees: number;
  nbSessionsTotal: number;
  nbSessionsSansFormateur: number;
  nbFormationsActives: number;
  nbCompetences: number;
  nbSallesActives: number;
  nbSallesOccupeesAujourdhui: number;
  nbSeancesCeMois: number;
  nbSeancesAujourdhui: number;
  nbDemandesEnAttente: number;
  nbDemandesAcceptees: number;
  nbDemandesRefusees: number;
  nbApprenantsCertifiables: number;
  seancesParMois: { label: string; valeur: number }[];
  demandesParStatut: { label: string; valeur: number }[];
  topFormationsDemandees: { titreFormation: string; nbDemandes: number }[];
}
@Injectable({
  providedIn: 'root',
})
export class PlanificateurDashboardService {
  private readonly apiUrl = 'http://localhost:8081/api/planificateur/dashboard';
 
  constructor(private http: HttpClient) {}
 
  getDashboard(): Observable<DashboardPlanificateurDTO> {
    return this.http.get<DashboardPlanificateurDTO>(this.apiUrl);
  }
}
