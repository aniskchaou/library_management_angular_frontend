import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import CategoryTestService from 'src/app/main/mocks/CategoryTestService';
import CategoryValidation from 'src/app/main/validations/CategoryValidation';
import { SharedModule } from '../shared/shared.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExpenseComponent } from './expense/expense.component';
import { ExpenseListComponent } from './expense-list/expense-list.component';
import { IncomeComponent } from './income/income.component';
import { IncomeListComponent } from './income-list/income-list.component';
import { ModalExpenseComponent } from './modal-expense/modal-expense.component';
import { AddExpenseComponent } from './add-expense/add-expense.component';
import { EditExpenseComponent } from './edit-expense/edit-expense.component';
import { ModalIncomeComponent } from './modal-income/modal-income.component';
import { AddIncomeComponent } from './add-income/add-income.component';
import { EditIncomeComponent } from './edit-income/edit-income.component';

@NgModule({
  declarations: [
    ExpenseListComponent,
    IncomeListComponent,
    ExpenseComponent,
    IncomeComponent,
    ModalExpenseComponent,
    AddExpenseComponent,
    EditExpenseComponent,
    ModalIncomeComponent,
    AddIncomeComponent,
    EditIncomeComponent,
  ],
  imports: [
    SharedModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
  ],
  providers: [],
})
export class AccountModule {}
