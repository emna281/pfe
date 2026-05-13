import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailFormation } from './detail-formation';

describe('DetailFormation', () => {
  let component: DetailFormation;
  let fixture: ComponentFixture<DetailFormation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailFormation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailFormation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
