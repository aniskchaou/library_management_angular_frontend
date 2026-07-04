import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddPublisherComponent } from './add-publisher/add-publisher.component';
import { EditPublisherComponent } from './edit-publisher/edit-publisher.component';
import Publisher from 'src/app/main/models/Publisher';
import { PublisherListComponent } from './publisher-list/publisher-list.component';
import { PublisherModalComponent } from './publisher-modal/publisher-modal.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from '../shared/shared.module';
import PublisherValidation from 'src/app/main/validations/PublisherValidation';
import { PublisherComponent } from './publisher/publisher.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({ declarations: [
        AddPublisherComponent,
        EditPublisherComponent,
        PublisherComponent,
        PublisherListComponent,
        PublisherModalComponent,
    ], imports: [SharedModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        NgxChartsModule,
        NgxDatatableModule,
        NgSelectModule,
        NgbModalModule,
        MatIconModule,
        MatButtonModule,
        MatCardModule,
        MatTabsModule,
        MatMenuModule,
        MatDividerModule,
        MatProgressSpinnerModule,
        MatProgressBarModule,
        MatTooltipModule,
        MatChipsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatCheckboxModule,
        MatDialogModule], providers: [PublisherValidation, provideHttpClient(withInterceptorsFromDi())] })
export class PublishersModule {}
