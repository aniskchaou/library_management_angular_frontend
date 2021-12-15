import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavigationComponent } from './template/navigation/navigation.component';
import { RouterModule, Routes } from '@angular/router';
import { APP_BASE_HREF, CommonModule } from '@angular/common';

import { BookComponent } from './modules/book/book/book.component';
import { AddBookComponent } from './modules/book/add-book/add-book.component';
import { EditBookComponent } from './modules/book/edit-book/edit-book.component';

import { DashboardComponent } from './modules/dashboard/dashboard.component';
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

const routes: Routes = [
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
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    DashboardComponent,
    FooterComponent,
    TopbarComponent,
    EbookComponent,
    StatusDirective,
    LoginComponent,
  ],
  imports: [
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
    RouterModule.forRoot(routes),
    HttpClientModule,
    CommonModule,
  ],
  providers: [{ provide: APP_BASE_HREF, useValue: '' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
