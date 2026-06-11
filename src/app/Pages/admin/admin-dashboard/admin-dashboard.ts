import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Activity, AlertTriangle, Award, BadgeDollarSign, BarChart2, BookOpen, CalendarClock, LucideAngularModule, ShieldCheck, TrendingDown, TrendingUp, UserCheck, Users, UserX } from 'lucide-angular';
import { AuthService } from '../../../shared/services/auth.service';
import { AdminDashboardService, DashboardAdminDTO } from '../../../services/admin-dashboard-service';

@Component({
  selector: 'app-admin-dashboard',
  imports: [CommonModule, RouterModule, FormsModule, LucideAngularModule],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboard {
readonly icons = {
    Users, UserCheck, BadgeDollarSign, CalendarClock,
    TrendingUp, TrendingDown, AlertTriangle, BookOpen,
    Award, BarChart2, Activity, ShieldCheck, UserX
  };
 
  nomAdmin = '';
  today = new Date();
  dashboard: DashboardAdminDTO | null = null;
  isLoading = false;
  errorMsg = '';
 
  constructor(
    private adminDashboardService: AdminDashboardService,
    private authService: AuthService
  ) {}
 
  ngOnInit(): void {
    const user = this.authService.getUser();
    this.nomAdmin = user?.prenom ?? user?.nom ?? 'Admin';
    this.charger();
  }
 
  charger(): void {
    this.isLoading = true;
    this.errorMsg = '';
    this.adminDashboardService.getDashboard().subscribe({
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
 
  getBarHeight(valeur: number, max: number): string {
    if (max === 0 || valeur == null) return '0%';
    return Math.min((valeur / max) * 100, 100) + '%';
  }
 
  getMaxGraphique(): number {
    if (!this.dashboard?.resumeFinancier) return 1;
    const all = [
      ...this.dashboard.resumeFinancier.graphiqueRevenus.map(p => p.valeur ?? 0),
      ...this.dashboard.resumeFinancier.graphiqueCharges.map(p => p.valeur ?? 0)
    ];
    return Math.max(...all, 1);
  }
 
  getMaxFormation(): number {
    if (!this.dashboard?.topFormations?.length) return 1;
    return Math.max(...this.dashboard.topFormations.map(f => f.revenuTotal), 1);
  }

  formatCurrency(val: number): string {
    return new Intl.NumberFormat('fr-TN', { style: 'currency', currency: 'TND' }).format(val ?? 0);
  }
 
  getResultatClass(val: number): string {
    if (val > 0) return 'text-green-600';
    if (val < 0) return 'text-red-600';
    return 'text-gray-600';
  }
 
  getTauxClass(taux: number): string {
    if (taux >= 30) return 'text-green-600';
    if (taux >= 0) return 'text-yellow-600';
    return 'text-red-600';
  }
 
  getRoleColor(label: string): string {
    const map: Record<string, string> = {
      APPRENANT:    'bg-blue-500',
      FORMATEUR:    'bg-purple-500',
      FINANCIER:    'bg-green-500',
      PLANIFICATEUR:'bg-orange-500',
      MANAGER:      'bg-pink-500',
      ADMIN:        'bg-gray-500',
    };
    return map[label] ?? 'bg-gray-400';
  }
 
  getRoleLabel(label: string): string {
    const map: Record<string, string> = {
      APPRENANT: 'Apprenants', FORMATEUR: 'Formateurs',
      FINANCIER: 'Financiers', PLANIFICATEUR: 'Planificateurs',
      MANAGER: 'Managers', ADMIN: 'Admins'
    };
    return map[label] ?? label;
  }
 
  getTotalRepartition(): number {
    return this.dashboard?.repartitionUtilisateurs?.reduce((s, r) => s + r.valeur, 0) ?? 1;
  }
}
