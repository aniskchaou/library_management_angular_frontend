import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CirculationRulesComponent } from './circulation-rules.component';

describe('CirculationRulesComponent', () => {
  let component: CirculationRulesComponent;
  let fixture: ComponentFixture<CirculationRulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CirculationRulesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CirculationRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
