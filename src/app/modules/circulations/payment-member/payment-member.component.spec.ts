import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentMemberComponent } from './payment-member.component';

describe('PaymentMemberComponent', () => {
  let component: PaymentMemberComponent;
  let fixture: ComponentFixture<PaymentMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentMemberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
