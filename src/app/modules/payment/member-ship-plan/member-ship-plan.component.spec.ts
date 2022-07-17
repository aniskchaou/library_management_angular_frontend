import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberShipPlanComponent } from './member-ship-plan.component';

describe('MemberShipPlanComponent', () => {
  let component: MemberShipPlanComponent;
  let fixture: ComponentFixture<MemberShipPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberShipPlanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberShipPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
