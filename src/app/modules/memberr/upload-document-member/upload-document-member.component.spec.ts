import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadDocumentMemberComponent } from './upload-document-member.component';

describe('UploadDocumentMemberComponent', () => {
  let component: UploadDocumentMemberComponent;
  let fixture: ComponentFixture<UploadDocumentMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadDocumentMemberComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadDocumentMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
