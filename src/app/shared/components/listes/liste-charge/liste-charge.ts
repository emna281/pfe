import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChargeResponse, ChargeService, StatutCharge, TypeCharge } from '../../../../services/charge-service';
import { FormlaireCharge } from '../../formulaires/formlaire-charge/formlaire-charge';
import { LucideAngularModule,Upload,Search,Pencil,Trash2 } from 'lucide-angular';

@Component({
  selector: 'app-liste-charge',
  imports: [CommonModule,FormsModule,FormlaireCharge,LucideAngularModule],
  templateUrl: './liste-charge.html',
  styleUrl: './liste-charge.css',
})
export class ListeCharge {
  charges: ChargeResponse[] = [];
  chargesFiltrees: ChargeResponse[] = [];
  chargesPage: ChargeResponse[] = [];

  isLoading = false;
  errorMessage = '';

  selectedIds: number[] = [];
  selectAll = false;

  recherche = '';
  filtreType: TypeCharge | '' = '';
  filtreStatut: StatutCharge | '' = '';
  filtreSession: 'toutes' | 'attachee' | 'generale' = 'toutes';

  page = 1;
  pageSize = 20;
  total = 0;

  showModal = false;
  showDeleteModal = false;
  chargeSelectionnee: ChargeResponse | null = null;
  chargeASupprimer: ChargeResponse | null = null;

  types: TypeCharge[] = [
    'INFRASTRUCTURE', 'LOGICIELS', 'PEDAGOGIE',
    'SERVICES', 'FOURNITURES', 'SALLE', 'AUTRE'
  ];

  statuts: StatutCharge[] = ['ANNULEE', 'ACTIVE'];

  constructor(
    private chargeService: ChargeService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.charger();
  }

  charger(): void {
    this.isLoading = true;
    this.chargeService.getAll().subscribe({
      next: (data) => {
        this.charges = data;
        this.appliquerFiltres();
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMessage = 'Erreur lors du chargement des charges';
        this.isLoading = false;
      }
    });
  }
  appliquerFiltres(): void {
    let result = [...this.charges];

    if (this.recherche.trim()) {
      const q = this.recherche.toLowerCase();
      result = result.filter(c =>
        c.description.toLowerCase().includes(q) ||
        c.numeroCharge.toLowerCase().includes(q) ||
        (c.sessionNom?.toLowerCase().includes(q) ?? false)
      );
    }

    if (this.filtreType) {
      result = result.filter(c => c.type === this.filtreType);
    }

    if (this.filtreStatut) {
      result = result.filter(c => c.statut === this.filtreStatut);
    }

    if (this.filtreSession === 'attachee') {
      result = result.filter(c => c.sessionId != null);
    } else if (this.filtreSession === 'generale') {
      result = result.filter(c => c.sessionId == null);
    }

    this.total = result.length;
    this.chargesFiltrees = result;
    this.page = 1;
    this.paginer();
  }

  paginer(): void {
    const debut = (this.page - 1) * this.pageSize;
    this.chargesPage = this.chargesFiltrees.slice(debut, debut + this.pageSize);
  }

  changerPage(delta: number): void {
    this.page += delta;
    this.paginer();
  }

  get totalPages(): number {
    return Math.ceil(this.total / this.pageSize);
  }

  reinitialiserFiltres(): void {
    this.recherche = '';
    this.filtreType = '';
    this.filtreStatut = '';
    this.filtreSession = 'toutes';
    this.appliquerFiltres();
  }

  get nombreFiltresActifs(): number {
    let count = 0;
    if (this.filtreType) count++;
    if (this.filtreStatut) count++;
    if (this.filtreSession !== 'toutes') count++;
    return count;
  }

  // ── Sélection ─────────────────────────────────────────────────────────────
  toggleSelectAll(): void {
    this.selectAll = !this.selectAll;
    this.selectedIds = this.selectAll
      ? this.chargesPage.map(c => c.id)
      : [];
  }

  toggleSelect(id: number): void {
    if (this.selectedIds.includes(id)) {
      this.selectedIds = this.selectedIds.filter(i => i !== id);
    } else {
      this.selectedIds = [...this.selectedIds, id];
    }
    this.selectAll = this.selectedIds.length === this.chargesPage.length;
  }

  isSelected(id: number): boolean {
    return this.selectedIds.includes(id);
  }

  ouvrirCreation(): void {
    this.chargeSelectionnee = null;
    this.showModal = true;
  }

  ouvrirEdition(charge: ChargeResponse): void {
    this.chargeSelectionnee = { ...charge };
    this.showModal = true;
  }

  fermerModal(): void {
    this.showModal = false;
    this.chargeSelectionnee = null;
  }

  onChargeSauvegardee(): void {
    this.fermerModal();
    this.charger();
  }

  // ── Suppression ───────────────────────────────────────────────────────────
  ouvrirSuppression(charge: ChargeResponse): void {
    this.chargeASupprimer = charge;
    this.showDeleteModal = true;
  }

  confirmerSuppression(): void {
    if (!this.chargeASupprimer) return;
    this.chargeService.delete(this.chargeASupprimer.id).subscribe({
      next: () => {
        this.showDeleteModal = false;
        this.chargeASupprimer = null;
        this.charger();
      },
      error: () => this.errorMessage = 'Erreur lors de la suppression'
    });
  }

  // ── Export CSV ────────────────────────────────────────────────────────────
  exporterCSV(): void {
    const selection = this.selectedIds.length > 0
      ? this.charges.filter(c => this.selectedIds.includes(c.id))
      : this.chargesFiltrees;
    this.chargeService.exportCSV(selection);
  }

  // ── Helpers UI ────────────────────────────────────────────────────────────
  statutBadgeClass(statut: StatutCharge): string {
    switch (statut) {
      case 'ANNULEE':      return 'bg-green-100 text-green-700 border border-green-200';
      case 'ACTIVE': return 'bg-yellow-100 text-yellow-700 border border-yellow-200';
      
    }
  }

  statutLabel(statut: StatutCharge): string {
    switch (statut) {
      case 'ANNULEE':      return 'ANNULEE';
      case 'ACTIVE': return 'ACTIVE';
    }
  }

  typeBadgeClass(type: TypeCharge): string {
    const map: Record<TypeCharge, string> = {
      INFRASTRUCTURE: 'bg-blue-100 text-blue-700',
      LOGICIELS:      'bg-purple-100 text-purple-700',
      PEDAGOGIE:      'bg-pink-100 text-pink-700',
      SERVICES:       'bg-teal-100 text-teal-700',
      FOURNITURES:    'bg-orange-100 text-orange-700',
      SALLE:          'bg-indigo-100 text-indigo-700',
      AUTRE:          'bg-gray-100 text-gray-600'
    };
    return map[type] ?? 'bg-gray-100 text-gray-600';
  }

  typeLabel(type: TypeCharge): string {
    const map: Record<TypeCharge, string> = {
      INFRASTRUCTURE: 'Infrastructure',
      LOGICIELS:      'Logiciels',
      PEDAGOGIE:      'Pédagogie',
      SERVICES:       'Services',
      FOURNITURES:    'Fournitures',
      SALLE:          'Salle',
      AUTRE:          'Autre'
    };
    return map[type] ?? type;
  }

}
