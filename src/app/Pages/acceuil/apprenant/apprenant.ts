import { ChangeDetectorRef, Component ,PLATFORM_ID, inject} from '@angular/core';

import {  isPlatformBrowser, NgClass } from '@angular/common'; 
import { Router, RouterModule } from '@angular/router';
import { SessionDTO ,SessionService} from '../../../services/session-service';

import { ConfirmationModal } from '../../../shared/components/ui/confirmation-modal/confirmation-modal';
import { AuthService } from '../../../shared/services/auth.service';

import { NavBar } from '../../../shared/layout/nav-bar/nav-bar';
import { SignupFormAccueil } from '../../../shared/components/formulaires/signup-form-accueil/signup-form-accueil';


@Component({
  selector: 'app-apprenant',
  standalone: true,
  imports: [NgClass,RouterModule,SignupFormAccueil ,ConfirmationModal,NavBar],
  templateUrl: './apprenant.html',
  styleUrls: ['./apprenant.css'],
  host: { ngSkipHydration: 'true' }
})
export class Apprenant {
  sessions:SessionDTO[]=[]
  loading:boolean=false
  isFormulaireOpen:boolean=false
  selectedSession:SessionDTO | null = null
  private platformId = inject(PLATFORM_ID);
  constructor(private sessionService:SessionService,private cdr:ChangeDetectorRef, private router:Router,private authService:AuthService){}

  ngOnInit():void{
    if (isPlatformBrowser(this.platformId)) {  
    this.loadSessions();
    }
  }
  loadSessions():void{
    this.loading=true;
    this.sessionService.getAllSession().subscribe({
      next:(data)=>{
        this.sessions=data;
        this.loading=false;
        this.cdr.detectChanges();
      },
      error:(err)=>{
        console.error('erreur chargement sessions:',err);
        this.loading=false;
      }
    })
  }
  openFormulaire(session:SessionDTO){
    this.selectedSession=session
    this.isFormulaireOpen=true
  }

  fermerFormulaire(session:SessionDTO){
    this.selectedSession=null
    this.isFormulaireOpen=false
  }





  showLoginModal = false;
  private sessionSelectionnee: any = null;

  handleInscription(session: any): void {
    const estConnecte = this.authService.isLoggedIn(); 
    console.log('estConnecte:', estConnecte);
    console.log('token:', this.authService.getToken());
    if (estConnecte) {
      this.router.navigate(['/inscription', session.id]);
    } else {
      this.sessionSelectionnee = session;
      this.showLoginModal = true;
    }
  }

  onConfirmerConnexion(): void {
    this.showLoginModal = false;
    // Redirige vers /signin avec retour prévu après connexion
    this.router.navigate(['/signin'], {
      queryParams: { returnUrl: `/inscription/${this.sessionSelectionnee?.id}` }
    });
  }

  currentIndex = 1;
getOffset(): number {
  const slideWidth = 100 / 3;
  const offset = (this.currentIndex - 1) * slideWidth;
  const min = 0;
  const max = (this.sessions.length - 3) * slideWidth;
  
  return Math.max(min, Math.min(max, offset));
}
next(): void {
  this.currentIndex = (this.currentIndex + 1) % this.sessions.length;
}

prev(): void {
  this.currentIndex = (this.currentIndex - 1 + this.sessions.length) % this.sessions.length;
}

goTo(index: number): void {
  this.currentIndex = index;
}

scrollToContact(): void {
  const el = document.getElementById('contact');
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
 
}
