import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEvent } from './modal-event';

describe('ModalEvent', () => {
  let component: ModalEvent;
  let fixture: ComponentFixture<ModalEvent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalEvent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalEvent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
