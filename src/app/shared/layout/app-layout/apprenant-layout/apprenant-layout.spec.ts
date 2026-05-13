import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprenantLayout } from './apprenant-layout';

describe('ApprenantLayout', () => {
  let component: ApprenantLayout;
  let fixture: ComponentFixture<ApprenantLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApprenantLayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApprenantLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
