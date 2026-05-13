import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaireCompetence } from './formulaire-competence';

describe('FormulaireCompetence', () => {
  let component: FormulaireCompetence;
  let fixture: ComponentFixture<FormulaireCompetence>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormulaireCompetence]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormulaireCompetence);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
