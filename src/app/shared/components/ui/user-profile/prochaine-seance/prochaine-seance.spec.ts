import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProchaineSeance } from './prochaine-seance';

describe('ProchaineSeance', () => {
  let component: ProchaineSeance;
  let fixture: ComponentFixture<ProchaineSeance>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProchaineSeance]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProchaineSeance);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
