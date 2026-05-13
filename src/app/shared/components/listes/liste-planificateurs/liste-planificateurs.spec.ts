import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListePlanificateurs } from './liste-planificateurs';

describe('ListePlanificateurs', () => {
  let component: ListePlanificateurs;
  let fixture: ComponentFixture<ListePlanificateurs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListePlanificateurs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListePlanificateurs);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
