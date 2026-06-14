import { ChangeDetectorRef, Component, EventEmitter, Input, NgZone, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Modal } from '../../ui/modal/modal';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SalleRequestDTO, SalleResponsetDTO, SalleService } from '../../../../services/salle-service';
import { SwitchComponent } from '../../ui/switch.component';

import { LucideAngularModule ,Plus} from 'lucide-angular';

@Component({
  selector: 'app-formulaire-salle',
  imports: [Modal,FormsModule,CommonModule,SwitchComponent,LucideAngularModule],
  templateUrl: './formulaire-salle.html',
  styleUrl: './formulaire-salle.css',
})
export class FormulaireSalle {
  @Input() selectedSalle: SalleResponsetDTO | null = null;
  @Output() closeFormulaire = new EventEmitter<void>();
  @Input() isOpen: boolean = false;
  @ViewChild('salleForm') salleForm!: NgForm;
  isLoading = false;
  salleData: SalleRequestDTO = {
    numero:'',
    batiment:'',
    capacite:0,
    description:'',
    active:false
  };
  showWarningModal = false;
  modalTitre   = '';
  modalMessage = '';
  modalType: 'danger' | 'warning' | 'info' = 'warning';
  ngOnChanges(changes: SimpleChanges) {
 
    // ← Reset quand le formulaire s'ouvre (isOpen passe à true)
    if (changes['isOpen'] && this.isOpen) {
      this.salleData = this.selectedSalle ? { ...this.selectedSalle } : this.buildEmptyForm();
      this.isLoading = false;
      this.showWarningModal = false;
      setTimeout(() => this.salleForm?.resetForm(this.salleData));
    }
 
    // ← Reset quand selectedSalle change
    if (changes['selectedSalle']) {
      this.salleData = this.selectedSalle ? { ...this.selectedSalle } : this.buildEmptyForm();
      setTimeout(() => this.salleForm?.resetForm(this.salleData));
    }
  }
 
  closeModal() {
    this.closeFormulaire.emit();
    this.salleData = this.buildEmptyForm();
    this.isLoading = false;
    setTimeout(() => this.salleForm?.resetForm(this.buildEmptyForm()));
  }
  
  constructor(private salleService: SalleService,private cdr: ChangeDetectorRef,private ngZone: NgZone) {}

  

  resetForm() {
    this.salleData = this.buildEmptyForm();
    setTimeout(() => {
      if (this.salleForm) {
        this.salleForm.resetForm(this.buildEmptyForm());
      }
    });
  }

  handleAddOrUpdateEvent() {
  const salleRequestDTO: SalleRequestDTO = {
    
    numero: this.salleData.numero,
    batiment: this.salleData.batiment,
    capacite: this.salleData.capacite,
    description: this.salleData.description, 
    active: this.salleData.active,
  };
  console.log('Envoi sans code:', salleRequestDTO);
  
  if (this.isLoading) return;
  this.isLoading = true;

  if (this.selectedSalle) {
    // Mise à jour
    this.salleService.updateSalle(this.selectedSalle.id, salleRequestDTO)
      .subscribe({
        next: (res) => {
          console.log('Formation mise à jour:', res);
          console.log('Numéro généré:', res.numero);
          this.ngZone.run(() => this.closeModal());
        },
        error: (err) => {console.error('Erreur mise à jour:', err);
          console.error('❌ Erreur:', err);
        }
      });
  } else {
    this.salleService.createSalle(salleRequestDTO)
      .subscribe({
        next: (res) => {
          console.log('Formation ajoutée:', res);
          console.log('Numéro généré automatiquement:', res.numero);
          this.ngZone.run(() => this.closeModal())
        },
        error: (err) =>  
          this.ngZone.run(() => {
            this.isLoading = false;
            this.afficherErreur(err, 'création');
          }),
      });
  }
}

private afficherErreur(err: any, action: 'création' | 'modification'): void {
    if (err.status === 409) {
      // Modal uniquement pour les doublons
      this.showWarningModal = true;
      this.modalType    = 'warning';
      this.modalTitre   = 'Salle déjà existante';
      this.modalMessage = err.error?.erreur ?? `Une salle avec le numéro "${this.salleData.numero}" existe déjà.`;
      this.cdr.detectChanges();
    } else {
      // Tous les autres cas → console uniquement
      console.error(`[FormulaireSalle] Erreur ${action} (status ${err.status}) :`, err);
    }
    console.log('showWarningModal après:', this.showWarningModal);
  }
 
  fermerWarning(): void {
    this.showWarningModal = false;
    this.cdr.detectChanges();
  }
  
  private buildEmptyForm(): SalleRequestDTO {
    return { numero: '', batiment: '', capacite: 0, description: '', active: false };
  }  

}
