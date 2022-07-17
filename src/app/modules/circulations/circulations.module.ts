import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { CirculationComponent } from './circulation/circulation.component';
import { CirculationListComponent } from './circulation-list/circulation-list.component';
import { CirculationModalComponent } from './circulation-modal/circulation-modal.component';
import { AddCirculationComponent } from './add-circulation/add-circulation.component';
import { EditCirculationComponent } from './edit-circulation/edit-circulation.component';
import { ViewCirculationComponent } from './view-circulation/view-circulation.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from '../shared/shared.module';
import CirculationValidation from 'src/app/main/validations/CirculationValidation';
import { CirculationCalendarComponent } from './circulation-calendar/circulation-calendar.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxEventCalendarModule } from 'ngx-event-calendar';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { ContactMemberComponent } from './contact-member/contact-member.component';
import { PaymentMemberComponent } from './payment-member/payment-member.component';

@NgModule({
  declarations: [
    CirculationComponent,
    CirculationListComponent,
    CirculationModalComponent,
    AddCirculationComponent,
    EditCirculationComponent,
    ViewCirculationComponent,
    CirculationCalendarComponent,
    ContactMemberComponent,
    PaymentMemberComponent,
  ],
  imports: [
    SharedModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    FlexLayoutModule,
    NgxEventCalendarModule,
    BrowserModule,
    FormsModule,
    NgxEventCalendarModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatNativeDateModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
  ],
  exports: [
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,

    MatNativeDateModule,
  ],
  providers: [CirculationValidation, DatePipe],
})
export class CirculationsModule {}
