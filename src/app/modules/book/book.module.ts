import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddBookComponent } from './add-book/add-book.component';
import { BookComponent } from './book/book.component';
import { BookListComponent } from './book-list/book-list.component';
import { EditBookComponent } from './edit-book/edit-book.component';
import { ModalBookComponent } from './modal-book/modal-book.component';
import { StatisticMemberComponent } from '../memberr/statistic-member/statistic-member.component';
import { ViewBookComponent } from './view-book/view-book.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from '../shared/shared.module';
import BookValidation from 'src/app/main/validations/BookValidation';
import { BookNumberComponent } from './book-number/book-number.component';
import { StatisticsBookComponent } from './statistics-book/statistics-book.component';

@NgModule({
  declarations: [
    AddBookComponent,
    BookComponent,
    BookListComponent,
    EditBookComponent,
    ModalBookComponent,
    StatisticsBookComponent,
    ViewBookComponent,
    BookNumberComponent,
  ],
  imports: [
    SharedModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
  ],
  providers: [BookValidation],
})
export class BookModule {}
