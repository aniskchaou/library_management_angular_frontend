import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { URLLoader } from 'src/app/main/configs/URLLoader';
import PaymentMessage from 'src/app/main/messages/paymentMessage';
import Member from 'src/app/main/models/Member';
import { HTTPService } from 'src/app/main/services/HTTPService';
import CONFIG from 'src/app/main/urls/urls';
import PaymentValidation from 'src/app/main/validations/PaymentValidation';

@Component({
  selector: 'app-payment-member',
  templateUrl: './payment-member.component.html',
  styleUrls: ['./payment-member.component.css'],
})
export class PaymentMemberComponent extends URLLoader implements OnInit {
  paymentForm: FormGroup;
  msg: PaymentMessage;
  submitted = false;
  @Output() closeModalEvent = new EventEmitter<string>();
  paymentI18n;
  selectedFile: File;
  retrievedImage: any;
  base64Data: any;
  members$: Member[];

  constructor(
    private validation: PaymentValidation,
    private message: PaymentMessage,
    private httpService: HTTPService,
    private router: Router
  ) {
    super();
    this.paymentForm = this.validation.formGroupInstance;
    this.msg = this.message;
  }

  closeModal() {
    this.closeModalEvent.emit();
  }

  goBack() {
    this.router
      .navigateByUrl('/dashboard', { skipLocationChange: true })
      .then(() => {
        this.router.navigate(['/payment']);
      });
  }
  get f() {
    return this.paymentForm.controls;
  }

  ngOnInit(): void {
    this.getPaymentByLang(CONFIG.getInstance().getLang());
    this.getMembers();
  }

  reset() {
    this.paymentForm.reset();
  }

  add() {
    this.submitted = true;
    if (this.validation.checkValidation()) {
      this.httpService.create(
        CONFIG.URL_BASE + '/payment/create',
        this.paymentForm.value
      );
      this.paymentForm.reset();
      this.closeModal();
      this.goBack();
      super.show(
        'Confirmation',
        this.msg.addConfirmation[CONFIG.getInstance().getLang()],
        'success'
      );
    }
  }

  getMembers() {
    this.httpService.getAll(CONFIG.URL_BASE + '/member/all').subscribe(
      (data: Member[]) => {
        this.members$ = data;
      },
      (err: HttpErrorResponse) => {
        super.show('Error', err.message, 'error');
      }
    );
  }

  getPaymentByLang(lang) {
    this.httpService
      .getAll(CONFIG.URL_BASE + '/i18n/payment/' + lang)
      .subscribe(
        (data) => {
          this.paymentI18n = data;
        },
        (err: HttpErrorResponse) => {
          super.show('Error', err.message, 'warning');
        }
      );
  }
}
