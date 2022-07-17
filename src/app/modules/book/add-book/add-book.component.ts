import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { URLLoader } from 'src/app/main/configs/URLLoader';
import BookMessage from 'src/app/main/messages/BookMessage';
import BookTestService from 'src/app/main/mocks/BookTestService';
import Category from 'src/app/main/models/Category';
import Publisher from 'src/app/main/models/Publisher';
import Writer from 'src/app/main/models/Writer';
import { HTTPService } from 'src/app/main/services/HTTPService';
import CONFIG from 'src/app/main/urls/urls';
import BookValidation from 'src/app/main/validations/BookValidation';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css'],
})
export class AddBookComponent extends URLLoader implements OnInit {
  bookForm: FormGroup;
  msg: BookMessage;
  submitted = false;
  writers$ = [];
  publishers$ = [];

  @Output() closeModalEvent = new EventEmitter<string>();
  bookI18n;
  categories$ = [];

  closeModal() {
    this.closeModalEvent.emit();
  }

  goBack() {
    this.router
      .navigateByUrl('/dashboard', { skipLocationChange: true })
      .then(() => {
        this.router.navigate(['/book']);
      });
  }

  get f() {
    return this.bookForm.controls;
  }

  constructor(
    private validation: BookValidation,
    private message: BookMessage,
    //private bookTestService: BookTestService,
    private httpService: HTTPService,
    private router: Router
  ) {
    super();
    this.bookForm = this.validation.formGroupInstance;
    this.msg = this.message;
    //console.log(this.msg.validationMessage.isbn);
  }

  ngOnInit(): void {
    this.getcategories();
    this.getWriters();
    this.getPublishers();
    this.getBookByLang(CONFIG.getInstance().getLang());
  }

  getcategories() {
    this.httpService.getAll(CONFIG.URL_BASE + '/category/all').subscribe(
      (data: Category[]) => {
        this.categories$ = data;
      },
      (err: HttpErrorResponse) => {
        super.show('Error', err.message, 'warning');
      }
    );
  }

  reset() {
    this.bookForm.reset();
  }

  getWriters() {
    this.httpService.getAll(CONFIG.URL_BASE + '/writer/all').subscribe(
      (data: Writer[]) => {
        this.writers$ = data;
        console.log(this.writers$);
      },
      (err: HttpErrorResponse) => {
        super.show('Error', err.message, 'error');
      }
    );
  }

  getPublishers() {
    this.httpService.getAll(CONFIG.URL_BASE + '/publisher/all').subscribe(
      (data: Publisher[]) => {
        this.publishers$ = data;
        //console.log(this.publishers$);
      },
      (err: HttpErrorResponse) => {
        super.show('Error', err.message, 'error');
      }
    );
  }

  add() {
    this.submitted = true;
    this.bookForm.value.publisher = this.publishers$.filter(
      (x) => x.id == parseInt(this.bookForm.value.publisher)
    )[0];
    this.bookForm.value.writer = this.writers$.filter(
      (x) => x.id == parseInt(this.bookForm.value.writer)
    )[0];
    this.bookForm.value.category = this.categories$.filter(
      (x) => x.id == parseInt(this.bookForm.value.category)
    )[0];

    if (this.validation.checkValidation()) {
      console.log(this.bookForm.value);
      this.httpService
        .create(CONFIG.URL_BASE + '/book/create', this.bookForm.value)
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
    }
  }

  getBookByLang(lang) {
    this.httpService.getAll(CONFIG.URL_BASE + '/i18n/book/' + lang).subscribe(
      (data) => {
        this.bookI18n = data;
      },
      (err: HttpErrorResponse) => {
        super.show('Error', err.message, 'error');
      }
    );
  }
}
