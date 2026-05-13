import { CommonModule } from '@angular/common';
import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-page-breadcrumb',
  imports: [CommonModule],
  templateUrl: './page-breadcrumb.components.html',
  styleUrl: './page-breadcrumb.components.css',
})
export class PageBreadcrumbComponents {
  @Input() pageTitle = '';
  @Input() pageSubTitle='';
}
