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
import { StatisticsCategoryComponent } from './statistics-category/statistics-category.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MarkdownModule, MarkdownService } from 'ngx-markdown';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AddCategoryComponent,
    CategoryListComponent,
    EditCategoryComponent,
    ModalCategoryComponent,
    CategoryComponent,
    TitlecapitalPipe,
    StatisticsCategoryComponent
  ],
  imports: [
    SharedModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    NgxDatatableModule,
    NgbModalModule,
    ToastrModule.forRoot({
      "timeOut": 5000,  // Duration the toast is displayed (in milliseconds)
    "extendedTimeOut": 1000,  // Time the toast stays visible after mouse hover (in milliseconds)
    "positionClass": 'toast-top-right',  // Position of the toast (e.g., top-right, bottom-right, top-center)
    "preventDuplicates": true,  // Prevent duplicate toasts from appearing
    "closeButton": true,  // Show a close button to dismiss the toast
    "progressBar": true,  // Display a progress bar indicating remaining time
    "newestOnTop": true,  // New toasts appear at the top if multiple are shown
    //"hideDuration": 300,  // Duration for the hide animation (in milliseconds)
    //"showDuration": 300,  // Duration for the show animation (in milliseconds)
    //"showEasing": 'swing',  // Easing function for the show animation (e.g., 'swing', 'linear')
    //"hideEasing": 'linear',  // Easing function for the hide animation
    //"showMethod": 'fadeIn',  // Method used to show the toast (e.g., 'fadeIn', 'slideDown')
    //"hideMethod": 'fadeOut',  // Method used to hide the toast
    //"onclick": null,  // Callback function if the toast is clicked
    "tapToDismiss": true,  // Dismiss the toast when clicked/tapped
    //"rtl": false  // Enable right-to-left support
    }),
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
