import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprenantCertificats } from './apprenant-certificats';

describe('ApprenantCertificats', () => {
  let component: ApprenantCertificats;
  let fixture: ComponentFixture<ApprenantCertificats>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApprenantCertificats]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApprenantCertificats);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
