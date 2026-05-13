import { Component } from '@angular/core';
import { SidebarService } from '../../../services/sidebar.service';
import { RouterOutlet } from '@angular/router';
import { PlanificateurSidebar } from '../../app-sidebar/planificateur-sidebar/planificateur-sidebar';
import { CommonModule } from '@angular/common';
import { AppHeader } from '../../app-header/app-header';

@Component({
  selector: 'app-planificateur-layout',
  imports: [RouterOutlet,PlanificateurSidebar,CommonModule,AppHeader],
  templateUrl: './planificateur-layout.html',
  styleUrl: './planificateur-layout.css',
})
export class PlanificateurLayout {
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
