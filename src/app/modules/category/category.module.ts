import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddCategoryComponent } from './add-category/add-category.component';
import { CategoryComponent } from './category/category.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { ModalCategoryComponent } from './modal-category/modal-category.component';
import { TitlecapitalPipe } from 'src/app/main/pipes/titlecapital.pipe';
import CategoryTestService from 'src/app/main/mocks/CategoryTestService';
import CategoryValidation from 'src/app/main/validations/CategoryValidation';
import { AddButtonComponent } from '../shared/add-button/add-button.component';
import { LoadingComponent } from '../shared/loading/loading.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    AddCategoryComponent,
    CategoryListComponent,
    EditCategoryComponent,
    ModalCategoryComponent,
    CategoryComponent,
    TitlecapitalPipe,
  ],
  imports: [
    SharedModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
  ],
  exports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    CategoryComponent,
  ],
  providers: [CategoryTestService, CategoryValidation],
})
export class CategoryModule {}
