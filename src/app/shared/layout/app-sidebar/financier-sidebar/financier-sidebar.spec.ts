import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancierSidebar } from './financier-sidebar';

describe('FinancierSidebar', () => {
  let component: FinancierSidebar;
  let fixture: ComponentFixture<FinancierSidebar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinancierSidebar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinancierSidebar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
