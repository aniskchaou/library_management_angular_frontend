import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCirculationComponent } from './view-circulation.component';

describe('ViewCirculationComponent', () => {
  let component: ViewCirculationComponent;
  let fixture: ComponentFixture<ViewCirculationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCirculationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCirculationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
