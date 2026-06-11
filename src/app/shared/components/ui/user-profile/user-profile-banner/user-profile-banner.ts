import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-user-profile-banner',
  imports: [CommonModule],
  templateUrl: './user-profile-banner.html',
  styleUrl: './user-profile-banner.css',
})
export class UserProfileBanner {
  @Input() user!: any;
  @Output() modifier = new EventEmitter<void>();

  getInitiales(): string {
    const p = this.user?.prenom?.[0] ?? '';
    const n = this.user?.nom?.[0] ?? '';
    return (p + n).toUpperCase();
  }

  onModifier(): void {
    this.modifier.emit();
  }
}
