import { Component } from '@angular/core';
import { PageBreadcrumbComponents } from '../../../shared/components/ui/page-breadcrumb.components/page-breadcrumb.components';
import { UserMetaCard } from '../../../shared/components/ui/user-profile/user-meta-card/user-meta-card';
import { UserInfoCard } from '../../../shared/components/ui/user-profile/user-info-card/user-info-card';
import { UserAdressCard } from '../../../shared/components/ui/user-profile/user-adress-card/user-adress-card';
import { AuthResponse, AuthService, BaseUser } from '../../../shared/services/auth.service';

import { CommonModule } from '@angular/common';
import { UtilisateurService } from '../../../services/utilisateur-service';
import { UserSecurityCard } from '../../../shared/components/ui/user-profile/user-security-card/user-security-card';


@Component({
  selector: 'app-profil.component',
  imports: [PageBreadcrumbComponents,UserMetaCard,UserInfoCard,UserAdressCard,CommonModule,ProfilComponent,UserSecurityCard],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css',
})
export class ProfilComponent {
  currentUser:AuthResponse|null=null;
  userDetails:BaseUser|null=null;
  constructor(private authService:AuthService,private utilisateurService:UtilisateurService){}
  ngOnInit():void{
      this.currentUser=this.authService.getUser();
      this.utilisateurService.getMonProfil().subscribe(user=>{
        this.userDetails=user
      })
      
    }
}
