import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanificateurDashboard } from './planificateur-dashboard';

describe('PlanificateurDashboard', () => {
  let component: PlanificateurDashboard;
  let fixture: ComponentFixture<PlanificateurDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanificateurDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanificateurDashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
