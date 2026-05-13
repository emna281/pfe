import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeFinanciers } from './liste-financiers';

describe('ListeFinanciers', () => {
  let component: ListeFinanciers;
  let fixture: ComponentFixture<ListeFinanciers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeFinanciers]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeFinanciers);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
