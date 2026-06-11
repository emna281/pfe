import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { UserInfoCard } from '../user-profile/user-info-card/user-info-card';
import { UserSecurityCard } from '../user-profile/user-security-card/user-security-card';
import { UserProfileBanner } from '../user-profile/user-profile-banner/user-profile-banner';
import { UserProfessionalCard } from '../user-profile/user-professional-card/user-professional-card';

@Component({
  selector: 'app-apprenant-parametres',
  imports: [CommonModule,UserInfoCard,UserSecurityCard,UserProfileBanner,UserProfessionalCard],
  templateUrl: './apprenant-parametres.html',
  styleUrl: './apprenant-parametres.css',
})
export class ApprenantParametres {
  @Input() user!: any;
}
