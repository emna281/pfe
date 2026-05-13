import { CommonModule } from '@angular/common';
import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-label',
  imports: [CommonModule],
  templateUrl: './label.html',
  styleUrl: './label.css',
})
export class Label {
  @Input() for?: string;
  @Input() className = '';
}
