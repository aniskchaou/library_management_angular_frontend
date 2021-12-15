import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypememberListComponent } from './typemember-list.component';

describe('TypememberListComponent', () => {
  let component: TypememberListComponent;
  let fixture: ComponentFixture<TypememberListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypememberListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypememberListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
