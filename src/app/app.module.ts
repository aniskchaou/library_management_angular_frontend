import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavigationComponent } from './template/navigation/navigation.component';
import { RouterModule, Routes } from '@angular/router';
import { APP_BASE_HREF, CommonModule } from '@angular/common';

import { BookComponent } from './modules/book/book/book.component';
import { AddBookComponent } from './modules/book/add-book/add-book.component';
import { EditBookComponent } from './modules/book/edit-book/edit-book.component';

import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './template/footer/footer.component';
import { TopbarComponent } from './template/topbar/topbar.component';
import { ModalBookComponent } from './modules/book/modal-book/modal-book.component';

import { StatisticsBookComponent } from './modules/book/statistics-book/statistics-book.component';
import { HttpClientModule } from '@angular/common/http';
import { EbookComponent } from './modules/ebooks/ebook/ebook.component';

import { EditEbookComponent } from './modules/ebooks/edit-ebook/edit-ebook.component';

import { BookListComponent } from './modules/book/book-list/book-list.component';
import RequestedBook from './main/models/RequestedBook';

import { StatusDirective } from './main/directives/status.directive';
import { AddButtonComponent } from './modules/shared/add-button/add-button.component';

import { ViewBookComponent } from './modules/book/view-book/view-book.component';
import { LoginComponent } from './modules/shared/login/login.component';
import { AuthguardService } from './main/security/authguard-service.service';
import { CategoryModule } from './modules/category/category.module';
import { CategoryComponent } from './modules/category/category/category.component';
import { RequestedBooksModule } from './modules/requested-books/requested-books.module';
import { RequiredBookComponent } from './modules/requested-books/required-book/required-book.component';
import { PublishersModule } from './modules/publishers/publishers.module';
import { PublisherComponent } from './modules/publishers/publisher/publisher.component';
import { WriterComponent } from './modules/writer/writer/writer.component';
import { WriterModule } from './modules/writer/writer.module';
import { TypeMemberComponent } from './modules/typemember/type-member/type-member.component';
import { TypememberListComponent } from './modules/typemember/typemember-list/typemember-list.component';
import { TypememberModule } from './modules/typemember/typemember.module';
import { MemberComponent } from './modules/memberr/member/member.component';
import { MemberrModule } from './modules/memberr/memberr.module';
import { CirculationStatusComponent } from './modules/circulation-status/circulation-status/circulation-status.component';
import { CirculationStatusModule } from './modules/circulation-status/circulation-status.module';
import { CirculationsModule } from './modules/circulations/circulations.module';
import { CirculationComponent } from './modules/circulations/circulation/circulation.component';
import { SettingsComponent } from './modules/settings/settings/settings.component';
import { SettingsModule } from './modules/settings/settings.module';
import { BookModule } from './modules/book/book.module';
import { SeachResultComponent } from './modules/shared/seach-result/seach-result.component';
import { BookResultListComponent } from './modules/shared/book-result-list/book-result-list.component';
import { ArvivedBookListComponent } from './modules/book/arvived-book-list/arvived-book-list.component';
import { ArchivedBookComponent } from './modules/book/archived-book/archived-book.component';

import { DestroyedBooksListComponent } from './modules/book/destroyed-books-list/destroyed-books-list.component';
import { DestroyedBooksComponent } from './modules/book/destroyed-books/destroyed-books.component';
import { ReturnedBooksComponent } from './modules/circulations/returned-books/returned-books.component';
import { ReturnedBooksListComponent } from './modules/circulations/returned-books-list/returned-books-list.component';
import { EmailSettingComponent } from './modules/settings/email-setting/email-setting.component';
import { SettingsEmailListComponent } from './modules/settings/settings-email-list/settings-email-list.component';
import { SettingsSmsListComponent } from './modules/settings/settings-sms-list/settings-sms-list.component';
import { SettingsSmsComponent } from './modules/settings/settings-sms/settings-sms.component';
import { PaymentComponent } from './modules/payment/payment/payment.component';
import { BooksAnalyticsComponent } from './modules/analytics/books-analytics/books-analytics.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StatisticsCategoryComponent } from './modules/category/statistics-category/statistics-category.component';
import { BookReportComponent } from './modules/report/book-report/book-report.component';
import { MemberReportComponent } from './modules/report/member-report/member-report.component';
import { CirculationReportComponent } from './modules/report/circulation-report/circulation-report.component';
import { AccountModule } from './modules/account/account.module';
import { ExpenseComponent } from './modules/account/expense/expense.component';
import { IncomeComponent } from './modules/account/income/income.component';
import { MemberShipPlanComponent } from './modules/payment/member-ship-plan/member-ship-plan.component';
import { PaymentModule } from './modules/payment/payment.module';
import { CirculationHistoryComponent } from './modules/book/circulation-history/circulation-history.component';
import { TagComponent } from './modules/book/tag/tag.component';
import { AccountAnalyticsComponent } from './modules/analytics/account-analytics/account-analytics.component';
import { CirculationCalendarComponent } from './modules/circulations/circulation-calendar/circulation-calendar.component';
import { NgxEventCalendarModule } from 'ngx-event-calendar';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ContactMemberComponent } from './modules/circulations/contact-member/contact-member.component';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { DashboardComponent } from './modules/dashboard/dashboard/dashboard.component';
import { EditEmailSettingComponent } from './modules/settings/edit-email-setting/edit-email-setting.component';

