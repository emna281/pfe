import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilFormateur } from './profil-formateur';

describe('ProfilFormateur', () => {
  let component: ProfilFormateur;
  let fixture: ComponentFixture<ProfilFormateur>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfilFormateur]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilFormateur);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
