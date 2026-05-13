import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableDemandesInscriptions } from './table-demandes-inscriptions';

describe('TableDemandesInscriptions', () => {
  let component: TableDemandesInscriptions;
  let fixture: ComponentFixture<TableDemandesInscriptions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableDemandesInscriptions]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableDemandesInscriptions);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
