import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberListComponent } from './member-list/member-list.component';
import { MemberComponent } from './member/member.component';
import { AddMemberComponent } from './add-member/add-member.component';
import { EditMemberComponent } from './edit-member/edit-member.component';
import { MemberModalComponent } from './member-modal/member-modal.component';
import { viewClassName } from '@angular/compiler';
import MemberValidation from 'src/app/main/validations/MemberValidation';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from '../shared/shared.module';
import { ViewMemberComponent } from './view-member/view-member.component';

@NgModule({
  declarations: [
    MemberListComponent,
    MemberComponent,
    AddMemberComponent,
    EditMemberComponent,
    MemberModalComponent,
    ViewMemberComponent,
  ],
  imports: [
    SharedModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
  ],
  providers: [MemberValidation],
})
export class MemberrModule {}
