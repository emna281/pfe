import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeManager } from './liste-manager';

describe('ListeManager', () => {
  let component: ListeManager;
  let fixture: ComponentFixture<ListeManager>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeManager]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeManager);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
