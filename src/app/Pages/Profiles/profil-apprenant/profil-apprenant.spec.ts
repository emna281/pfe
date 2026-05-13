import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilApprenant } from './profil-apprenant';

describe('ProfilApprenant', () => {
  let component: ProfilApprenant;
  let fixture: ComponentFixture<ProfilApprenant>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfilApprenant]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilApprenant);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
