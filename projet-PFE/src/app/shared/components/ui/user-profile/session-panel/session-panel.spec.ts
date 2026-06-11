import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionPanel } from './session-panel';

describe('SessionPanel', () => {
  let component: SessionPanel;
  let fixture: ComponentFixture<SessionPanel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SessionPanel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SessionPanel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
