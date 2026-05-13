import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeFormateurs } from './liste-formateurs';

describe('ListeFormateurs', () => {
  let component: ListeFormateurs;
  let fixture: ComponentFixture<ListeFormateurs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeFormateurs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeFormateurs);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
