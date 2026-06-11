import { CommonModule,isPlatformBrowser } from '@angular/common';
import { Component ,Input,Output,EventEmitter,ElementRef, HostListener, PLATFORM_ID, Inject } from '@angular/core';

@Component({
  selector: 'app-modal',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './modal.html',
  styleUrl: './modal.css',
})
export class Modal {
  @Input() isOpen=false;
  @Output() close = new EventEmitter<void>();
  @Input() className='';
  @Input() showCloseButton =true;
  @Input() isFullscreen = false;
  private isBrowser: boolean;
  constructor(private el :ElementRef,@Inject(PLATFORM_ID) platformId: Object){this.isBrowser = isPlatformBrowser(platformId);}
  ngOnInit(){
    if(this.isBrowser && this.isOpen){
      document.body.style.overflow='hidden';
    }
  }
  ngOnDestroy(){
    if (this.isBrowser) {   
    document.body.style.overflow='unset';
    }
  }
  ngOnChanges(){
    if (this.isBrowser) {  
    document.body.style.overflow=this.isOpen? 'hidden' : 'unset';
    }
  }
  onBackdropClick(event:MouseEvent){
    if(!this.isFullscreen){
      this.close.emit();
    }
  }
  onContentClick(event:MouseEvent){
    event.stopPropagation();
  }
  @HostListener('document:keydown.escape')
  onEscape(){
    if(this.isOpen){
      this.close.emit();
    }
  }
}
 