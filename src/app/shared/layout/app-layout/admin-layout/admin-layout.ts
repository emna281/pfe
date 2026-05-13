import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdminSidebar } from '../../app-sidebar/admin-sidebar/admin-sidebar';
import { CommonModule } from '@angular/common';
import { AppHeader } from '../../app-header/app-header';
import { SidebarService } from '../../../services/sidebar.service';

@Component({
  selector: 'app-admin-layout',
  imports: [RouterOutlet,AdminSidebar,CommonModule,AppHeader],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.css',
})
export class AdminLayout {
  readonly isExpanded$;
    readonly isHovered$;
    readonly isMobileOpen$;
  
    constructor(public sidebarService: SidebarService) {
      this.isExpanded$ = this.sidebarService.isExpanded$;
      this.isHovered$ = this.sidebarService.isHovered$;
      this.isMobileOpen$ = this.sidebarService.isMobileOpen$;
    }
  
    get containerClasses() {
      return [
        'flex-1',
        'transition-all',
        'duration-300',
        'ease-in-out',
        (this.isExpanded$ || this.isHovered$) ? 'xl:ml-[290px]' : 'xl:ml-[90px]',
        this.isMobileOpen$ ? 'ml-0' : ''
      ];
    }

}
