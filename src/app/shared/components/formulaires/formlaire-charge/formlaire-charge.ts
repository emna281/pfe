import { CommonModule } from '@angular/common';
import { Component, Input, Output ,EventEmitter} from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ChargeRequest, ChargeResponse, ChargeService, StatutCharge, TypeCharge } from '../../../../services/charge-service';

import { SessionService } from '../../../../services/session-service';

@Component({
  selector: 'app-formlaire-charge',
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './formlaire-charge.html',
  styleUrl: './formlaire-charge.css',
})
export class FormlaireCharge {
  @Input() charge: ChargeResponse | null = null; 
  @Output() fermer = new EventEmitter<void>();
  @Output() sauvegarde = new EventEmitter<void>();

  form: FormGroup;
  sessions: { id: number; nom: string }[] = [];
  loading = false;
  errorMsg = '';

  types: { value: TypeCharge; label: string }[] = [
    { value: 'INFRASTRUCTURE', label: 'Infrastructure' },
    { value: 'LOGICIELS',      label: 'Logiciels' },
    { value: 'PEDAGOGIE',      label: 'Pédagogie' },
    { value: 'SERVICES',       label: 'Services' },
    { value: 'FOURNITURES',    label: 'Fournitures' },
    { value: 'SALLE',          label: 'Salle' },
    { value: 'AUTRE',          label: 'Autre' }
  ];

  statuts: { value: StatutCharge; label: string }[] = [
    { value: 'ANNULEE', label: 'ANNULEE' },
    { value: 'ACTIVE',      label: 'ACTIVE' }
  ];

  get estEdition(): boolean {
    return this.charge !== null;
  }

  get typeSession(): 'session' | 'generale' {
    return this.form.get('typeSession')?.value ?? 'generale';
  }

  constructor(
    private fb: FormBuilder,
    private chargeService: ChargeService,
    private sessionService: SessionService
  ) {
    this.form = this.fb.group({
      description:  ['', [Validators.required, Validators.minLength(3)]],
      type:         [null, Validators.required],
      statut:       ['EN_ATTENTE', Validators.required],
      montant:      [null, [Validators.required, Validators.min(0.01)]],
      dateCharge:   [new Date().toISOString().split('T')[0], Validators.required],
      periode:      [''],
      facturable:   [true],
      typeSession:  ['generale'], // 'session' | 'generale'
      sessionId:    [null]
    });
  }

  ngOnInit(): void {
    this.chargerSessions();

    if (this.estEdition && this.charge) {
      this.form.patchValue({
        description: this.charge.description,
        type:        this.charge.type,
        statut:      this.charge.statut,
        montant:     this.charge.montant,
        dateCharge:  this.charge.dateCharge,
        periode:     this.charge.periode,
        typeSession: this.charge.sessionId ? 'session' : 'generale',
        sessionId:   this.charge.sessionId
      });
    }

    // Quand typeSession change → vider ou garder sessionId
    this.form.get('typeSession')?.valueChanges.subscribe(val => {
      if (val === 'generale') {
        this.form.get('sessionId')?.setValue(null);
        this.form.get('sessionId')?.clearValidators();
      } else {
        this.form.get('sessionId')?.setValidators(Validators.required);
      }
      this.form.get('sessionId')?.updateValueAndValidity();
    });
  }

  chargerSessions(): void {
    this.sessionService.getAllSession().subscribe({
      next: (data) => {
        this.sessions = data.map(s => ({ id: s.id, nom: s.nom }));
      }
    });
  }

  soumettre(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.errorMsg = '';

    const val = this.form.value;
    const request :ChargeRequest= {
      description:      val.description,
      type:             val.type,
      statut:           val.statut,
      montant:          val.montant,
      dateCharge:       val.dateCharge,
      periode:          val.periode || undefined,
      sessionId:        val.typeSession === 'session' ? val.sessionId : null,
      justificatifPath: undefined
      
    };

    const appel = this.estEdition
      ? this.chargeService.update(this.charge!.id, request)
      : this.chargeService.create(request);

    appel.subscribe({
      next: () => {
        this.loading = false;
        this.sauvegarde.emit();
      },
      error: (err) => {
        this.errorMsg = err.error?.message || 'Erreur lors de la sauvegarde';
        this.loading = false;
      }
    });
  }

  invalid(field: string): boolean {
    const ctrl = this.form.get(field);
    return !!(ctrl?.invalid && ctrl?.touched);
  }

}
