import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddWriterComponent } from './add-writer/add-writer.component';
import { EditWriterComponent } from './edit-writer/edit-writer.component';
import { WriterComponent } from './writer/writer.component';
import { WriterListComponent } from './writer-list/writer-list.component';
import { WriterModalComponent } from './writer-modal/writer-modal.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from '../shared/shared.module';
import WriterValidation from 'src/app/main/validations/WriterValidation';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgSelectComponent } from '@ng-select/ng-select';
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
        AddWriterComponent,
        EditWriterComponent,
        WriterComponent,
        WriterListComponent,
        WriterModalComponent,
    ], imports: [SharedModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        NgxChartsModule,
        NgxDatatableModule,
        //NgSelectComponent,
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
        MatDialogModule], providers: [WriterValidation, provideHttpClient(withInterceptorsFromDi())] })
export class WriterModule {}
