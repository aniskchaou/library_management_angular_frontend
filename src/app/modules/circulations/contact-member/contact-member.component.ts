import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { URLLoader } from 'src/app/main/configs/URLLoader';
import { HTTPService } from 'src/app/main/services/HTTPService';
import CONFIG from 'src/app/main/urls/urls';
import ContactValidation from 'src/app/main/validations/ContactValidation';

@Component({
    selector: 'app-contact-member',
    templateUrl: './contact-member.component.html',
    styleUrls: ['./contact-member.component.css'],
    standalone: false
})
export class ContactMemberComponent extends URLLoader implements OnInit, OnChanges {
  contactForm: UntypedFormGroup;
  @Output() closeModalEvent = new EventEmitter<string>();
  @Input() email: string;
  @Input() mobile: string;
  @Input() circulationI18n: any;
  @Input() reminderMessage: string;
  notificationType: 'email' | 'sms' = 'email';
  sending = false;

  constructor(
    private httpService: HTTPService,
    private router: Router,
    private validation: ContactValidation
  ) {
    super();
    this.contactForm = this.validation.formGroupInstance;
  }

  get f() {
    return this.contactForm.controls;
  }

  closeModal() {
    this.closeModalEvent.emit();
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['reminderMessage'] && this.reminderMessage) {
      this.contactForm.patchValue({ body: this.reminderMessage });
    }
    if (changes['mobile'] && this.mobile) {
      this.notificationType = 'sms';
    }
  }

  add() {
    this.sending = true;
    if (this.notificationType === 'sms') {
      const bodySms = {
        toEmail: this.mobile,
        subject: 'Library Reminder',
        body: this.contactForm.value.body
      };
      this.httpService
        .create(CONFIG.URL_BASE + '/notice/send-sms', bodySms)
        .finally(() => {
          this.contactForm.reset();
          this.sending = false;
          this.closeModal();
          super.show('Confirmation', 'SMS reminder sent!', 'success');
        });
    } else {
      const bodyEmail = {
        toEmail: this.email,
        subject: 'Library Reminder',
        body: this.contactForm.value.body
      };
      this.httpService
        .create(CONFIG.URL_BASE + '/notice/send', bodyEmail)
        .finally(() => {
          this.contactForm.reset();
          this.sending = false;
          this.closeModal();
          super.show('Confirmation', 'Email reminder sent!', 'success');
        });
    }
  }

  reset() {
    this.contactForm.reset();
  }

  /* closeModal() {
    this.closeModalEvent.emit();
  } */

  goBack() {
    this.router
      .navigateByUrl('/dashboard', { skipLocationChange: true })
      .then(() => {
        this.router.navigate(['/payment']);
      });
  }
}
