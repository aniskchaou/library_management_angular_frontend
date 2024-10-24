import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadBookCoverComponent } from './upload-book-cover.component';

describe('UploadBookCoverComponent', () => {
  let component: UploadBookCoverComponent;
  let fixture: ComponentFixture<UploadBookCoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadBookCoverComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadBookCoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
