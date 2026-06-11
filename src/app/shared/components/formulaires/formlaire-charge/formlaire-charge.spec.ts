import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormlaireCharge } from './formlaire-charge';

describe('FormlaireCharge', () => {
  let component: FormlaireCharge;
  let fixture: ComponentFixture<FormlaireCharge>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormlaireCharge]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormlaireCharge);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
