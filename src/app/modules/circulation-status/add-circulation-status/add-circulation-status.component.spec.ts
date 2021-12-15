import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCirculationStatusComponent } from './add-circulation-status.component';

describe('AddCirculationStatusComponent', () => {
  let component: AddCirculationStatusComponent;
  let fixture: ComponentFixture<AddCirculationStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCirculationStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCirculationStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
