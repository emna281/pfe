import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupFormAccueil } from './signup-form-accueil';

describe('SignupFormAccueil', () => {
  let component: SignupFormAccueil;
  let fixture: ComponentFixture<SignupFormAccueil>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignupFormAccueil]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupFormAccueil);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
