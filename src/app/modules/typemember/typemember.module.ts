import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddTypeMemberComponent } from './add-type-member/add-type-member.component';
import { EditBookComponent } from '../book/edit-book/edit-book.component';
import { TypeMemberComponent } from './type-member/type-member.component';
import { TypememberListComponent } from './typemember-list/typemember-list.component';
import { ModalTypeMemberComponent } from './modal-type-member/modal-type-member.component';
import { EditTypeMemberComponent } from './edit-type-member/edit-type-member.component';
import TypeMemberValidation from 'src/app/main/validations/TypeMemberValidation';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    AddTypeMemberComponent,
    EditTypeMemberComponent,
    TypeMemberComponent,
    TypememberListComponent,
    ModalTypeMemberComponent,
  ],
  imports: [
    SharedModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
  ],
  providers: [TypeMemberValidation],
})
export class TypememberModule {}
