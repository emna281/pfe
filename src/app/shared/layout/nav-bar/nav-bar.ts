import { isPlatformBrowser } from '@angular/common';
import { Component,inject,Inject, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  imports: [],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.css',
})
export class NavBar {
  private platformId =inject(PLATFORM_ID);
  
  activeLink :string= 'home';
  setActive(link: string) :void{
    this.activeLink = link;
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

}
