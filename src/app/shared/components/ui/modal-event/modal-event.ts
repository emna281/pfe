import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  PLATFORM_ID
} from '@angular/core';

@Component({
  selector: 'app-modal-event',
  imports: [CommonModule],
  templateUrl: './modal-event.html',
  styleUrl: './modal-event.css',
})
export class ModalEvent implements OnInit, OnDestroy, OnChanges {

  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();
  @Input() className = '';
  @Input() showCloseButton = true;
  @Input() isFullscreen = false;


  private isBrowser: boolean;

  constructor(
    private el: ElementRef,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {}

  ngOnDestroy() {
    if (this.isBrowser) {
      this.document.body.style.overflow = 'unset';
    }
  }

  ngOnChanges() {
    if (this.isBrowser) {
      this.document.body.style.overflow = this.isOpen ? 'hidden' : 'unset';
    }
  }

  onBackdropClick(event: MouseEvent) {
    if (!this.isFullscreen) {
      this.close.emit();
    }
  }

  onContentClick(event: MouseEvent) {
    event.stopPropagation();
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    if (this.isOpen) {
      this.close.emit();
    }
  }
}