import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { CirculationComponent } from './circulation/circulation.component';
import { CirculationListComponent } from './circulation-list/circulation-list.component';
import { CirculationModalComponent } from './circulation-modal/circulation-modal.component';
import { AddCirculationComponent } from './add-circulation/add-circulation.component';
import { EditCirculationComponent } from './edit-circulation/edit-circulation.component';
import { ViewCirculationComponent } from './view-circulation/view-circulation.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from '../shared/shared.module';
import CirculationValidation from 'src/app/main/validations/CirculationValidation';
import { CirculationCalendarComponent } from './circulation-calendar/circulation-calendar.component';
// removed: ngx-event-calendar (incompatible with Angular 21)
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { ContactMemberComponent } from './contact-member/contact-member.component';
import { PaymentMemberComponent } from './payment-member/payment-member.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({ declarations: [
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
    exports: [
        MatButtonModule,
        MatSelectModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatNativeDateModule,
    ], imports: [SharedModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        BrowserModule,
        FormsModule,
        MatButtonModule,
        MatSelectModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatNativeDateModule,
        BrowserAnimationsModule,
        NgxDatatableModule,
        NgbModalModule,
        NgSelectModule,
        NgxChartsModule,
        MatCardModule,
        MatTabsModule,
        MatMenuModule,
        MatDividerModule,
        MatProgressSpinnerModule,
        MatProgressBarModule,
        MatTooltipModule,
        MatChipsModule,
        MatDialogModule], schemas: [CUSTOM_ELEMENTS_SCHEMA], providers: [CirculationValidation, DatePipe, provideHttpClient(withInterceptorsFromDi())] })
export class CirculationsModule {}
