import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailSession } from './detail-session';

describe('DetailSession', () => {
  let component: DetailSession;
  let fixture: ComponentFixture<DetailSession>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailSession]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailSession);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
