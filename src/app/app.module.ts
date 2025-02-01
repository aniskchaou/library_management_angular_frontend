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
import { NgxChartsModule, TooltipModule } from '@swimlane/ngx-charts';
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
import { BookingSettingsComponent } from './modules/booking-settings/booking-settings/booking-settings.component';
import { BulkActionsComponent } from './modules/bulk-actions/bulk-actions/bulk-actions.component';
import { AddCatalogCopyComponent } from './modules/catalog/add-catalog-copy/add-catalog-copy.component';
import { TagsComponent } from './modules/tags/tags/tags.component';
import { ItemTypesComponent } from './modules/item-types/item-types/item-types.component';
import { CheckInComponent } from './modules/circulations/check-in/check-in.component';
import { CheckOutComponent } from './modules/circulations/check-out/check-out.component';
import { RenewComponent } from './modules/circulations/renew/renew.component';
import { HoldComponent } from './modules/circulations/hold/hold.component';
import { OverdueComponent } from './modules/overdue/overdue/overdue.component';
import { OverdueFinesComponent } from './modules/overdue/overdue-fines/overdue-fines.component';
import { CirculationRulesComponent } from './modules/circulations/circulation-rules/circulation-rules.component';
import { PhysicalDescriptionComponent } from './modules/setup/physical-description/physical-description.component';
import { RowComponent } from './modules/setup/row/row.component';
import { ShelfComponent } from './modules/setup/shelf/shelf.component';
import { DepartementComponent } from './modules/setup/departement/departement.component';
import { VendorComponent } from './modules/acquisition/vendor/vendor.component';
import { BasketComponent } from './modules/acquisition/basket/basket.component';
import { ContractComponent } from './modules/acquisition/contract/contract.component';
import { OrderComponent } from './modules/acquisition/order/order.component';
import { PurshaseSuggestionComponent } from './modules/acquisition/purshase-suggestion/purshase-suggestion.component';
import { BudgetComponent } from './modules/account/budget/budget.component';
import { FundComponent } from './modules/account/fund/fund.component';
import { QrCodeComponent } from './modules/identification/qr-code/qr-code.component';
import { InvoiceComponent } from './modules/acquisition/invoice/invoice.component';
import { NoticeComponent } from './modules/notice/notice/notice.component';
import { NoticeTemplateComponent } from './modules/notice/notice-template/notice-template.component';
import { AdvancedSearchComponent } from './modules/book/advanced-search/advanced-search.component';
import { BarCodeComponent } from './modules/identification/bar-code/bar-code.component';
import { MarkdownModule } from 'ngx-markdown';
import { DepartmentModalComponentComponent } from './modules/setup/department-modal-component/department-modal-component.component';
import { NgbModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { ShelfModalComponent } from './modules/setup/shelf-modal/shelf-modal.component';
import { RowModalComponent } from './modules/setup/row-modal/row-modal.component';
import { PhysicalDescriptionModalComponent } from './modules/setup/physical-description-modal/physical-description-modal.component';
import { QrCodeModalComponent } from './modules/identification/qr-code-modal/qr-code-modal.component';
import { BarCodeModalComponent } from './modules/identification/bar-code-modal/bar-code-modal.component';
import { BasketModalComponent } from './modules/acquisition/basket-modal/basket-modal.component';
import { VendorModalComponent } from './modules/acquisition/vendor-modal/vendor-modal.component';
import { ContractModalComponent } from './modules/acquisition/contract-modal/contract-modal.component';
import { OrderModalComponent } from './modules/acquisition/order-modal/order-modal.component';
import { InvoiceModalComponent } from './modules/acquisition/invoice-modal/invoice-modal.component';
import { PurshaseSuggestionModalComponent } from './modules/acquisition/purshase-suggestion-modal/purshase-suggestion-modal.component';
import { NoticeModalComponent } from './modules/notice/notice-modal/notice-modal.component';
import { NoticeTemplateModalComponent } from './modules/notice/notice-template-modal/notice-template-modal.component';
import { TooltipDirective } from './main/directives/tooltip.directive';
import { PhoneFormatPipe } from './modules/setup/phone-format.pipe';
import { LoadingComponent } from './modules/shared/loading/loading.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { DepartmentListComponent } from './modules/setup/department-list/department-list.component';
import { RowListComponent } from './modules/setup/row-list/row-list.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { PhysicalDescriptionListComponent } from './physical-description-list/physical-description-list.component';
import { ChatbotComponent } from './modules/chatbot/chatbot/chatbot.component';
import { ViewCategoryComponent } from './modules/category/view-category/view-category.component';
import { ViewWriterComponent } from './modules/writer/view-writer/view-writer.component';
import { AddItemTypesComponent } from './modules/item-types/add-item-types/add-item-types.component';
import { ViewItemTypesComponent } from './modules/item-types/view-item-types/view-item-types.component';
import { ViewPublisherComponent } from './modules/publishers/view-publisher/view-publisher.component';
import { ViewTypeMemberComponent } from './modules/typemember/view-type-member/view-type-member.component';
import { DocumentationComponent } from './modules/help/documentation/documentation.component';
import { ViewQrcodeComponent } from './modules/identification/view-qrcode/view-qrcode.component';
import { BarcodeViewComponent } from './modules/identification/barcode-view/barcode-view.component';
import { ShelfViewerComponent } from './modules/book/shelf-viewer/shelf-viewer.component';
import { ToastrModule } from 'ngx-toastr';
import { UploadDocumentComponent } from './modules/acquisition/upload-document/upload-document.component';
import { ViewContractComponent } from './modules/acquisition/view-contract/view-contract.component';
import { UploadDocumentMemberComponent } from './modules/memberr/upload-document-member/upload-document-member.component';
import { ViewUserProfileComponent } from './modules/shared/view-user-profile/view-user-profile.component';
import { UploadProfilePhotoComponent } from './modules/shared/upload-profile-photo/upload-profile-photo.component';
import { EditPasswordComponent } from './modules/shared/edit-password/edit-password.component';
import { UploadAppLogoComponent } from './modules/shared/upload-app-logo/upload-app-logo.component';
import { RegisterUserComponent } from './modules/shared/register-user/register-user.component';
import { ForgotPasswordComponent } from './modules/shared/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './modules/shared/reset-password/reset-password.component';
import { EditItemTypesComponent } from './modules/item-types/edit-item-types/edit-item-types.component';
import { TwilioSettingsComponent } from './modules/settings/twilio-settings/twilio-settings.component';
import { OpenaiSettingsComponent } from './modules/settings/openai-settings/openai-settings.component';
import { UploadBookCoverComponent } from './modules/book/upload-book-cover/upload-book-cover.component';
import { PaypalSettingsComponent } from './modules/settings/paypal-settings/paypal-settings.component';
import { ShowContentDocPageComponent } from './modules/help/show-content-doc-page/show-content-doc-page.component';



const routes: Routes = [
  {
    path: 'circulation-calendar',
    component: CirculationCalendarComponent,
    pathMatch: 'full',
    canActivate: [AuthguardService],
  },
  {
    path: 'overdue-fines',
    component: OverdueFinesComponent,
    pathMatch: 'full',
    canActivate: [AuthguardService],
  },
  {
    path: 'vendor',
    component: VendorComponent,
    pathMatch: 'full',
    canActivate: [AuthguardService],
  },{
    path: 'basket',
    component: BasketComponent,
    pathMatch: 'full',
    canActivate: [AuthguardService],
  },{
    path: 'budget',
    component: BudgetComponent,
    pathMatch: 'full',
    canActivate: [AuthguardService],
  },{
    path: 'invoice',
    component: InvoiceComponent,
    pathMatch: 'full',
    canActivate: [AuthguardService],
  },{
    path: 'notice',
    component: NoticeComponent,
    pathMatch: 'full',
    canActivate: [AuthguardService],
  },
  {
    path: 'notice-template',
    component: NoticeTemplateComponent,
    pathMatch: 'full',
    canActivate: [AuthguardService],
  },{
    path: 'advanced-search',
    component: AdvancedSearchComponent,
    pathMatch: 'full',
    canActivate: [AuthguardService],
  },{
    path: 'bar-code',
    component: BarCodeComponent,
    pathMatch: 'full',
    canActivate: [AuthguardService],
  },{
    path: 'qr-code',
    component: QrCodeComponent,
    pathMatch: 'full',
    canActivate: [AuthguardService],
  },{
    path: 'fund',
    component: FundComponent,
    pathMatch: 'full',
    canActivate: [AuthguardService],
  },{
    path: 'contract',
    component: ContractComponent,
    pathMatch: 'full',
    canActivate: [AuthguardService],
  },{
    path: 'order',
    component: OrderComponent,
    pathMatch: 'full',
    canActivate: [AuthguardService],
  },
  {
    path: 'purshase-suggestion',
    component: PurshaseSuggestionComponent,
    pathMatch: 'full',
    canActivate: [AuthguardService],
  },
  {
    path: 'row',
    component: RowComponent,
    pathMatch: 'full',
    canActivate: [AuthguardService],
  },
  {
    path: 'shelf',
    component: ShelfComponent,
    pathMatch: 'full',
    canActivate: [AuthguardService],
  },{
    path: 'departement',
    component: DepartementComponent,
    pathMatch: 'full',
    canActivate: [AuthguardService],
  },
  {
    path: 'physical-description',
    component: PhysicalDescriptionComponent,
    pathMatch: 'full',
    canActivate: [AuthguardService],
  },
  {
    path: 'overdue',
    component: OverdueComponent,
    pathMatch: 'full',
    canActivate: [AuthguardService],
  },
  {
    path: 'circulation-rules',
    component: CirculationRulesComponent,
    pathMatch: 'full',
    canActivate: [AuthguardService],
  },
  {
    path: 'booking-settings',
    component: BookingSettingsComponent,
    pathMatch: 'full',
    canActivate: [AuthguardService],
  },
  {
    path: 'bulk-actions',
    component: BulkActionsComponent,
    pathMatch: 'full',
    canActivate: [AuthguardService],
  },
  {
    path: 'tags',
    component: TagsComponent,
    pathMatch: 'full',
    canActivate: [AuthguardService],
  },
/*   {
    path: 'hold',
    component: HoldComponent,
    pathMatch: 'full',
    canActivate: [AuthguardService],
  }, */
  {
    path: 'item-types',
    component: ItemTypesComponent,
    pathMatch: 'full',
    canActivate: [AuthguardService],
  },
/*   {
    path: 'check-out',
    component: CheckOutComponent,
    pathMatch: 'full',
    canActivate: [AuthguardService],
  },
  {
    path: 'check-in',
    component: CheckInComponent,
    pathMatch: 'full',
    canActivate: [AuthguardService],
  },
  {
    path: 'renew',
    component: RenewComponent,
    pathMatch: 'full',
    canActivate: [AuthguardService],
  }, */
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
  {
    path: 'booking-settings',
    component: BookingSettingsComponent,
    pathMatch: 'full',
    canActivate: [AuthguardService],
  },{
    path: 'bulk-actions',
    component: BulkActionsComponent,
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
    path: 'help',
    component: DocumentationComponent,
    pathMatch: 'full',
    canActivate: [AuthguardService],
  },
  {
    path: 'profile',
    component: ViewUserProfileComponent,
    pathMatch: 'full',
    canActivate: [AuthguardService],
  },
  {
    path: 'shelf-viewer',
    component: ShelfViewerComponent,
    pathMatch: 'full',
    canActivate: [AuthguardService],
  },
  {
    path: 'register',
    component: RegisterUserComponent,
    pathMatch: 'full'
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    pathMatch: 'full'
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
    pathMatch: 'full'
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
    BookingSettingsComponent,
    BulkActionsComponent,
    AddCatalogCopyComponent,
    TagsComponent,
    ItemTypesComponent,
    CheckInComponent,
    CheckOutComponent,
    RenewComponent,
    HoldComponent,
    OverdueComponent,
    OverdueFinesComponent,
    CirculationRulesComponent,
    PhysicalDescriptionComponent,
    VendorComponent,
    BasketComponent,
    ContractComponent,
    OrderComponent,
    PurshaseSuggestionComponent,
    BudgetComponent,
    FundComponent,
    InvoiceComponent,
    BasketComponent,
    NoticeComponent,
    NoticeTemplateComponent,
    BarCodeComponent,
    QrCodeComponent,
    ShelfComponent,
    RowComponent,
    DepartementComponent,
    DepartmentModalComponentComponent,
    ShelfModalComponent,
    RowModalComponent,
    PhysicalDescriptionModalComponent,
    QrCodeModalComponent,
    BarCodeModalComponent,
    BasketModalComponent,
    VendorModalComponent,
    ContractModalComponent,
    OrderModalComponent,
    InvoiceModalComponent,
    PurshaseSuggestionModalComponent,
    NoticeModalComponent,
    NoticeTemplateModalComponent,
    PhoneFormatPipe,
    LoadingComponent,
    DepartmentListComponent,
    RowListComponent,
    PhysicalDescriptionListComponent,
    ChatbotComponent,
    ViewCategoryComponent,
    ViewWriterComponent,
    AddItemTypesComponent,
    ViewItemTypesComponent,
    ViewPublisherComponent,
    ViewTypeMemberComponent,
    DocumentationComponent,
    ViewQrcodeComponent,
    BarcodeViewComponent,
    ShelfViewerComponent,
    UploadDocumentComponent,
    ViewContractComponent,
    UploadDocumentMemberComponent,
    ViewUserProfileComponent,
    EditPasswordComponent,
    UploadProfilePhotoComponent,
    UploadAppLogoComponent,
    RegisterUserComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    EditItemTypesComponent,
    ShowContentDocPageComponent,
    //PaypalSettingsComponent
  ],
  imports: [
    NgSelectModule,
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
    NgxChartsModule,
    NgbModule,
    NgbTooltipModule,
    NgxDatatableModule,
    NgSelectModule,
    //MarkdownModule.forRoot()
  ],
  providers: [{ provide: APP_BASE_HREF, useValue: '' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
