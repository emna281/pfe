import { Component } from '@angular/core';
import { Dropdown } from '../../ui/dropdown/dropdown';
import { DropdownItem } from '../../ui/dropdown/dropdown-item/dropdown-item/dropdown-item';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NotificationDTO, NotificationService } from '../../../../services/notification-service';
import { Subject, takeUntil } from 'rxjs';
import { LucideAngularModule } from 'lucide-angular';
@Component({
  selector: 'app-notification-dropdown',
  imports: [CommonModule,RouterModule,Dropdown,DropdownItem,LucideAngularModule],
  templateUrl: './notification-dropdown.html',
  styleUrl: './notification-dropdown.css',
})
export class NotificationDropdown {
  isOpen = false;
  notifications:NotificationDTO[]=[];
  private destroy$ = new Subject<void>();
  private interval$:any;
  get notifying():boolean{
    return this.notifications.some(n=> !n.lu);
  }
  get nonLues(): number {
    return this.notifications.filter(n => !n.lu).length;
  }
  constructor(private notificationService: NotificationService) {}
  ngOnInit():void{
    this.charger();
    this.interval$ = setInterval(() => this.charger(),30000);
  }
  charger():void{
    this.notificationService.getNotifications().pipe(takeUntil(this.destroy$))
    .subscribe({
      next:(data)=>this.notifications=data,
      error:(err) => console.error('erreur notifications',err)
    })
  }
  toggleDropdown() :void{
    this.isOpen = !this.isOpen;
  }

  closeDropdown():void {
    this.isOpen = false;
  }
  marquerLu(id: number): void {
    this.notificationService.marquerCommeLu(id).subscribe({
      next: () => {
        const n = this.notifications.find(n => n.id === id);
        if (n) n.lu = true;
      }
    });
  }

  marquerToutLu(): void {
    this.notificationService.marquerToutCommeLu().subscribe({
      next: () => this.notifications.forEach(n => n.lu = true)
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    clearInterval(this.interval$);
  }
}
