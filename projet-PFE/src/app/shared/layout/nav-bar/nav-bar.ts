import { isPlatformBrowser } from '@angular/common';
import { Component, inject, PLATFORM_ID, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

/**
 * Navigation Link Interface
 */
export interface NavLink {
  id: string;
  label: string;
  route?: string;
  isButton?: boolean;
}

/**
 * NavBar Component
 *
 * Responsive navigation bar with:
 * - Logo and branding
 * - Menu links with active state tracking
 * - Mobile hamburger menu
 * - Authentication button
 * - Dark mode support
 * - Smooth animations
 */
@Component({
  selector: 'app-nav-bar',
  imports: [CommonModule, RouterLink],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.css',
  standalone: true,
})
export class NavBar {
  @ViewChild('mobileMenu') mobileMenu?: ElementRef;

  private platformId = inject(PLATFORM_ID);
  activeLink: string = 'home';
  isMobileMenuOpen = false;
  isScrolled = false;

  /**
   * Navigation links configuration
   */
  navLinks: NavLink[] = [
    { id: 'home', label: 'Acceuil', route: '/' },
    { id: 'formations', label: 'Formations', route: '/formations' },
    { id: 'calendrier', label: 'Calendrier', route: '/calendrier' },
    { id: 'offres', label: 'Offres Emplois', route: '/offres' },
    { id: 'nouveaute', label: 'Nouveauté', route: '/nouveaute' },
    { id: 'contact', label: 'Contact', route: '/contact' },
  ];

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      window.addEventListener('scroll', () => this.handleScroll());
    }
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initNavActive();
    }
  }

  /**
   * Set active navigation link
   */
  setActive(linkId: string): void {
    this.activeLink = linkId;
    this.closeMobileMenu();
  }

  /**
   * Toggle mobile menu visibility
   */
  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  /**
   * Close mobile menu
   */
  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
  }

  /**
   * Handle scroll event for navbar effects
   */
  private handleScroll(): void {
    const scrollPosition = window.scrollY;
    this.isScrolled = scrollPosition > 10;
  }

  /**
   * Initialize navigation link event listeners
   */
  private initNavActive(): void {
    const links = document.querySelectorAll('.nav-link');
    links.forEach((link) => {
      link.addEventListener('click', (event: Event) => {
        event.preventDefault();
        const clickedLink = link as HTMLElement;
        const linkId = clickedLink.getAttribute('data-link-id') || 'home';
        this.setActive(linkId);
        this.updateActiveLink(clickedLink);
      });
    });
  }

  /**
   * Update active link styling
   */
  private updateActiveLink(clickedLink: HTMLElement): void {
    const links = document.querySelectorAll('.nav-link');
    links.forEach((link) => {
      link.classList.remove('active');
    });
    clickedLink.classList.add('active');
  }
}
