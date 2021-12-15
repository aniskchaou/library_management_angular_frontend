import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CirculationStatusComponent } from './circulation-status.component';

describe('CirculationStatusComponent', () => {
  let component: CirculationStatusComponent;
  let fixture: ComponentFixture<CirculationStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CirculationStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CirculationStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
