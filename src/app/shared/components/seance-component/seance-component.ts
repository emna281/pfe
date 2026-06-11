import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SalleDisponibleDTO, SeanceRequestDTO, SeanceResponseDTO, SeanceService, StatutPlanificationDTO } from '../../../services/seance-service';
import { SessionDTO, SessionService } from '../../../services/session-service';

type DayState = 'empty' | 'outRange' | 'available' | 'booked' | 'selected';
interface CalendarDay { day: number; iso: string; state: DayState; }
@Component({
  selector: 'app-seance-component',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './seance-component.html',
  styleUrl: './seance-component.css',
})
export class SeanceComponent {
  @Input() sessionId!: number;
  @Input() sessionDateDebut!: string; 
  @Input() sessionDateFin!: string;   
  @Input() sessionHeureDebut!: string; 
  @Input() sessionHeureFin!: string;   
 
  @Output() planificationComplete = new EventEmitter<boolean>();
  // ── Liste des séances ──
  seances: SeanceResponseDTO[] = [];
  loadingSeances = false;
 

  showForm = false;
  form!: FormGroup;
  submitting = false;
  submitError: string | null = null;
  submitSuccess = false;
 

  bookedDates: string[] = [];       
  calendarYear = 0;
  calendarMonth = 0;
  calendarDays: CalendarDay[] = [];
  selectedDate: string | null = null;
  readonly MONTHS = [
    'Janvier','Février','Mars','Avril','Mai','Juin',
    'Juillet','Août','Septembre','Octobre','Novembre','Décembre'
  ];
  readonly DAY_NAMES = ['Lu','Ma','Me','Je','Ve','Sa','Di'];
 

  sallesDisponibles: SalleDisponibleDTO[] = [];
  loadingSalles = false;
  sallesLoaded = false;
 

  deletingId: number | null = null;
 

  progression = 0;

  statut!: StatutPlanificationDTO;
 
  constructor(private seanceService: SeanceService, private fb: FormBuilder,private sessionService:SessionService) {}
 
