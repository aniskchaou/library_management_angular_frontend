import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTypeMemberComponent } from './add-type-member.component';

describe('AddTypeMemberComponent', () => {
  let component: AddTypeMemberComponent;
  let fixture: ComponentFixture<AddTypeMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTypeMemberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTypeMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
