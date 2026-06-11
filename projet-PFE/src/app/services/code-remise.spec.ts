import { TestBed } from '@angular/core/testing';

import { CodeRemise } from './code-remise';

describe('CodeRemise', () => {
  let service: CodeRemise;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CodeRemise);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