  ngOnInit(): void {
    this.initCalendar();
    this.loadSeances();
    this.loadBookedDates();
    this.loadProgression();
    this.buildForm();
    this.loadStatut();
  }
 
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['sessionId'] && !changes['sessionId'].firstChange) {
      this.loadSeances();
      this.loadBookedDates();
      this.loadProgression();
    }
  }

  loadSeances(): void {
    this.loadingSeances = true;
    this.seanceService.getSeancesBySession(this.sessionId).subscribe({
      next: (data) => { this.seances = data; this.loadingSeances = false; },
      error: () => { this.loadingSeances = false; },
    });
  }
 
  loadBookedDates(): void {
    this.seanceService.getDatesBySession(this.sessionId).subscribe({
      next: (dates) => { this.bookedDates = dates; this.buildCalendarDays(); },
    });
  }
 
  loadProgression(): void {
    this.seanceService.getProgression(this.sessionId).subscribe({
      next: (p) => { this.progression = p.progression; },
    });
  }
 
 
  buildForm(): void {
    this.form = this.fb.group({
      heureDebut: [{ value: '', disabled: true }, Validators.required],
      heureFin:   [{ value: '', disabled: true }, Validators.required],
      salleId:    [null, Validators.required],
    });
  }
 
  openForm(): void {
    this.showForm = true;
    this.submitError = null;
    this.submitSuccess = false;
    this.selectedDate = null;
    this.sallesDisponibles = [];
    this.sallesLoaded = false;
    this.form.reset();
    this.form.get('heureDebut')?.disable();
    this.form.get('heureFin')?.disable();
    this.initCalendar();
  }
 
  closeForm(): void {
    this.showForm = false;
  }
 
  
  initCalendar(): void {
    const start = this.sessionDateDebut
      ? new Date(this.sessionDateDebut)
      : new Date();
    this.calendarYear  = start.getFullYear();
    this.calendarMonth = start.getMonth();
    this.buildCalendarDays();
  }
 
  buildCalendarDays(): void {
    const year  = this.calendarYear;
    const month = this.calendarMonth;
    const firstDay  = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    let startOffset = (firstDay.getDay() + 6) % 7;
 
    const sessionStart = this.sessionDateDebut ? new Date(this.sessionDateDebut) : null;
    const sessionEnd   = this.sessionDateFin   ? new Date(this.sessionDateFin)   : null;
 
    const days: CalendarDay[] = [];
    for (let i = 0; i < startOffset; i++) days.push({ day: 0, iso: '', state: 'empty' });
 
    for (let d = 1; d <= daysInMonth; d++) {
      const date    = new Date(year, month, d);
      const iso     = this.toIso(date);
      const inRange = sessionStart && sessionEnd
        ? date >= sessionStart && date <= sessionEnd
        : false;
      const booked  = this.bookedDates.includes(iso);
      const selected = iso === this.selectedDate;
 
      let state: DayState = 'outRange';
      if (inRange && booked)   state = 'booked';
      else if (inRange && selected) state = 'selected';
      else if (inRange)        state = 'available';
 
      days.push({ day: d, iso, state });
    }
    this.calendarDays = days;
  }
 
  prevMonth(): void {
    if (this.calendarMonth === 0) { this.calendarMonth = 11; this.calendarYear--; }
    else this.calendarMonth--;
    this.buildCalendarDays();
  }
 
  nextMonth(): void {
    if (this.calendarMonth === 11) { this.calendarMonth = 0; this.calendarYear++; }
    else this.calendarMonth++;
    this.buildCalendarDays();
  }
 
  selectDay(d: CalendarDay): void {
    if (d.state === 'empty' || d.state === 'outRange' || d.state === 'booked') return;
    this.selectedDate = d.iso;
    this.form.patchValue({ salleId: null });
    this.sallesDisponibles = [];
    this.sallesLoaded = false;
    this.form.get('heureDebut')?.enable();
    this.form.get('heureFin')?.enable();
    this.buildCalendarDays();
    this.tryLoadSalles();
  }

  onTimeChange(): void {
    this.form.patchValue({ salleId: null });
    this.sallesDisponibles = [];
    this.sallesLoaded = false;
    this.tryLoadSalles();
  }
 
  tryLoadSalles(): void {
    const debut = this.form.get('heureDebut')?.value;
    const fin   = this.form.get('heureFin')?.value;
    if (!this.selectedDate || !debut || !fin) return;
    if (fin <= debut) return;
    if (this.sessionHeureDebut && debut < this.sessionHeureDebut) return;
    if (this.sessionHeureFin   && fin   > this.sessionHeureFin)   return;
 
    this.loadingSalles = true;
    this.seanceService.getSallesDisponibles(this.selectedDate, debut, fin).subscribe({
      next: (salles) => {
        this.sallesDisponibles = salles;
        this.sallesLoaded = true;
        this.loadingSalles = false;
      },
      error: () => { this.loadingSalles = false; },
    });
  }
 
  selectSalle(id: number): void {
    this.form.patchValue({ salleId: id });
  }

  get heureError(): string | null {
    const debut = this.form.get('heureDebut')?.value;
    const fin   = this.form.get('heureFin')?.value;
    if (!debut || !fin) return null;
    if (fin <= debut) return "L'heure de fin doit être après l'heure de début.";
    if (this.sessionHeureDebut && debut < this.sessionHeureDebut)
      return `L'heure de début ne peut pas être avant ${this.sessionHeureDebut}.`;
    if (this.sessionHeureFin && fin > this.sessionHeureFin)
      return `L'heure de fin ne peut pas dépasser ${this.sessionHeureFin}.`;
    return null;
  }
 get formValid(): boolean {
  const debut = this.form.get('heureDebut')?.value;
  const fin   = this.form.get('heureFin')?.value;
  return !!this.selectedDate
    && !!debut
    && !!fin
    && !this.heureError
    && !!this.form.get('salleId')?.value;
}
  submit(): void {
    if (this.statut?.complet) {
      this.submitError = 'Le nombre maximum de séances est déjà atteint.';
      return;
    }
    if (!this.formValid) return;
    this.submitting = true;
    this.submitError = null;
 
    const payload: SeanceRequestDTO = {
      date:       this.selectedDate!,
      heureDebut: this.form.value.heureDebut,
      heureFin:   this.form.value.heureFin,
      sessionId:  this.sessionId,
      salleId:    this.form.value.salleId,
    };
 
    this.seanceService.createSeance(payload).subscribe({
      next: () => {
        this.submitting = false;
        this.submitSuccess = true;
        this.showForm = false;
        this.loadSeances();
        this.loadBookedDates();
        this.loadProgression();
        this.loadStatut();
      },
      error: (err) => {
        this.submitting = false;
        this.submitError = err?.error?.message ?? 'Une erreur est survenue.';
      },
    });
  }

  deleteSeance(id: number): void {
    if (!confirm('Supprimer cette séance ?')) return;
    this.deletingId = id;
    this.seanceService.deleteSeance(id).subscribe({
      next: () => {
        this.deletingId = null;
        this.loadSeances();
        this.loadBookedDates();
        this.loadProgression();
        this.loadStatut();
      },
      error: () => { this.deletingId = null; },
    });
  }

  toIso(date: Date): string {
    return date.toISOString().split('T')[0];
  }
 
  formatDate(iso: string): string {
    if (!iso) return '—';
    const [y, m, d] = iso.split('-');
    return `${d}/${m}/${y}`;
  }
 
  formatHeure(h: string): string {
    return h ? h.substring(0, 5) : '—';
  }
 
  getSalleNom(id: number | null): string {
    if (!id) return '—';
    const s = this.sallesDisponibles.find(s => s.id === id);
    return s ? `${s.numero} — ${s.batiment}` : '—';
  }
 
  dayClass(d: CalendarDay): string {
    if (d.state === 'empty') return 'invisible';
    const base = 'w-8 h-8 flex items-center justify-center rounded-full text-sm transition-colors ';
    switch (d.state) {
      case 'outRange':  return base + 'text-gray-200 cursor-default';
      case 'booked':    return base + 'text-red-400 line-through cursor-default relative';
      case 'selected':  return base + 'bg-blue-500 text-white font-medium cursor-pointer';
      case 'available': return base + 'text-gray-700 hover:bg-blue-50 hover:text-blue-600 cursor-pointer';
      default: return base;
    }
  }

  loadStatut() {
  this.seanceService.getStatutPlanification(this.sessionId)
    .subscribe({
    next: (data) => { this.statut = data; this.planificationComplete.emit(data.complet);},
    error: () => {
      
      this.statut = {
        sessionId:         this.sessionId,
        sessionCode:       '',
        sessionNom:        '',
        seancesPlanifiees: 0,
        seancesRequises:   0,
        manquantes:        0,
        complet:           false
      };
      this.planificationComplete.emit(false);
    }
  });
}

}
 
