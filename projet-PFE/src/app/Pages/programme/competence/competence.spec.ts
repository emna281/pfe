import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Competence } from './competence';

describe('Competence', () => {
  let component: Competence;
  let fixture: ComponentFixture<Competence>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Competence]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Competence);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
