import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanificateurSidebar } from './planificateur-sidebar';

describe('PlanificateurSidebar', () => {
  let component: PlanificateurSidebar;
  let fixture: ComponentFixture<PlanificateurSidebar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanificateurSidebar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanificateurSidebar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
