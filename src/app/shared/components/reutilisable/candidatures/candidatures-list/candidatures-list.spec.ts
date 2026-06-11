import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidaturesList } from './candidatures-list';

describe('CandidaturesList', () => {
  let component: CandidaturesList;
  let fixture: ComponentFixture<CandidaturesList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CandidaturesList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidaturesList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
