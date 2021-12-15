import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { URLLoader } from 'src/app/main/configs/URLLoader';
import BookMessage from 'src/app/main/messages/BookMessage';
import { HTTPService } from 'src/app/main/services/HTTPService';
import CONFIG from 'src/app/main/urls/urls';
import EBookValidation from 'src/app/main/validations/EBookValidation';

@Component({
  selector: 'app-add-ebook',
  templateUrl: './add-ebook.component.html',
  styleUrls: ['./add-ebook.component.css'],
})
export class AddEbookComponent extends URLLoader implements OnInit {
  ebookForm: FormGroup;
  msg: BookMessage;
  submitted = false;

  @Output() closeModalEvent = new EventEmitter<string>();

  closeModal() {
    this.closeModalEvent.emit();
  }

  goBack() {
    this.router
      .navigateByUrl('/dashboard', { skipLocationChange: true })
      .then(() => {
        this.router.navigate(['/category']);
      });
  }

  get f() {
    return this.ebookForm.controls;
  }

  constructor(
    private validation: EBookValidation,
    private message: BookMessage,
    //private bookTestService: BookTestService,
    private httpService: HTTPService,
    private router: Router
  ) {
    super();
    this.ebookForm = this.validation.formGroupInstance;
    this.msg = this.message;
  }

  ngOnInit(): void {}

  reset() {
    this.ebookForm.reset();
  }

  add() {
    this.submitted = true;

    if (this.validation.checkValidation()) {
      //this.bookTestService.create(this.bookForm.value)
      this.httpService.create(
        CONFIG.URL_BASE + '/ebook/create',
        this.ebookForm.value
      );
      super.show('Confirmation', this.msg.confirmationMessages.add, 'success');
    }
  }
}
