import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Planing } from './planing';

describe('Planing', () => {
  let component: Planing;
  let fixture: ComponentFixture<Planing>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Planing]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Planing);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
