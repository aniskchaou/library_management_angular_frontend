import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddPublisherComponent } from './add-publisher/add-publisher.component';
import { EditPublisherComponent } from './edit-publisher/edit-publisher.component';
import Publisher from 'src/app/main/models/Publisher';
import { PublisherListComponent } from './publisher-list/publisher-list.component';
import { PublisherModalComponent } from './publisher-modal/publisher-modal.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from '../shared/shared.module';
import PublisherValidation from 'src/app/main/validations/PublisherValidation';
import { PublisherComponent } from './publisher/publisher.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AddPublisherComponent,
    EditPublisherComponent,
    PublisherComponent,
    PublisherListComponent,
    PublisherModalComponent,
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
    NgSelectModule,
    NgbModalModule
  ],
  providers: [PublisherValidation],
})
export class PublishersModule {}
