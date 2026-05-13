import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaireFacture } from './formulaire-facture';

describe('FormulaireFacture', () => {
  let component: FormulaireFacture;
  let fixture: ComponentFixture<FormulaireFacture>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormulaireFacture]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormulaireFacture);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
