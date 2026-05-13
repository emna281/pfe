import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesSession } from './mes-session';

describe('MesSession', () => {
  let component: MesSession;
  let fixture: ComponentFixture<MesSession>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MesSession]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MesSession);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
