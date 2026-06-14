import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Activity, AlertTriangle, Award, BarChart2, BookOpen, CalendarClock, CheckCircle, Clock, DoorOpen, LucideAngularModule, MapPin, Users, XCircle } from 'lucide-angular';
import { DashboardPlanificateurDTO, PlanificateurDashboardService } from '../../../services/planificateur-dashboard-service';
import { ActionDemande, DemandeInscriptionResponse, DemandeInscriptionService } from '../../../services/demande-inscription-service';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-planificateur-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, LucideAngularModule],
  
  templateUrl: './planificateur-dashboard.html',
  styleUrl: './planificateur-dashboard.css',
})
export class PlanificateurDashboard {
  
 
  dashboard = signal<DashboardPlanificateurDTO | null>(null);
  isLoading = signal(false);
  errorMsg = signal('');
  demandesEnAttente = signal<DemandeInscriptionResponse[]>([]);
  isLoadingDemandes = signal(false);
  nomPlanificateur = signal('Planificateur');
  today = new Date();
 
  
 
  constructor(
    private planificateurDashboardService: PlanificateurDashboardService,
    private demandeService: DemandeInscriptionService,
    private authService: AuthService
  ) {}
 
  ngOnInit(): void {
    const user = this.authService.getUser();
    this.nomPlanificateur.set(user?.prenom ?? user?.nom ?? 'Planificateur');
    this.charger();
    this.chargerDemandes();
  }
 
 charger(): void {
    this.isLoading.set(true);
    this.errorMsg.set('');
    this.planificateurDashboardService.getDashboard().subscribe({
      next: (data) => {
        this.dashboard.set(data);
        this.isLoading.set(false);
      },
      error: () => {
        this.errorMsg.set('Erreur lors du chargement du dashboard');
        this.isLoading.set(false);
      }
    });
  }
 
  chargerDemandes(): void {
    this.isLoadingDemandes.set(true);
    this.demandeService.getAllDemandes().subscribe({
      next: (data) => {
        this.demandesEnAttente.set(
          data.filter(d => d.statut === 'EN_ATTENTE').slice(0, 5)
        );
        this.isLoadingDemandes.set(false);
      },
      error: () => { this.isLoadingDemandes.set(false); }
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
    const d = this.dashboard();
    if (!d?.seancesParMois?.length) return 1;
    return Math.max(...d.seancesParMois.map(p => p.valeur), 1);
  }
 
  getMaxFormation(): number {
  const d = this.dashboard();
  if (!d?.topFormationsDemandees?.length) return 1;
  return Math.max(...d.topFormationsDemandees.map(f => f.nbDemandes), 1);
}

getTotalDemandes(): number {
  const d = this.dashboard();
  if (!d) return 1;
  return Math.max(
    d.nbDemandesEnAttente +
    d.nbDemandesAcceptees +
    d.nbDemandesRefusees,
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
    const d = this.dashboard();
    if (!d || !d.nbSallesActives) return 0;
    return Math.round((d.nbSallesOccupeesAujourdhui / d.nbSallesActives) * 100);
  }
}
