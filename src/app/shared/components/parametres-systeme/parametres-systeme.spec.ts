import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametresSysteme } from './parametres-systeme';

describe('ParametresSysteme', () => {
  let component: ParametresSysteme;
  let fixture: ComponentFixture<ParametresSysteme>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParametresSysteme]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParametresSysteme);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
