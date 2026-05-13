import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormateurLayout } from './formateur-layout';

describe('FormateurLayout', () => {
  let component: FormateurLayout;
  let fixture: ComponentFixture<FormateurLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormateurLayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormateurLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
