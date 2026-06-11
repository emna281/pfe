import { TestBed } from '@angular/core/testing';

import { PlanificateurDashboardService } from './planificateur-dashboard-service';

describe('PlanificateurDashboardService', () => {
  let service: PlanificateurDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanificateurDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
