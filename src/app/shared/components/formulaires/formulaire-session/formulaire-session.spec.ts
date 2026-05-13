import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaireSession } from './formulaire-session';

describe('FormulaireSession', () => {
  let component: FormulaireSession;
  let fixture: ComponentFixture<FormulaireSession>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormulaireSession]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormulaireSession);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
