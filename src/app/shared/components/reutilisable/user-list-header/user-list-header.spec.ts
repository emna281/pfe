import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListHeader } from './user-list-header';

describe('UserListHeader', () => {
  let component: UserListHeader;
  let fixture: ComponentFixture<UserListHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserListHeader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserListHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
