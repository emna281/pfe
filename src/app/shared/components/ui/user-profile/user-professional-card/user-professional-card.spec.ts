import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfessionalCard } from './user-professional-card';

describe('UserProfessionalCard', () => {
  let component: UserProfessionalCard;
  let fixture: ComponentFixture<UserProfessionalCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserProfessionalCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserProfessionalCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
