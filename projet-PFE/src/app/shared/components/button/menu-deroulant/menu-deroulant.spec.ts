import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuDeroulant } from './menu-deroulant';

describe('MenuDeroulant', () => {
  let component: MenuDeroulant;
  let fixture: ComponentFixture<MenuDeroulant>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuDeroulant]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuDeroulant);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
