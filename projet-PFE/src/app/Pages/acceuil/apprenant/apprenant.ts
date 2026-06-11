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
  errorLoadingSessions:boolean=false
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
        this.errorLoadingSessions = true;
        this.sessions = this.getFallbackSessions();
        this.loading=false;
        this.cdr.detectChanges();
      }
    })
  }
  getFallbackSessions(): SessionDTO[] {
    return [
      {
        id: 1,
        code: 'S001',
        nom: 'Développement Web Angular',
        dateDebut: '2026-06-10',
        dateFin: '2026-07-15',
        heureDebut: '09:00',
        heureFin: '16:00',
        placesMax: 20,
        placesRestantes: 8,
        statut: 'PLANIFIEE',
        mode: 'Présentiel',
        lieu: 'Ecole FIRSTCODE',
        lienVisio: '',
        materielRequis: 'Ordinateur portable',
        formationCode: 'F-Angular',
        formationNom: 'Angular Avancé',
        formateurId: 101,
        formateurNom: 'M. Dupont',
        salleCode: 12,
        salleNom: 'Salle 3',
        inscriptionIds: [],
        nombrePresences: 0,
        factureIds: [],
        chargeIds: []
      },
      {
        id: 2,
        code: 'S002',
        nom: 'Design UI/UX',
        dateDebut: '2026-07-20',
        dateFin: '2026-08-18',
        heureDebut: '10:00',
        heureFin: '17:00',
        placesMax: 18,
        placesRestantes: 5,
        statut: 'OUVERTE',
        mode: 'En ligne',
        lieu: 'Webinaire',
        lienVisio: 'https://meet.example.com/uiux',
        materielRequis: 'Casque audio',
        formationCode: 'F-UX',
        formationNom: 'UI/UX Design',
        formateurId: 102,
        formateurNom: 'Mme Martin',
        salleCode: 0,
        salleNom: '',
        inscriptionIds: [],
        nombrePresences: 0,
        factureIds: [],
        chargeIds: []
      }
    ];
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
