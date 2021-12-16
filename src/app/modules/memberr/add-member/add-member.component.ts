import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { URLLoader } from 'src/app/main/configs/URLLoader';
import MemberMessage from 'src/app/main/messages/MemberMessage';
import MemberTestService from 'src/app/main/mocks/MemberTestService';
import { HTTPService } from 'src/app/main/services/HTTPService';
import CONFIG from 'src/app/main/urls/urls';
import MemberValidation from 'src/app/main/validations/MemberValidation';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.css'],
})
export class AddMemberComponent extends URLLoader implements OnInit {
  memberForm: FormGroup;
  msg: MemberMessage;
  submitted = false;
  @Output() closeModalEvent = new EventEmitter<string>();
  memberI18n;

  closeModal() {
    this.closeModalEvent.emit();
  }

  goBack() {
    this.router
      .navigateByUrl('/dashboard', { skipLocationChange: true })
      .then(() => {
        this.router.navigate(['/member']);
      });
  }

  get f() {
    return this.memberForm.controls;
  }

  constructor(
    private validation: MemberValidation,
    private message: MemberMessage,
    private router: Router,
    private httpService: HTTPService
  ) {
    super();
    this.memberForm = this.validation.formGroupInstance;
    this.msg = this.message;
  }

  ngOnInit(): void {
    this.getMemberByLang(CONFIG.getInstance().getLang());
  }

  reset() {
    this.memberForm.reset();
  }

  getMemberByLang(lang) {
    // this.appointements$ = this.appointmentTestService.getAll()
    this.httpService.getAll(CONFIG.URL_BASE + '/i18n/member/' + lang).subscribe(
      (data) => {
        this.memberI18n = data;
        console.log(this.memberI18n);
        //document.getElementById('table').DataTable().ajax.reload();
      },
      (err: HttpErrorResponse) => {
        super.show('Error', err.message, 'error');
      }
    );
  }

  add() {
    this.submitted = true;

    if (this.validation.checkValidation()) {
      // this.memberTestService.create(this.memberForm.value);
      this.httpService
        .create(CONFIG.URL_BASE + '/member/create', this.memberForm.value)
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
}
