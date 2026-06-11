import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentCard } from './component-card';

describe('ComponentCard', () => {
  let component: ComponentCard;
  let fixture: ComponentFixture<ComponentCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponentCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
