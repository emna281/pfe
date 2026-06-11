import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Activity, AlertTriangle, Award, BarChart2, BookOpen, CalendarClock, CheckCircle, Clock, DoorOpen, LucideAngularModule, MapPin, Users, XCircle } from 'lucide-angular';
import { DashboardPlanificateurDTO, PlanificateurDashboardService } from '../../../services/planificateur-dashboard-service';
import { ActionDemande, DemandeInscriptionResponse, DemandeInscriptionService } from '../../../services/demande-inscription-service';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-planificateur-dashboard',
  imports: [CommonModule, RouterModule, FormsModule, LucideAngularModule],
  templateUrl: './planificateur-dashboard.html',
  styleUrl: './planificateur-dashboard.css',
})
export class PlanificateurDashboard {
  readonly icons = {
    CalendarClock, BookOpen, Award, Users,
    DoorOpen, Clock, CheckCircle, XCircle,
    AlertTriangle, BarChart2, MapPin, Activity
  };
 
  nomPlanificateur = '';
  today = new Date();
 
  dashboard: DashboardPlanificateurDTO | null = null;
  isLoading = false;
  errorMsg = '';
 
  // Demandes récentes en attente
  demandesEnAttente: DemandeInscriptionResponse[] = [];
  isLoadingDemandes = false;
 
  constructor(
    private planificateurDashboardService: PlanificateurDashboardService,
    private demandeService: DemandeInscriptionService,
    private authService: AuthService
  ) {}
 
  ngOnInit(): void {
    const user = this.authService.getUser();
    this.nomPlanificateur = user?.prenom ?? user?.nom ?? 'Planificateur';
    this.charger();
    this.chargerDemandes();
  }
 
  charger(): void {
    this.isLoading = true;
    this.errorMsg = '';
    this.planificateurDashboardService.getDashboard().subscribe({
      next: (data) => {
        this.dashboard = data;
        this.isLoading = false;
      },
      error: () => {
        this.errorMsg = 'Erreur lors du chargement du dashboard';
        this.isLoading = false;
      }
    });
  }
 
  chargerDemandes(): void {
    this.isLoadingDemandes = true;
    this.demandeService.getAllDemandes().subscribe({
      next: (data) => {
        this.demandesEnAttente = data
          .filter(d => d.statut === 'EN_ATTENTE')
          .slice(0, 5);
        this.isLoadingDemandes = false;
      },
      error: () => { this.isLoadingDemandes = false; }
    });
  }
 
  traiter(id: number, action: ActionDemande): void {
    this.demandeService.traiterDemande(id, action).subscribe({
      next: () => {
        this.chargerDemandes();
        this.charger();
      }
    });
  }

  getBarHeight(valeur: number, max: number): string {
    if (max === 0 || !valeur) return '0%';
    return Math.min((valeur / max) * 100, 100) + '%';
  }
 
  getMaxSeances(): number {
    if (!this.dashboard?.seancesParMois?.length) return 1;
    return Math.max(...this.dashboard.seancesParMois.map(p => p.valeur), 1);
  }
 
  getMaxFormation(): number {
    if (!this.dashboard?.topFormationsDemandees?.length) return 1;
    return Math.max(...this.dashboard.topFormationsDemandees.map(f => f.nbDemandes), 1);
  }
 
  getTotalDemandes(): number {
    if (!this.dashboard) return 1;
    return Math.max(
      this.dashboard.nbDemandesEnAttente +
      this.dashboard.nbDemandesAcceptees +
      this.dashboard.nbDemandesRefusees,
      1
    );
  }
 
  getStatutDemandeClass(statut: string): string {
    switch (statut) {
      case 'EN_ATTENTE': return 'bg-yellow-100 text-yellow-700';
      case 'ACCEPTEE':   return 'bg-green-100 text-green-700';
      case 'REFUSEE':    return 'bg-red-100 text-red-700';
      default:           return 'bg-gray-100 text-gray-600';
    }
  }
 
  getStatutDemandeLabel(statut: string): string {
    const map: Record<string, string> = {
      EN_ATTENTE: 'En attente',
      ACCEPTEE:   'Acceptée',
      REFUSEE:    'Refusée'
    };
    return map[statut] ?? statut;
  }
 
  getTauxOccupation(): number {
    if (!this.dashboard || !this.dashboard.nbSallesActives) return 0;
    return Math.round(
      (this.dashboard.nbSallesOccupeesAujourdhui / this.dashboard.nbSallesActives) * 100
    );
  }
}
