import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { URLLoader } from 'src/app/main/configs/URLLoader';
import TypeMemberMessage from 'src/app/main/messages/TypeMemberMessage';
import MemberTypeTestService from 'src/app/main/mocks/MemberTypeTestService';
import { HTTPService } from 'src/app/main/services/HTTPService';
import CONFIG from 'src/app/main/urls/urls';
import TypeMemberValidation from 'src/app/main/validations/TypeMemberValidation';

@Component({
  selector: 'app-add-type-member',
  templateUrl: './add-type-member.component.html',
  styleUrls: ['./add-type-member.component.css'],
})
export class AddTypeMemberComponent extends URLLoader implements OnInit {
  typeMemberForm: FormGroup;
  msg: TypeMemberMessage;
  submitted = false;
  @Output() closeModalEvent = new EventEmitter<string>();
  typeMemberI18n;

  closeModal() {
    this.closeModalEvent.emit();
  }

  goBack() {
    this.router
      .navigateByUrl('/dashboard', { skipLocationChange: true })
      .then(() => {
        this.router.navigate(['/type-member']);
      });
  }

  get f() {
    return this.typeMemberForm.controls;
  }

  constructor(
    private validation: TypeMemberValidation,
    private message: TypeMemberMessage,
    private typeMemberTestService: MemberTypeTestService,
    private router: Router,
    private httpService: HTTPService
  ) {
    super();
    this.typeMemberForm = this.validation.formGroupInstance;
    this.msg = this.message;
  }

  ngOnInit(): void {
    this.getTypeMemberByLang(CONFIG.getInstance().getLang());
  }

  reset() {
    this.typeMemberForm.reset();
  }

  add() {
    this.submitted = true;
    if (this.validation.checkValidation()) {
      this.httpService
        .create(
          CONFIG.URL_BASE + '/typemember/create',
          this.typeMemberForm.value
        )
        .then(() => {
          this.reset();
          this.closeModal();
          this.goBack();
          super.show(
            'Confirmation',
            this.msg.confirmationMessages.add,
            'success'
          );
        });
      super.show('Confirmation', this.msg.confirmationMessages.add, 'success');
    }
  }

  getTypeMemberByLang(lang) {
    this.httpService
      .getAll(CONFIG.URL_BASE + '/i18n/typemember/' + lang)
      .subscribe(
        (data) => {
          this.typeMemberI18n = data;
        },
        (err: HttpErrorResponse) => {
          super.show('Error', err.message, 'error');
        }
      );
  }
}
