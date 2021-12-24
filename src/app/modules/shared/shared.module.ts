import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddButtonComponent } from './add-button/add-button.component';
import { LoadingComponent } from './loading/loading.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CategoryModule } from '../category/category.module';
import { RequestedBooksModule } from '../requested-books/requested-books.module';
import { AuthguardService } from 'src/app/main/security/authguard-service.service';
import { AuthentificationService } from 'src/app/main/security/authentification.service';
import { SeachResultComponent } from './seach-result/seach-result.component';
import { BookResultListComponent } from './book-result-list/book-result-list.component';
import { CategoryResultListComponent } from './category-result-list/category-result-list.component';
import { WriterResultListComponent } from './writer-result-list/writer-result-list.component';

@NgModule({
  declarations: [
    SeachResultComponent,
    AddButtonComponent,
    LoadingComponent,
    LoadingComponent,
    BookResultListComponent,
    CategoryResultListComponent,
    WriterResultListComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    CommonModule,
  ],
  exports: [
    AddButtonComponent,
    LoadingComponent,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    CommonModule,
  ],
  providers: [AuthguardService, AuthentificationService],
})
export class SharedModule {}
