import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionGestion } from './session-gestion';

describe('SessionGestion', () => {
  let component: SessionGestion;
  let fixture: ComponentFixture<SessionGestion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SessionGestion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SessionGestion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
