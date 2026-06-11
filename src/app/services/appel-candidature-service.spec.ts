import { TestBed } from '@angular/core/testing';

import { AppelCandidatureService } from './appel-candidature-service';

describe('AppelCandidatureService', () => {
  let service: AppelCandidatureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppelCandidatureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
