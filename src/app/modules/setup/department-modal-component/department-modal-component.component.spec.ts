import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentModalComponentComponent } from './department-modal-component.component';

describe('DepartmentModalComponentComponent', () => {
  let component: DepartmentModalComponentComponent;
  let fixture: ComponentFixture<DepartmentModalComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartmentModalComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartmentModalComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
