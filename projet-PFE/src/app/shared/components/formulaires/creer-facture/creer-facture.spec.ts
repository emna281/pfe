import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreerFacture } from './creer-facture';

describe('CreerFacture', () => {
  let component: CreerFacture;
  let fixture: ComponentFixture<CreerFacture>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreerFacture]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreerFacture);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
