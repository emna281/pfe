import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeApprenants } from './liste-apprenants';

describe('ListeApprenants', () => {
  let component: ListeApprenants;
  let fixture: ComponentFixture<ListeApprenants>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeApprenants]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeApprenants);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
