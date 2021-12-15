import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTypeMemberComponent } from './edit-type-member.component';

describe('EditTypeMemberComponent', () => {
  let component: EditTypeMemberComponent;
  let fixture: ComponentFixture<EditTypeMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTypeMemberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTypeMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
