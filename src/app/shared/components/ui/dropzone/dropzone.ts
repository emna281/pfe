import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { ComponentCard } from '../component-card/component-card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dropzone',
  imports: [ComponentCard,CommonModule],
  standalone: true,
  templateUrl: './dropzone.html',
  styleUrl: './dropzone.css',
})
export class Dropzone {
  isDragActive = false;

  @Output() filesDropped = new EventEmitter<File[]>();
  @Output() fileSelected = new EventEmitter<File>();
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      const files = Array.from(input.files);
      this.filesDropped.emit(files);
      this.fileSelected.emit(files[0]);
    }
  }

  @HostListener('dragover', ['$event'])
  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragActive = true;
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDragActive = false;
  }

  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragActive = false;
    if (event.dataTransfer && event.dataTransfer.files.length) {
      const files = Array.from(event.dataTransfer.files).filter(file =>
        ['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml',, 'application/pdf'].includes(file.type)
      );
      this.filesDropped.emit(files);
      if (files.length > 0) this.fileSelected.emit(files[0]);
    }
  }

}
