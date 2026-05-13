import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageBreadcrumbComponents } from './page-breadcrumb.components';

describe('PageBreadcrumbComponents', () => {
  let component: PageBreadcrumbComponents;
  let fixture: ComponentFixture<PageBreadcrumbComponents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageBreadcrumbComponents]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageBreadcrumbComponents);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
