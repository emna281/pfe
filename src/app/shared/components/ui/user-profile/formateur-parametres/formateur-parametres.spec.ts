import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormateurParametres } from './formateur-parametres';

describe('FormateurParametres', () => {
  let component: FormateurParametres;
  let fixture: ComponentFixture<FormateurParametres>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormateurParametres]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormateurParametres);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
