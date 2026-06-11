import { CommonModule } from '@angular/common';
import { Component,Input,Output,EventEmitter,ElementRef,ViewChild,ContentChild,TemplateRef ,HostListener} from '@angular/core';

@Component({
  selector: 'app-menu-deroulant',
  imports: [CommonModule],
  templateUrl: './menu-deroulant.html',
  styleUrl: './menu-deroulant.css',
})
export class MenuDeroulant {
  @Input() isOpen = false;
  @Output() isOpenChange = new EventEmitter<boolean>();
  @Output() close = new EventEmitter<void>();
  @Input() className = '';

  @ViewChild('dropdownRef') dropdownRef!: ElementRef<HTMLDivElement>;
  @HostListener('document:mousedown', ['$event'])
  private handleClickOutside = (event: MouseEvent) => {
    
    if (
      this.isOpen &&
      this.dropdownRef &&
      this.dropdownRef.nativeElement &&
      !this.dropdownRef.nativeElement.contains(event.target as Node) &&
      !(event.target as HTMLElement).closest('.dropdown-toggle')
    ) {
     
      this.isOpen = false; // fermeture immédiate
      this.isOpenChange.emit(this.isOpen);
      this.close.emit();
    }
  };

 

  @ContentChild('dropdownButton') buttonTemplate!: TemplateRef<any>;
  @ContentChild('dropdownContent') contentTemplate!: TemplateRef<any>;
  
  
  
  toggleMenu() {
    this.isOpen = !this.isOpen;
    this.isOpenChange.emit(this.isOpen);
    if (!this.isOpen) {
      this.close.emit();
    }
  }
  
}
