import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from '../shared/shared.module';
import { PaymentComponent } from './payment/payment.component';
import { MemberShipPlanComponent } from './member-ship-plan/member-ship-plan.component';
import { ModalPaymentComponent } from './modal-payment/modal-payment.component';
import { AddPaymentComponent } from './add-payment/add-payment.component';
import { PaymentListComponent } from './payment-list/payment-list.component';

@NgModule({
  declarations: [
    PaymentComponent,
    MemberShipPlanComponent,
    ModalPaymentComponent,
    AddPaymentComponent,
    PaymentListComponent,
  ],
  imports: [
    SharedModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
  ],
})
export class PaymentModule {}
