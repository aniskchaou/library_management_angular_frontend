import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTypeMemberComponent } from './modal-type-member.component';

describe('ModalTypeMemberComponent', () => {
  let component: ModalTypeMemberComponent;
  let fixture: ComponentFixture<ModalTypeMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalTypeMemberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalTypeMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
