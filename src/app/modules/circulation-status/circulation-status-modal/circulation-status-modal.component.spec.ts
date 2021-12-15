import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CirculationStatusModalComponent } from './circulation-status-modal.component';

describe('CirculationStatusModalComponent', () => {
  let component: CirculationStatusModalComponent;
  let fixture: ComponentFixture<CirculationStatusModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CirculationStatusModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CirculationStatusModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
