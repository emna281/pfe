import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaireInscription } from './formulaire-inscription';

describe('FormulaireInscription', () => {
  let component: FormulaireInscription;
  let fixture: ComponentFixture<FormulaireInscription>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormulaireInscription]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormulaireInscription);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
