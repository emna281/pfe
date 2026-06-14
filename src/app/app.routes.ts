import { RouterModule, Routes } from '@angular/router';
import { Formation } from './Pages/programme/formation/formation';
import { Session } from './Pages/programme/session/session';
import { Competence } from './Pages/programme/competence/competence';
import { AppLayout } from './shared/layout/app-layout/app-layout';
import { Facture } from './Pages/finance/facture/facture';
import { Apprenant } from './Pages/acceuil/apprenant/apprenant';
import { FormulaireInscription } from './shared/components/formulaires/formulaire-inscription/formulaire-inscription'; 
import { TableDemandesInscriptions } from './shared/components/tables/table-demandes-inscriptions/table-demandes-inscriptions';
import { DetailFormation } from './shared/components/detail-formation/detail-formation';
import { DetailSession } from './shared/components/detail-session/detail-session';
import { FormateurPresence } from './Pages/Formateur/formateur-presence/formateur-presence';
import { SigninForm } from './shared/components/formulaires/signin-form/signin-form';
import { SignupForm } from './shared/components/formulaires/signup-form/signup-form';
import { authGuard,adminGuard, planificateurGuard, financierGuard, formateurGuard } from './shared/guards/auth.guard';
import { AdminLayout } from './shared/layout/app-layout/admin-layout/admin-layout';
import { AdminDashboard } from './Pages/admin/admin-dashboard/admin-dashboard';
import { ListeApprenants } from './shared/components/listes/liste-apprenants/liste-apprenants';
import { ListeFormateurs } from './shared/components/listes/liste-formateurs/liste-formateurs';
import { ListeFinanciers } from './shared/components/listes/liste-financiers/liste-financiers';
import { ListePlanificateurs } from './shared/components/listes/liste-planificateurs/liste-planificateurs';
import { ListeManager } from './shared/components/listes/liste-manager/liste-manager';
import { Calender } from './Pages/calender/calender';
import { PlanificateurLayout } from './shared/layout/app-layout/planificateur-layout/planificateur-layout';
import { PlanificateurDashboard } from './Pages/Planificateur/planificateur-dashboard/planificateur-dashboard';
import { FinancierDashboard } from './Pages/finance/financier-dashboard/financier-dashboard';
import { FinancierLayout } from './shared/layout/app-layout/financier-layout/financier-layout';
import { CreerFacture } from './shared/components/formulaires/creer-facture/creer-facture';
import { DatailFacture } from './shared/components/datail-facture/datail-facture';
import { ProfilComponent } from './Pages/Profiles/profil.component/profil.component';
import { ProfileAdmin } from './Pages/Profiles/profile-admin/profile-admin';
import { Component } from 'lucide-angular';
import { ApprenantLayout } from './shared/layout/app-layout/apprenant-layout/apprenant-layout';
import { ProfilApprenant } from './Pages/Profiles/profil-apprenant/profil-apprenant';
import { FormateurLayout } from './shared/layout/app-layout/formateur-layout/formateur-layout';

import { ProfilFormateur } from './Pages/Profiles/profil-formateur/profil-formateur';
import { FinancierApprenants } from './Pages/finance/financier-apprenants/financier-apprenants';
import { Rappel } from './Pages/finance/rappel/rappel';
import { ListeCharge } from './shared/components/listes/liste-charge/liste-charge';

