import { Component } from '@angular/core';
import { PageBreadcrumbComponents } from '../../../shared/components/ui/page-breadcrumb.components/page-breadcrumb.components';
import { UserMetaCard } from '../../../shared/components/ui/user-profile/user-meta-card/user-meta-card';
import { UserInfoCard } from '../../../shared/components/ui/user-profile/user-info-card/user-info-card';
import { UserAdressCard } from '../../../shared/components/ui/user-profile/user-adress-card/user-adress-card';
import { CommonModule } from '@angular/common';
import { ProfilComponent } from '../profil.component/profil.component';
import { UserSecurityCard } from '../../../shared/components/ui/user-profile/user-security-card/user-security-card';
import { AuthResponse, AuthService, BaseUser } from '../../../shared/services/auth.service';
import { UtilisateurService } from '../../../services/utilisateur-service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile-admin',
  imports: [PageBreadcrumbComponents,UserMetaCard,UserInfoCard,UserAdressCard,CommonModule,ProfilComponent],
  templateUrl: './profile-admin.html',
  styleUrl: './profile-admin.css',
})
export class ProfileAdmin {
  currentUser:AuthResponse|null=null;
    userDetails:BaseUser|null=null;
    notFound: boolean = false;
    constructor(private authService:AuthService,private utilisateurService:UtilisateurService,private route:ActivatedRoute){}
    
  ngOnInit(): void {
    const id = this.route.snapshot.queryParamMap.get('id'); 
    console.log('id reçu:', id);

    if (id) {
      this.utilisateurService.getById(id).subscribe({
        next: (user) => {
          this.userDetails = user;
        },
        error: (err) => {
  console.log('Status:', err.status);
  console.log('Message:', err.message);
  console.log('Error:', err.error);
  this.notFound = true;
}
      });
    } else {
      this.notFound = true;
    }
  }
}
