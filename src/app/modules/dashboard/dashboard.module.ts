import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DragDropModule } from '@angular/cdk/drag-drop';
// removed: ngx-event-calendar (incompatible with Angular 21)
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CirculationCalendarComponent } from '../circulations/circulation-calendar/circulation-calendar.component';
import { CirculationsModule } from '../circulations/circulations.module';

@NgModule({ declarations: [DashboardComponent], imports: [SharedModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        MatButtonModule,
        MatSelectModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatCardModule,
        MatTabsModule,
        MatListModule,
        MatDividerModule,
        MatNativeDateModule,
        MatCheckboxModule,
        MatTooltipModule,
        DragDropModule,
        BrowserAnimationsModule,
        NgxChartsModule,
        CirculationsModule], schemas: [CUSTOM_ELEMENTS_SCHEMA], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class DashboardModule {}
