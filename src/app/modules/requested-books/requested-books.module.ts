import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddRequestedBookComponent } from './add-requested-book/add-requested-book.component';
import { EditRequestedBookComponent } from './edit-requested-book/edit-requested-book.component';
import { RequestedBookListComponent } from './requested-book-list/requested-book-list.component';
import { RequestedBookModalComponent } from './requested-book-modal/requested-book-modal.component';
import { RequiredBookComponent } from './required-book/required-book.component';
import { ViewRequestedBookComponent } from './view-requested-book/view-requested-book.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import RequestedBookValidation from 'src/app/main/validations/RequestedBookValidation';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    AddRequestedBookComponent,
    EditRequestedBookComponent,
    RequestedBookListComponent,
    RequestedBookModalComponent,
    RequiredBookComponent,
    ViewRequestedBookComponent,
  ],
  imports: [
    SharedModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
  ],
  providers: [RequestedBookValidation],
})
export class RequestedBooksModule {}
