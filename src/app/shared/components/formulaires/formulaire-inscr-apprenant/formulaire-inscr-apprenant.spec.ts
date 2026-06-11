import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaireInscrApprenant } from './formulaire-inscr-apprenant';

describe('FormulaireInscrApprenant', () => {
  let component: FormulaireInscrApprenant;
  let fixture: ComponentFixture<FormulaireInscrApprenant>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormulaireInscrApprenant]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormulaireInscrApprenant);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
