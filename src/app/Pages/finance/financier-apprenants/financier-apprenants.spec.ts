import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancierApprenants } from './financier-apprenants';

describe('FinancierApprenants', () => {
  let component: FinancierApprenants;
  let fixture: ComponentFixture<FinancierApprenants>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinancierApprenants]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinancierApprenants);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
