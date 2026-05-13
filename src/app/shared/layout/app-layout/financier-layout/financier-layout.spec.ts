import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancierLayout } from './financier-layout';

describe('FinancierLayout', () => {
  let component: FinancierLayout;
  let fixture: ComponentFixture<FinancierLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinancierLayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinancierLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
