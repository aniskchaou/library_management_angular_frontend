import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountAnalyticsComponent } from './account-analytics.component';

describe('AccountAnalyticsComponent', () => {
  let component: AccountAnalyticsComponent;
  let fixture: ComponentFixture<AccountAnalyticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountAnalyticsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
