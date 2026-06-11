import { Component } from '@angular/core';
import { Dropdown } from '../../ui/dropdown/dropdown';
import { DropdownItem } from '../../ui/dropdown/dropdown-item/dropdown-item/dropdown-item';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-notification-dropdown',
  imports: [CommonModule,RouterModule,Dropdown,DropdownItem],
  templateUrl: './notification-dropdown.html',
  styleUrl: './notification-dropdown.css',
})
export class NotificationDropdown {
  isOpen = false;
  notifying = true;

  toggleDropdown() {
    this.isOpen = !this.isOpen;
    this.notifying = false;
  }

  closeDropdown() {
    this.isOpen = false;
  }
}
