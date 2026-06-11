import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileBanner } from './user-profile-banner';

describe('UserProfileBanner', () => {
  let component: UserProfileBanner;
  let fixture: ComponentFixture<UserProfileBanner>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserProfileBanner]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserProfileBanner);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
