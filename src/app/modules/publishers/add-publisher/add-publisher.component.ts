import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { URLLoader } from 'src/app/main/configs/URLLoader';
import BookMessage from 'src/app/main/messages/BookMessage';
import PublisherMessage from 'src/app/main/messages/PublisherMessage';
import { HTTPService } from 'src/app/main/services/HTTPService';
import CONFIG from 'src/app/main/urls/urls';
import PublisherValidation from 'src/app/main/validations/PublisherValidation';

@Component({
  selector: 'app-add-publisher',
  templateUrl: './add-publisher.component.html',
  styleUrls: ['./add-publisher.component.css'],
})
export class AddPublisherComponent extends URLLoader implements OnInit {
  publisherForm: FormGroup;
  msg: PublisherMessage;
  submitted = false;
  @Output() closeModalEvent = new EventEmitter<string>();
  publisherI18n;

  constructor(
    private validation: PublisherValidation,
    private message: PublisherMessage,
    private httpService: HTTPService,
    private router: Router
  ) {
    super();
    this.publisherForm = this.validation.formGroupInstance;
    this.msg = this.message;
  }

  closeModal() {
    this.closeModalEvent.emit();
  }

  goBack() {
    this.router
      .navigateByUrl('/dashboard', { skipLocationChange: true })
      .then(() => {
        this.router.navigate(['/publisher']);
      });
  }

  get f() {
    return this.publisherForm.controls;
  }

  ngOnInit(): void {
    this.getPublisherByLang(CONFIG.getInstance().getLang());
  }

  getPublisherByLang(lang) {
    this.httpService
      .getAll(CONFIG.URL_BASE + '/i18n/publisher/' + lang)
      .subscribe(
        (data) => {
          this.publisherI18n = data;
        },
        (err: HttpErrorResponse) => {
          super.show('Error', err.message, 'error');
        }
      );
  }

  reset() {
    this.publisherForm.reset();
  }

  add() {
    this.submitted = true;
    if (this.validation.checkValidation()) {
      this.httpService.create(
        CONFIG.URL_BASE + '/publisher/create',
        this.publisherForm.value
      );
      this.closeModal();
      this.goBack();
      super.show('Confirmation', this.msg.confirmationMessages.add, 'success');
    }
  }
}
