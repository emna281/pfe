import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeCharge } from './liste-charge';

describe('ListeCharge', () => {
  let component: ListeCharge;
  let fixture: ComponentFixture<ListeCharge>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeCharge]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeCharge);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
