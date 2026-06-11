import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Rappel } from './rappel';

describe('Rappel', () => {
  let component: Rappel;
  let fixture: ComponentFixture<Rappel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Rappel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Rappel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
