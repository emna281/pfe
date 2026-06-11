import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaireSignup } from './formulaire-signup';

describe('FormulaireSignup', () => {
  let component: FormulaireSignup;
  let fixture: ComponentFixture<FormulaireSignup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormulaireSignup]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormulaireSignup);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
