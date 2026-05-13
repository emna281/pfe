import { CommonModule } from '@angular/common';
import { Component,Input,Output,EventEmitter,ElementRef,ViewChild ,AfterViewInit,OnDestroy} from '@angular/core';
import { PLATFORM_ID,Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
@Component({
  selector: 'app-dropdown',
  imports: [CommonModule],
  templateUrl: './dropdown.html',
  styleUrl: './dropdown.css',
})
export class Dropdown {
  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();
  @Input() className = '';

  @ViewChild('dropdownRef') dropdownRef!: ElementRef<HTMLDivElement>;
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  private handleClickOutside = (event: MouseEvent) => {
    if (
      this.isOpen &&
      this.dropdownRef &&
      this.dropdownRef.nativeElement &&
      !this.dropdownRef.nativeElement.contains(event.target as Node) &&
      !(event.target as HTMLElement).closest('.dropdown-toggle')
    ) {
      this.close.emit();
    }
  };

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      document.addEventListener('mousedown', this.handleClickOutside);
    }
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      document.removeEventListener('mousedown', this.handleClickOutside);
    }
  }
}
