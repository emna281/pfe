import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableFacture } from './table-facture';

describe('TableFacture', () => {
  let component: TableFacture;
  let fixture: ComponentFixture<TableFacture>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableFacture]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableFacture);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
