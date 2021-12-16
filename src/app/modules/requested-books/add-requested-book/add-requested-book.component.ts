import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { URLLoader } from 'src/app/main/configs/URLLoader';
import BookMessage from 'src/app/main/messages/BookMessage';
import RequestedBookMessage from 'src/app/main/messages/RequestedBookMessage';
import Member from 'src/app/main/models/Member';
import { HTTPService } from 'src/app/main/services/HTTPService';
import CONFIG from 'src/app/main/urls/urls';
import RequestedBookValidation from 'src/app/main/validations/RequestedBookValidation';

@Component({
  selector: 'app-add-requested-book',
  templateUrl: './add-requested-book.component.html',
  styleUrls: ['./add-requested-book.component.css'],
})
export class AddRequestedBookComponent extends URLLoader implements OnInit {
  requestedBookForm: FormGroup;
  msg: RequestedBookMessage;
  submitted = false;
  categories$;
  books$;
  members$;
  writers$;
  @Output() closeModalEvent = new EventEmitter<string>();
  requestedBookI18n;

  constructor(
    private validation: RequestedBookValidation,
    private message: RequestedBookMessage,
    private httpService: HTTPService,
    private router: Router
  ) {
    super();
    this.requestedBookForm = this.validation.formGroupInstance;
    this.msg = this.message;
  }

  closeModal() {
    this.closeModalEvent.emit();
  }

  get f() {
    return this.requestedBookForm.controls;
  }

  ngOnInit(): void {
    this.getBooks();
    this.getCategories();
    this.getMembers();
    this.getWriters();
    this.getRequestedBookByLang(CONFIG.getInstance().getLang());
  }

  reloadPage() {
    this.router
      .navigateByUrl('/dashboard', { skipLocationChange: true })
      .then(() => {
        this.router.navigate(['/requestedbook']);
      });
  }

  reset() {
    this.requestedBookForm.reset();
  }

  goBack() {
    this.router
      .navigateByUrl('/dashboard', { skipLocationChange: true })
      .then(() => {
        this.router.navigate(['/requested-book']);
      });
  }

  add() {
    this.submitted = true;
    this.requestedBookForm.value.book = this.books$.filter(
      (x) => x.id == parseInt(this.requestedBookForm.value.book)
    )[0];
    this.requestedBookForm.value.ctagory = this.categories$.filter(
      (x) => x.id == parseInt(this.requestedBookForm.value.ctagory)
    )[0];
    this.requestedBookForm.value.member = this.members$.filter(
      (x) => x.id == parseInt(this.requestedBookForm.value.member)
    )[0];
    this.requestedBookForm.value.writer = this.writers$.filter(
      (x) => x.id == parseInt(this.requestedBookForm.value.writer)
    )[0];
    console.log(this.requestedBookForm.value);
    if (this.validation.checkValidation()) {
      this.httpService
        .create(
          CONFIG.URL_BASE + '/requestedbook/create',
          this.requestedBookForm.value
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
    }
  }

  getRequestedBookByLang(lang) {
    this.httpService
      .getAll(CONFIG.URL_BASE + '/i18n/requestedbook/' + lang)
      .subscribe(
        (data) => {
          this.requestedBookI18n = data;
        },
        (err: HttpErrorResponse) => {
          super.show('Error', err.message, 'error');
        }
      );
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

  getBooks() {
    this.httpService.getAll(CONFIG.URL_BASE + '/book/all').subscribe(
      (data: Member[]) => {
        this.books$ = data;
      },
      (err: HttpErrorResponse) => {
        super.show('Error', err.message, 'error');
      }
    );
  }

  getCategories() {
    this.httpService.getAll(CONFIG.URL_BASE + '/category/all').subscribe(
      (data: Member[]) => {
        this.categories$ = data;
      },
      (err: HttpErrorResponse) => {
        super.show('Error', err.message, 'warning');
      }
    );
  }

  getWriters() {
    this.httpService.getAll(CONFIG.URL_BASE + '/writer/all').subscribe(
      (data: Member[]) => {
        this.writers$ = data;
      },
      (err: HttpErrorResponse) => {
        super.show('Error', err.message, 'warning');
      }
    );
  }
}
