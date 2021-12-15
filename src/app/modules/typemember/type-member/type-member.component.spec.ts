import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeMemberComponent } from './type-member.component';

describe('TypeMemberComponent', () => {
  let component: TypeMemberComponent;
  let fixture: ComponentFixture<TypeMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeMemberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
