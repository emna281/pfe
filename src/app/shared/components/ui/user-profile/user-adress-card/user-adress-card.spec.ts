import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAdressCard } from './user-adress-card';

describe('UserAdressCard', () => {
  let component: UserAdressCard;
  let fixture: ComponentFixture<UserAdressCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserAdressCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserAdressCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
