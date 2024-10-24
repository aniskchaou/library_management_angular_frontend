import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadProfilePhotoComponent } from './upload-profile-photo.component';

describe('UploadProfilePhotoComponent', () => {
  let component: UploadProfilePhotoComponent;
  let fixture: ComponentFixture<UploadProfilePhotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadProfilePhotoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadProfilePhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
