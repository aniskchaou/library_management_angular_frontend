import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEmailSettingComponent } from './edit-email-setting.component';

describe('EditEmailSettingComponent', () => {
  let component: EditEmailSettingComponent;
  let fixture: ComponentFixture<EditEmailSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditEmailSettingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEmailSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
