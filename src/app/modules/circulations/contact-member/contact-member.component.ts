import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { URLLoader } from 'src/app/main/configs/URLLoader';
import { HTTPService } from 'src/app/main/services/HTTPService';
import CONFIG from 'src/app/main/urls/urls';
import ContactValidation from 'src/app/main/validations/ContactValidation';

@Component({
  selector: 'app-contact-member',
  templateUrl: './contact-member.component.html',
  styleUrls: ['./contact-member.component.css'],
})
export class ContactMemberComponent extends URLLoader implements OnInit {
  contactForm: FormGroup;
  @Output() closeModalEvent = new EventEmitter<string>();
  @Input() email;
  @Input() circulationI18n;
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

  add() {
    // this.submitted = true;
    //if (this.validation.checkValidation()) {
    this.sending = true;
    this.httpService
      .getAll(
        CONFIG.URL_BASE +
          '/email/sendemail/' +
          this.contactForm.value.body +
          '/test/' +
          this.email
      )
      .subscribe((data) => {
        this.contactForm.reset();
        this.sending = false;
        this.closeModal();

        super.show('Confirmation', 'Your email has been sent!', 'success');
      });
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
