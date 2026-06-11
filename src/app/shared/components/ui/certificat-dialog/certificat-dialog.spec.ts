import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificatDialog } from './certificat-dialog';

describe('CertificatDialog', () => {
  let component: CertificatDialog;
  let fixture: ComponentFixture<CertificatDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CertificatDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CertificatDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
