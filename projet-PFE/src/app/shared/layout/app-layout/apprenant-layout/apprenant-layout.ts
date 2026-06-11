import { Component } from '@angular/core';
import { NavBar } from '../../nav-bar/nav-bar';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ThemeToggle } from '../../../components/ui/theme-toggle/theme-toggle';
import { NotificationDropdown } from '../../../components/header/notification-dropdown/notification-dropdown';
import { UserDropdown } from '../../../components/header/user-dropdown/user-dropdown';

@Component({
  selector: 'app-apprenant-layout',
  imports: [RouterOutlet,CommonModule,RouterModule,ThemeToggle,NotificationDropdown,UserDropdown],
  templateUrl: './apprenant-layout.html',
  styleUrl: './apprenant-layout.css',
})
export class ApprenantLayout {

}