import { Salle } from './Pages/programme/salle/salle';
import path from 'path';
import { CandidaturesList } from './shared/components/reutilisable/candidatures/candidatures-list/candidatures-list';
import { ParametresSysteme } from './shared/components/parametres-systeme/parametres-systeme';
export const routes: Routes = [
     { path: 'inscription/:sessionId', component: FormulaireInscription },
    { path:'apprenant',component : Apprenant},
    { path:'signin',component : SigninForm},
    { path:'signup',component : SignupForm},
    { 
        path: 'app',
        component:AppLayout,
        canActivate: [authGuard],
        children:[
            {
                path:'formation',
                component:Formation,
                title:'Angular  Tables formation '

            },
            {
                path:'session',
                component:Session,
                title:'Angular  Tables session '

            },
            {
                path:'competence',
                component:Competence,
                title:'Angular  Tables competence '

            },
            {
                path:'facture',
                component:Facture,
                title:'Angular  Tables facture '

            },
            
            {
                path:'demandeInscription',
                component:TableDemandesInscriptions,
                title:'Interface de admin'

            },
            {
                path:'detailFormation/:id',
                component:DetailFormation,
                title:'Interface de admin'

            },
            {
                path:'detailSession/:id',
                component:DetailSession,
                title:'Interface de admin'

            },
            {
                path:'formateurPresence/:id',
                component:FormateurPresence,
                title:'Interface de admin'

            }
        ]    
    },
    { 
        path: 'planificateur',
        component:PlanificateurLayout,
        canActivate: [planificateurGuard],
        children:[
            { path: 'planificateurDashboard',     component: PlanificateurDashboard,             title: 'Dashboard' },
            { path: 'formation',          component: Formation,                  title: 'Formations' },      
            { path: 'session',            component: Session,                    title: 'Sessions' },        
            { path: 'competence',         component: Competence,                 title: 'Compétences' },    
            { path: 'demandeInscription', component: TableDemandesInscriptions,  title: 'Inscriptions' }, 
            { path: 'detailFormation/:id',component: DetailFormation },                                    
            { path: 'detailSession/:id',  component: DetailSession },                                        
            { path: '',                   redirectTo: 'planificateurDashboard', pathMatch: 'full' },
            { path:'formateurPresence/:id', component:FormateurPresence,title:'Interface de admin'},
            { path:'profile', component:ProfilComponent},
            { path:'tableSalle',component:Salle},
            { path:'candidaturesList',component:CandidaturesList},
            { path: 'calendar',  component: Calender },
        ]
    },
    { 
        path: 'financier',
        component:FinancierLayout,
        canActivate: [financierGuard],
        children:[
            { path: 'financierDashboard',     component: FinancierDashboard,             title: 'Dashboard' },
            { path: 'facture',          component: Facture,                  title: 'Factures' },      
            { path: 'creerFacture',component:CreerFacture},
            { path: 'detailFacture/:id',  component: DatailFacture }, 
            { path: '',                   redirectTo: 'financierDashboard', pathMatch: 'full' },
            { path:'profile', component:ProfilComponent},
            { path:'FinancierApprenants',component:FinancierApprenants},
            { path:'rappel',component:Rappel},
            { path: 'demandeInscription', component: TableDemandesInscriptions,  title: 'Inscriptions' },
            { path:'ListeCharge', component:ListeCharge} ,
            { path: 'calendar',  component: Calender },
        ]
    },
    { 
        path: 'admin',
        component:AdminLayout,
        canActivate: [adminGuard],
        children:[
            { path: 'adminDashboard',     component: AdminDashboard,             title: 'Dashboard' },
            { path: 'formation',          component: Formation,                  title: 'Formations' },      
            { path: 'session',            component: Session,                    title: 'Sessions' },        
            { path: 'competence',         component: Competence,                 title: 'Compétences' },    
            
            { path: 'detailFormation/:id',component: DetailFormation },                                    
            { path: 'detailSession/:id',  component: DetailSession },                                        
            { path: '',                   redirectTo: 'adminDashboard', pathMatch: 'full' },
            { path: 'listeApprenants',  component: ListeApprenants },
            { path: 'listeFormateurs',  component: ListeFormateurs },
            { path: 'listeFinanciers',  component: ListeFinanciers },
            { path: 'listePlanificateurs',  component: ListePlanificateurs },
            { path: 'listeManager',  component: ListeManager },
            { path: 'calendar',  component: Calender },
            { path:'profileAdmin', component:ProfileAdmin},
            { path:'parametresSysteme', component:ParametresSysteme}
        ]
    },
    {
        path:'espace-apprenant',
        component:ApprenantLayout,
        canActivate: [authGuard],
        children:[
            //{ path: 'accueil',          component: ApprenantAccueil },
            //{ path: 'nouveautes',       component: ApprenantNouveautes },
            //{ path: 'contact',          component: ApprenantContact },
            { path:'profilApprenant',component:ProfilApprenant},
            
        ]
    },
    {
        path:'formateur',
        component:FormateurLayout,
        canActivate:[formateurGuard],
        children:[
            { path: 'profilFormateur', component: ProfilFormateur },
            //{ path: 'dashboard',   component: FormateurDashboard },
            //{ path: 'sessions',    component: FormateurSessions },
            //{ path: '',            redirectTo: 'dashboard', pathMatch: 'full' }
        ]
    },
    { path: '', redirectTo: 'apprenant', pathMatch: 'full' },
    { path: 'calendar',  component: Calender },
];

