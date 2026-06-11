import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaireSalle } from './formulaire-salle';

describe('FormulaireSalle', () => {
  let component: FormulaireSalle;
  let fixture: ComponentFixture<FormulaireSalle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormulaireSalle]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormulaireSalle);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
