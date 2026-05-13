import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableFormation } from './table-formation';

describe('TableFormation', () => {
  let component: TableFormation;
  let fixture: ComponentFixture<TableFormation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableFormation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableFormation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
