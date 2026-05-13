import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FinancierSidebar } from '../../app-sidebar/financier-sidebar/financier-sidebar';
import { AppHeader } from '../../app-header/app-header';
import { CommonModule } from '@angular/common';
import { SidebarService } from '../../../services/sidebar.service';

@Component({
  selector: 'app-financier-layout',
  imports: [RouterOutlet,FinancierSidebar,AppHeader,CommonModule],
  templateUrl: './financier-layout.html',
  styleUrl: './financier-layout.css',
})
export class FinancierLayout {
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
