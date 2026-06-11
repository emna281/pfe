import { CommonModule } from '@angular/common';
import { Component,ChangeDetectorRef,QueryList,ViewChildren,ElementRef } from '@angular/core';
import { RouterModule, Router,NavigationEnd } from '@angular/router';
import { SidebarService } from '../../../services/sidebar.service';
import { Subscription ,combineLatest} from 'rxjs';
import { SafeHtmlPipe } from '../../../pipe/safe-html.pipe';
import { isPlatformBrowser } from '@angular/common';
import { Inject,PLATFORM_ID } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { 
  LucideAngularModule, 
  LayoutDashboard, 
  Users, 
  User,
  GraduationCap, 
  CalendarDays, 
  ClipboardList, 
  LogOut, 
  BookOpen, 
  Settings ,
  Calendar,FileText
} from 'lucide-angular';
type NavItem = {
  name: string;
  icon: any;

  path?: string;
  new?: boolean;
  subItems?: { name: string; path: string;icon?: string;  pro?: boolean; new?: boolean }[];
};

@Component({
  selector: 'app-planificateur-sidebar',
  imports: [CommonModule,RouterModule,LucideAngularModule],
  templateUrl: './planificateur-sidebar.html',
  styleUrl: './planificateur-sidebar.css',
})
export class PlanificateurSidebar {
  readonly LayoutDashboard = LayoutDashboard;
  readonly Users = Users;
  readonly BookOpen = BookOpen;
  readonly Settings = Settings;
  readonly GraduationCap = GraduationCap;
  readonly CalendarDays = CalendarDays;
  readonly ClipboardList = ClipboardList;
  readonly LogOut = LogOut;
  readonly Calendar = Calendar;
  readonly FileText = FileText;
  navItems: NavItem[] = [
    {
      name: 'Dashboard',
      icon: LayoutDashboard,
      subItems: [
       // { name: 'Vue générale', path: '/admin/dashboard', icon: 'bar-chart-2' },
      ]
    },
    {
      name: "Pedagogique",
      icon: BookOpen,
      subItems: [
        { name: "Formation", path: "/planificateur/formation", pro: false, icon:'graduation-cap'},
        { name: "Session", path: "/planificateur/session", pro: false ,    icon: 'calendar-days'},
        { name: "Competence", path: "/planificateur/competence", pro: false },
        
      ],
    },
    {
      name:"Demandes",
      icon:FileText,
      path: "/planificateur/demandeInscription",
    },
    {
        name:"Salle",
        icon:User,
        path:"/planificateur/tableSalle"
        
    },
    {
      name: "Calendrier",
      icon: Calendar,
      subItems: [    
        //{ name: "Calendrier", path: "/admin/calendar", pro: false},
      ],
    },
    {
        name:"Profil",
        icon:User,
        subItems:[
          {name:"Mon Profil",path:"/planificateur/profile"}
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
          setTimeout(() => {
          this.setActiveMenuFromRoute(this.router.url);
          });
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
