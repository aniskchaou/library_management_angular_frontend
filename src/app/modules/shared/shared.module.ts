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

@NgModule({
  declarations: [AddButtonComponent, LoadingComponent, LoadingComponent],
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
