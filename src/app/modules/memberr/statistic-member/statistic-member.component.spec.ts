import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticMemberComponent } from './statistic-member.component';

describe('StatisticMemberComponent', () => {
  let component: StatisticMemberComponent;
  let fixture: ComponentFixture<StatisticMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatisticMemberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
