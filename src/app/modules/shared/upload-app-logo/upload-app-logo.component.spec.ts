import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadAppLogoComponent } from './upload-app-logo.component';

describe('UploadAppLogoComponent', () => {
  let component: UploadAppLogoComponent;
  let fixture: ComponentFixture<UploadAppLogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadAppLogoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadAppLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
