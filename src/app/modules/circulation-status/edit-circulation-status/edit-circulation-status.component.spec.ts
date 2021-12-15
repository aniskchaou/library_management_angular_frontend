import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCirculationStatusComponent } from './edit-circulation-status.component';

describe('EditCirculationStatusComponent', () => {
  let component: EditCirculationStatusComponent;
  let fixture: ComponentFixture<EditCirculationStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCirculationStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCirculationStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
