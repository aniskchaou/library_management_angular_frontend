import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticeTemplateModalComponent } from './notice-template-modal.component';

describe('NoticeTemplateModalComponent', () => {
  let component: NoticeTemplateModalComponent;
  let fixture: ComponentFixture<NoticeTemplateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoticeTemplateModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoticeTemplateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
