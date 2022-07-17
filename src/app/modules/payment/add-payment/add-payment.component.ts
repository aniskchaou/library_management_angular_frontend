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
  selector: 'app-add-payment',
  templateUrl: './add-payment.component.html',
  styleUrls: ['./add-payment.component.css'],
})
export class AddPaymentComponent extends URLLoader implements OnInit {
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
    this.httpService
      .getAll(
        CONFIG.URL_BASE + '/i18n/payment/' + CONFIG.getInstance().getLang()
      )
      .subscribe(
        (data) => {
          this.paymentI18n = data;
        },
        (err: HttpErrorResponse) => {
          super.show('Error', err.message, 'warning');
        }
      );
  }

  reset() {
    this.paymentForm.reset();
  }

  add() {
    this.paymentForm.value.memberName = this.members$.filter(
      (x) => x.id == parseInt(this.paymentForm.value.memberName)
    )[0];
    this.submitted = true;
    if (this.validation.checkValidation()) {
      this.httpService.create(
        CONFIG.URL_BASE + '/payment/create',
        this.paymentForm.value
      );
      console.log(this.paymentForm.value);
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
