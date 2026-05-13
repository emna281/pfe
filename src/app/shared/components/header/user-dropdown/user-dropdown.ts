import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DropdownItemTwoComponent } from '../../ui/dropdown/dropdown-item/dropdown-item.component-two';
import { Dropdown } from '../../ui/dropdown/dropdown';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-user-dropdown',
  imports: [CommonModule,RouterModule,DropdownItemTwoComponent,Dropdown],
  templateUrl: './user-dropdown.html',
  styleUrl: './user-dropdown.css',
})
export class UserDropdown {
  isOpen = false;
  constructor(private authService:AuthService){}

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  closeDropdown() {
    this.isOpen = false;
  }
  onLogout():void{
    this.closeDropdown();
    this.authService.logout();
  }
  get nomComplet():string{
    const user = this.authService.getUser();
    return user? `${user.nom} ${user.prenom}`:'';
  }
  get email():string{
    return this.authService.getUser()?.email ??'';
  }
  get initiales():string{
    const user = this.authService.getUser();
    if(!user ) return '?';
    return `${user.nom.charAt(0)} ${user.prenom.charAt(0)}`.toUpperCase();
  }
  get nom(): string {
  const user = this.authService.getUser();
  return user?.nom ?? '';
}

}
