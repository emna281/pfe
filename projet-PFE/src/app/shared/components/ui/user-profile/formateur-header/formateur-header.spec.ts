import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormateurHeader } from './formateur-header';

describe('FormateurHeader', () => {
  let component: FormateurHeader;
  let fixture: ComponentFixture<FormateurHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormateurHeader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormateurHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
