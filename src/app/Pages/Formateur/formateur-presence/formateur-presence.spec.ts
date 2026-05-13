import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormateurPresence } from './formateur-presence';

describe('FormateurPresence', () => {
  let component: FormateurPresence;
  let fixture: ComponentFixture<FormateurPresence>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormateurPresence]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormateurPresence);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
