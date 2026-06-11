import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, Inject, PLATFORM_ID, QueryList, ViewChildren } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { LucideAngularModule ,ReceiptText,Send,ChartColumn,LayoutDashboard, User,Users} from 'lucide-angular';
import { combineLatest, Subscription } from 'rxjs';
import { SidebarService } from '../../../services/sidebar.service';
import { AuthService } from '../../../services/auth.service';
type NavItem = {
  name: string;
  icon: any;

  path?: string;
  new?: boolean;
  subItems?: { name: string; path: string;icon?: string;  pro?: boolean; new?: boolean }[];
};
@Component({
  selector: 'app-financier-sidebar',
  imports: [LucideAngularModule,CommonModule,RouterModule],
  templateUrl: './financier-sidebar.html',
  styleUrl: './financier-sidebar.css',
})
export class FinancierSidebar {
  readonly LayoutDashboard = LayoutDashboard;
  readonly ReceiptText= ReceiptText;
  readonly Send= Send;
  readonly ChartColumn= ChartColumn;
  readonly Users=Users;
  readonly User=User;
    navItems: NavItem[] = [
      {
        name: 'Dashboard',
        icon: LayoutDashboard,
        subItems: [
          { name: 'Vue générale', path: '/financier/financierDashboard', icon: 'bar-chart-2' },
        ]
      },
      {
        name: "Factures",
        icon: ReceiptText,
        subItems: [
          { name: "Facture", path: "/financier/facture", pro: false},         
        ],
      },
      {
        name: "Charges",
        icon: ReceiptText,
        subItems: [
          { name: "Charge générale", path: "/financier/ListeCharge", pro: false},         
        ],
      },
      {
        name: "Rappels",
        icon: Send,
        path:"/financier/rappel"
      },

      {
        name:"Apprenants",
        icon:Users,
        path:"/financier/FinancierApprenants"
      },
      {
        name:"Profil",
        icon:User,
        subItems:[
          {name:"Mon Profil",path:"/financier/profile"}
        ]
      },
      

      
    ]
    openSubmenu: string | null | number = null;
    subMenuHeights: { [key: string]: number } = {};
    
    @ViewChildren('subMenu') subMenuRefs!: QueryList<ElementRef>;
    readonly isExpanded$;
    readonly isMobileOpen$;
    readonly isHovered$;
  
    private subscription: Subscription = new Subscription();
    constructor(
      public sidebarService: SidebarService,
      private authService:AuthService,
      private router: Router,
      private cdr: ChangeDetectorRef,
      @Inject(PLATFORM_ID) private platformId: Object
    ) {
      this.isExpanded$ = this.sidebarService.isExpanded$;
      this.isMobileOpen$ = this.sidebarService.isMobileOpen$;
      this.isHovered$ = this.sidebarService.isHovered$;
    }
  
    ngOnInit() {
  
      this.subscription.add(
        this.router.events.subscribe(event => {
          if (event instanceof NavigationEnd) {
            this.setActiveMenuFromRoute(this.router.url);
          }
        })
      );
      this.subscription.add(
        combineLatest([this.isExpanded$, this.isMobileOpen$, this.isHovered$]).subscribe(
          ([isExpanded, isMobileOpen, isHovered]) => {
            if (!isExpanded && !isMobileOpen && !isHovered) {
              this.cdr.detectChanges();
            } else {
            }
          }
        )
      );
  
      // Initial load
      this.setActiveMenuFromRoute(this.router.url);
    }
    private setActiveMenuFromRoute(currentUrl: string) {
      const menuGroups = [
        { items: this.navItems, prefix: 'main' },
        /*{ items: this.othersItems, prefix: 'others' },*/
      ];
  
      menuGroups.forEach(group => {
        group.items.forEach((nav, i) => {
          if (nav.subItems) {
            nav.subItems.forEach(subItem => {
              if (currentUrl === subItem.path) {
                const key = `${group.prefix}-${i}`;
                this.openSubmenu = key;
                if (isPlatformBrowser(this.platformId)) {
                  setTimeout(() => {
                    const el = document.getElementById(key);
                    if (el) {
                      this.subMenuHeights[key] = el.scrollHeight;
                      this.cdr.detectChanges(); // Ensure UI updates
                    }
                  });
                }
              }
            });
          }
        });
      });
    }
  
    ngOnDestroy() {
      // Clean up subscriptions
      this.subscription.unsubscribe();
    }
  
    isActive(path: string): boolean {
      return this.router.url === path;
    }
  
    toggleSubmenu(section: string, index: number) {
      const key = `${section}-${index}`;
  
      if (this.openSubmenu === key) {
        this.openSubmenu = null;
        this.subMenuHeights[key] = 0;
      } else {
        this.openSubmenu = key;
        if (isPlatformBrowser(this.platformId)) {
          setTimeout(() => {
            const el = document.getElementById(key);
            if (el) {
              this.subMenuHeights[key] = el.scrollHeight;
              this.cdr.detectChanges(); // Ensure UI updates
            }
          });
        }
      }
    }
  
    onSidebarMouseEnter() {
      this.isExpanded$.subscribe(expanded => {
        if (!expanded) {
          this.sidebarService.setHovered(true);
        }
      }).unsubscribe();
    }
  
    
    
  
    onSubmenuClick() {
      console.log('click submenu');
      this.isMobileOpen$.subscribe(isMobile => {
        if (isMobile) {
          this.sidebarService.setMobileOpen(false);
        }
      }).unsubscribe();
    } 
    
    logout(): void {
      this.authService.logout();
    }
  
    get nomUtilisateur(): string {
      return this.authService.getUser()?.nom ?? '';
    }
  
    get role(): string {
      return this.authService.getUser()?.role ?? '';
    }
  
    get initiales(): string {
      const user = this.authService.getUser();
      if (!user) return '';
      return `${user.nom.charAt(0)}${user.prenom.charAt(0)}`.toUpperCase();
    }

}
