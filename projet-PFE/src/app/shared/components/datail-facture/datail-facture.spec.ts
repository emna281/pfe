import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatailFacture } from './datail-facture';

describe('DatailFacture', () => {
  let component: DatailFacture;
  let fixture: ComponentFixture<DatailFacture>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatailFacture]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatailFacture);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
