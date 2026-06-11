import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableSalle } from './table-salle';

describe('TableSalle', () => {
  let component: TableSalle;
  let fixture: ComponentFixture<TableSalle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableSalle]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableSalle);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
