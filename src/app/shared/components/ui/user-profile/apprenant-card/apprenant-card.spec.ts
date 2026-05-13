import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprenantCard } from './apprenant-card';

describe('ApprenantCard', () => {
  let component: ApprenantCard;
  let fixture: ComponentFixture<ApprenantCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApprenantCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApprenantCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
