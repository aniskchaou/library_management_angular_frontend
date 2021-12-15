import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CirculationStatusListComponent } from './circulation-status-list.component';

describe('CirculationStatusListComponent', () => {
  let component: CirculationStatusListComponent;
  let fixture: ComponentFixture<CirculationStatusListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CirculationStatusListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CirculationStatusListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
