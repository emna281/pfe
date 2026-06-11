import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulairePaiement } from './formulaire-paiement';

describe('FormulairePaiement', () => {
  let component: FormulairePaiement;
  let fixture: ComponentFixture<FormulairePaiement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormulairePaiement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormulairePaiement);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
