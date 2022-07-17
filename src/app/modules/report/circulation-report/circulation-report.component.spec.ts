import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CirculationReportComponent } from './circulation-report.component';

describe('CirculationReportComponent', () => {
  let component: CirculationReportComponent;
  let fixture: ComponentFixture<CirculationReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CirculationReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CirculationReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
