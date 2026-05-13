import { Component ,Output,Input,EventEmitter, ChangeDetectorRef,NgZone} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DemandeInscriptionService ,DemandeInscriptionRequest} from '../../../../services/demande-inscription-service';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationModal } from '../../ui/confirmation-modal/confirmation-modal';
@Component({
  selector: 'app-formulaire-inscription',
  standalone: true,
  imports: [FormsModule,CommonModule,ConfirmationModal],
  templateUrl: './formulaire-inscription.html',
  styleUrl: './formulaire-inscription.css',
})
export class FormulaireInscription {
  sessionId!: number;
  demande: DemandeInscriptionRequest = {
    nom: '',
    prenom: '',
    email: '',
    genre: '',
    posteActuel: '',
    entreprise: '',
    niveauDeclare: '',
    maitrisePrerequis: '',
    moyenInscription: '',
    commentaires: '',
  };
  message: string = '';
  constructor(private demandeInscriptionService:DemandeInscriptionService,private route:ActivatedRoute, private cdr: ChangeDetectorRef,private ngZone: NgZone){}
  ngOnInit (){
    this.sessionId=Number(this.route.snapshot.paramMap.get('sessionId'));
    console.log("session Id ",this.sessionId);
  }

  onSubmit() {
    this.demandeInscriptionService.createDemande(this.sessionId, this.demande).subscribe({
      next: (res) => {
        this.ngZone.run(() => {
          this.message = "✅ Demande envoyée avec succès !";
          console.log(res);
        });
      },
      error: (err) => {
        this.ngZone.run(() => {
          if (err.status === 409) {
            this.ouvrirWarningModal(
              "Impossible de s'inscrire ",
              "Vous etes déja inscrit !"
            );
          } else {
            this.ouvrirWarningModal(
              "Erreur",
              "Une erreur est survenue"
            );
          }
          this.cdr.detectChanges();
        }); 
      }
    });
  }

  showWarningModal = false;
  modalTitle = '';
  modalMessage = '';
  ouvrirWarningModal(titre:string,message:string):void{
    this.modalTitle=titre;
    this.modalMessage=message;
    this.showWarningModal=true;
    this.cdr.detectChanges();
  }
  fermerWarning():void{
    this.showWarningModal=false;
  }
}