const routes: Routes = [
  {
    path: 'circulation-calendar',
    component: CirculationCalendarComponent,
    pathMatch: 'full',
    canActivate: [AuthguardService],
  },
  {
    path: 'account-analytics',
    component: AccountAnalyticsComponent,
    pathMatch: 'full',
    canActivate: [AuthguardService],
  },
  {
    path: 'tag',
    component: TagComponent,
    pathMatch: 'full',
    canActivate: [AuthguardService],
  },
  {
    path: 'circulation-history',
    component: CirculationHistoryComponent,
    pathMatch: 'full',
    canActivate: [AuthguardService],
  },
  {
    path: 'membership-plan',
    component: MemberShipPlanComponent,
    pathMatch: 'full',
    canActivate: [AuthguardService],
  },
  {
    path: 'payment',
    component: PaymentComponent,
    pathMatch: 'full',
    canActivate: [AuthguardService],
  },
  {
    path: 'circulation-report',
    component: CirculationReportComponent,
    pathMatch: 'full',
    canActivate: [AuthguardService],
  },
  {
    path: 'member-report',
    component: MemberReportComponent,
    pathMatch: 'full',
    canActivate: [AuthguardService],
  },
  {
    path: 'book-report',
    component: BookReportComponent,
    pathMatch: 'full',
    canActivate: [AuthguardService],
  },
  {
    path: 'bookanalytics',
    component: BooksAnalyticsComponent,
    pathMatch: 'full',
    canActivate: [AuthguardService],
  },
  {
    path: 'expense',
    component: ExpenseComponent,
    pathMatch: 'full',
    canActivate: [AuthguardService],
  },
  {
    path: 'income',
    component: IncomeComponent,
    pathMatch: 'full',
    canActivate: [AuthguardService],
  },
  {
    path: 'smssettings',
    component: SettingsSmsComponent,
    pathMatch: 'full',
    canActivate: [AuthguardService],
  },
  {
    path: 'emailsettings',
    component: EmailSettingComponent,
    pathMatch: 'full',
    canActivate: [AuthguardService],
  },
  {
    path: 'returnedbook',
    component: ReturnedBooksComponent,
    pathMatch: 'full',
    canActivate: [AuthguardService],
  },
  {
    path: 'search/:search',
    component: SeachResultComponent,
    pathMatch: 'full',
    canActivate: [AuthguardService],
  },
  {
    path: 'book',
    component: BookComponent,
    pathMatch: 'full',
    canActivate: [AuthguardService],
  },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  {
    path: 'settings',
    component: SettingsComponent,
    pathMatch: 'full',
    canActivate: [AuthguardService],
  },
  {
    path: 'type-member',
    component: TypeMemberComponent,
    pathMatch: 'full',
    canActivate: [AuthguardService],
  },
  {
    path: 'category',
    component: CategoryComponent,
    pathMatch: 'full',
    canActivate: [AuthguardService],
  },
  {
    path: 'member',
    component: MemberComponent,
    pathMatch: 'full',
    canActivate: [AuthguardService],
  },
  {
    path: 'writer',
    component: WriterComponent,
    pathMatch: 'full',
    canActivate: [AuthguardService],
  },
  {
    path: 'requested-book',
    component: RequiredBookComponent,
    pathMatch: 'full',
    canActivate: [AuthguardService],
  },
  {
    path: 'circulation',
    component: CirculationComponent,
    pathMatch: 'full',
    canActivate: [AuthguardService],
  },
  {
    path: 'circulation-status',
    component: CirculationStatusComponent,
    pathMatch: 'full',
    canActivate: [AuthguardService],
  },
  {
    path: 'ebook',
    component: EbookComponent,
    pathMatch: 'full',
    canActivate: [AuthguardService],
  },
  {
    path: 'publisher',
    component: PublisherComponent,
    pathMatch: 'full',
    canActivate: [AuthguardService],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    pathMatch: 'full',
    canActivate: [AuthguardService],
  },
  {
    path: 'archived-books',
    component: ArchivedBookComponent,
    pathMatch: 'full',
    canActivate: [AuthguardService],
  },
  {
    path: 'destroyed-books',
    component: DestroyedBooksComponent,
    pathMatch: 'full',
    canActivate: [AuthguardService],
  },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    FooterComponent,
    TopbarComponent,
    EbookComponent,
    StatusDirective,
    LoginComponent,
    ArvivedBookListComponent,
    ArchivedBookComponent,
    DestroyedBooksComponent,
    DestroyedBooksListComponent,
    ReturnedBooksComponent,
    ReturnedBooksListComponent,
    EmailSettingComponent,
    SettingsEmailListComponent,
    SettingsSmsListComponent,
    BooksAnalyticsComponent,
    BookReportComponent,
    MemberReportComponent,
    CirculationReportComponent,
    AccountAnalyticsComponent,
  ],
  imports: [
    PaymentModule,
    BookModule,
    SettingsModule,
    CirculationStatusModule,
    CirculationsModule,
    MemberrModule,
    TypememberModule,
    WriterModule,
    PublishersModule,
    RequestedBooksModule,
    CategoryModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
    HttpClientModule,
    CommonModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    AccountModule,
    DashboardModule,
  ],
  providers: [{ provide: APP_BASE_HREF, useValue: '' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
