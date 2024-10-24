import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddWriterComponent } from './add-writer/add-writer.component';
import { EditWriterComponent } from './edit-writer/edit-writer.component';
import { WriterComponent } from './writer/writer.component';
import { WriterListComponent } from './writer-list/writer-list.component';
import { WriterModalComponent } from './writer-modal/writer-modal.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from '../shared/shared.module';
import WriterValidation from 'src/app/main/validations/WriterValidation';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgSelectComponent } from '@ng-select/ng-select';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AddWriterComponent,
    EditWriterComponent,
    WriterComponent,
    WriterListComponent,
    WriterModalComponent,
  ],
  imports: [
    SharedModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    NgxChartsModule,
    NgxDatatableModule,
    //NgSelectComponent,
    NgbModalModule
  ],
  providers: [WriterValidation],
})
export class WriterModule {}
