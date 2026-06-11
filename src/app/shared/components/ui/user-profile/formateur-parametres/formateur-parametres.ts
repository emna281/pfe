import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { UserInfoCard } from '../user-info-card/user-info-card';
import { UserAdressCard } from '../user-adress-card/user-adress-card';
import { UserSecurityCard } from '../user-security-card/user-security-card';
import { BaseUser } from '../../../../services/auth.service';
import { UserProfessionalCard } from '../user-professional-card/user-professional-card';

@Component({
  selector: 'app-formateur-parametres',
  imports: [CommonModule,UserInfoCard,UserSecurityCard,UserProfessionalCard],
  templateUrl: './formateur-parametres.html',
  styleUrl: './formateur-parametres.css',
})
export class FormateurParametres {
  @Input() user!: any;
}
