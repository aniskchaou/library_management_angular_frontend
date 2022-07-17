import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CirculationCalendarComponent } from './circulation-calendar.component';

describe('CirculationCalendarComponent', () => {
  let component: CirculationCalendarComponent;
  let fixture: ComponentFixture<CirculationCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CirculationCalendarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CirculationCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
