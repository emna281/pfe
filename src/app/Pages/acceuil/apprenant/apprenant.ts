import { ChangeDetectorRef, Component ,AfterViewInit,PLATFORM_ID, inject} from '@angular/core';

import {  NgClass,isPlatformBrowser } from '@angular/common'; 
import { Router, RouterModule } from '@angular/router';
import { SessionDTO ,SessionService} from '../../../services/session-service';
import { SignupForm } from '../../../shared/components/formulaires/signup-form/signup-form';
import { ConfirmationModal } from '../../../shared/components/ui/confirmation-modal/confirmation-modal';
import { AuthService } from '../../../shared/services/auth.service';
import { FormulaireSignup } from '../../../shared/components/formulaires/formulaire-signup/formulaire-signup';


@Component({
  selector: 'app-apprenant',
  standalone: true,
  imports: [NgClass,RouterModule,FormulaireSignup ,ConfirmationModal],
  templateUrl: './apprenant.html',
  styleUrls: ['./apprenant.css'],
})
export class Apprenant implements  AfterViewInit{
  sessions:SessionDTO[]=[]
  loading:boolean=false
  isFormulaireOpen:boolean=false
  selectedSession:SessionDTO | null = null
  private platformId = inject(PLATFORM_ID);
  constructor(private sessionService:SessionService,private cdr:ChangeDetectorRef, private router:Router,private authService:AuthService){}

  ngOnInit():void{
    this.loadSessions();
    
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


  activeLink :string= 'home';
  setActive(link: string) :void{
    this.activeLink = link;
  }
  ngAfterViewInit():void{
    if (isPlatformBrowser(this.platformId)) {
      this.initNavActive();
    }
  }
  initNavActive():void{
    const links= document.querySelectorAll(".nav-link");
    links.forEach((link)=>{
      link.addEventListener('click',(event:Event)=>{
        event.preventDefault();
        this.setActiveLink(link as HTMLElement);
      })
    })
    
  }
  setActiveLink(clickedLink:HTMLElement):void{
    const links= document.querySelectorAll(".nav-link");
    links.forEach((link) => {
      link.classList.remove('active');
    });
    clickedLink.classList.add('active');
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

  
 
}
