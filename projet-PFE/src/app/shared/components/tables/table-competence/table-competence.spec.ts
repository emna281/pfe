import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableCompetence } from './table-competence';

describe('TableCompetence', () => {
  let component: TableCompetence;
  let fixture: ComponentFixture<TableCompetence>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableCompetence]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableCompetence);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
