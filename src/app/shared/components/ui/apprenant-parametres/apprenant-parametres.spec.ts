import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprenantParametres } from './apprenant-parametres';

describe('ApprenantParametres', () => {
  let component: ApprenantParametres;
  let fixture: ComponentFixture<ApprenantParametres>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApprenantParametres]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApprenantParametres);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
