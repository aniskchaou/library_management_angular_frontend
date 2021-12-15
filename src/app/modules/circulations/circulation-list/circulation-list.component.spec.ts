import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CirculationListComponent } from './circulation-list.component';

describe('CirculationListComponent', () => {
  let component: CirculationListComponent;
  let fixture: ComponentFixture<CirculationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CirculationListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CirculationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
