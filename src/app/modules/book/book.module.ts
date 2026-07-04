import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddBookComponent } from './add-book/add-book.component';
import { BookComponent } from './book/book.component';
import { BookListComponent } from './book-list/book-list.component';
import { EditBookComponent } from './edit-book/edit-book.component';
import { ModalBookComponent } from './modal-book/modal-book.component';
import { StatisticMemberComponent } from '../memberr/statistic-member/statistic-member.component';
import { ViewBookComponent } from './view-book/view-book.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from '../shared/shared.module';
import BookValidation from 'src/app/main/validations/BookValidation';
import { BookNumberComponent } from './book-number/book-number.component';
import { StatisticsBookComponent } from './statistics-book/statistics-book.component';
import { TagComponent } from './tag/tag.component';
import { CirculationHistoryComponent } from './circulation-history/circulation-history.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { UploadBookCoverComponent } from './upload-book-cover/upload-book-cover.component';
import { ToastrModule } from 'ngx-toastr';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({ declarations: [
        AddBookComponent,
        BookComponent,
        BookListComponent,
        EditBookComponent,
        ModalBookComponent,
        StatisticsBookComponent,
        ViewBookComponent,
        BookNumberComponent,
        TagComponent,
        CirculationHistoryComponent,
        UploadBookCoverComponent
    ], imports: [SharedModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        NgxChartsModule,
        NgxDatatableModule,
        NgbModalModule,
        NgSelectModule, ToastrModule,
        MatCardModule,
        MatTabsModule,
        MatIconModule,
        MatButtonModule,
        MatMenuModule,
        MatFormFieldModule,
        MatInputModule,
        MatDividerModule,
        MatProgressSpinnerModule,
        MatProgressBarModule,
        MatSelectModule,
        MatTooltipModule,
        MatChipsModule,
        MatDialogModule,
        MatExpansionModule], providers: [BookValidation, provideHttpClient(withInterceptorsFromDi())] })
export class BookModule {}
