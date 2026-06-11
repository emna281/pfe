import { CommonModule ,isPlatformBrowser} from '@angular/common';
import { Component , ElementRef, ViewChild,Inject,PLATFORM_ID} from '@angular/core';
import { RouterModule } from '@angular/router';
import { ThemeToggle } from '../../components/ui/theme-toggle/theme-toggle';
import { NotificationDropdown } from '../../components/header/notification-dropdown/notification-dropdown';
import { UserDropdown } from '../../components/header/user-dropdown/user-dropdown';
import { SidebarService } from '../../services/sidebar.service';
@Component({
  selector: 'app-header',
  imports: [CommonModule,RouterModule,ThemeToggle,NotificationDropdown,UserDropdown],
  templateUrl: './app-header.html',
  styleUrl: './app-header.css',
})
export class AppHeader {
  isApplicationMenuOpen = false;
  readonly isMobileOpen$;

  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

  constructor(@Inject(PLATFORM_ID) private platformId: Object,public sidebarService: SidebarService) {
    this.isMobileOpen$ = this.sidebarService.isMobileOpen$;
  }

  handleToggle() {
    if (isPlatformBrowser(this.platformId)) {
      if (window.innerWidth >= 1280) {
        this.sidebarService.toggleExpanded();
      } else {
        this.sidebarService.toggleMobileOpen();
      }
    }
  }

  toggleApplicationMenu() {
    this.isApplicationMenuOpen = !this.isApplicationMenuOpen;
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      document.addEventListener('keydown', this.handleKeyDown);
    }
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      document.removeEventListener('keydown', this.handleKeyDown);
    }
  }

  handleKeyDown = (event: KeyboardEvent) => {
    if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
      event.preventDefault();
      this.searchInput?.nativeElement.focus();
    }
  };

}
