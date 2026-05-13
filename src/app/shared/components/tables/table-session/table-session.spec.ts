import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableSession } from './table-session';

describe('TableSession', () => {
  let component: TableSession;
  let fixture: ComponentFixture<TableSession>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableSession]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableSession);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
