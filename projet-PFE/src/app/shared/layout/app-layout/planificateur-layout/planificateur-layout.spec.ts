import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanificateurLayout } from './planificateur-layout';

describe('PlanificateurLayout', () => {
  let component: PlanificateurLayout;
  let fixture: ComponentFixture<PlanificateurLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanificateurLayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanificateurLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
