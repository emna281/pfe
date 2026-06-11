import { CommonModule, isPlatformBrowser, NgClass } from '@angular/common';
import { Component,EventEmitter,inject,Inject, Input, Output, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
export type NavLink = {
  label: string;
  href?: string;
  routerLink?: string;
  key: string;
  children?: { label: string; href?: string; routerLink?: string }[];
};

@Component({
  selector: 'app-nav-bar',
  imports: [CommonModule,RouterModule,FormsModule],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.css',
  
})
export class NavBar {
  private platformId =inject(PLATFORM_ID);
  @Input() links: NavLink[] = [];
  @Input() showSearch: boolean = true;
  @Output() search = new EventEmitter<string>();
  @Input() showLoginButton: boolean = true;
  activeLink = '';
  searchQuery = '';
  setActive(key: string) {
    this.activeLink = key;
  }
  ngAfterViewInit():void{
    if (isPlatformBrowser(this.platformId)) {
      this.initNavActive();
    }
  }
  initNavActive():void{
    const links= document.querySelectorAll(".nav-link");
    links.forEach((link)=>{
      link.addEventListener('click',(event:Event)=>{
        event.preventDefault();
        this.setActiveLink(link as HTMLElement);
      })
    })
    
  }
  setActiveLink(clickedLink:HTMLElement):void{
    const links= document.querySelectorAll(".nav-link");
    links.forEach((link) => {
      link.classList.remove('active');
    });
    clickedLink.classList.add('active');
  }
  onSearch() {
    this.search.emit(this.searchQuery);
  }
}
