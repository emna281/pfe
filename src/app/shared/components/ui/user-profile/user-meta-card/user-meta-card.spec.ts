import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMetaCard } from './user-meta-card';

describe('UserMetaCard', () => {
  let component: UserMetaCard;
  let fixture: ComponentFixture<UserMetaCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserMetaCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserMetaCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
