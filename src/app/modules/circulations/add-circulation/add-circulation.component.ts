import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { URLLoader } from 'src/app/main/configs/URLLoader';
import BookMessage from 'src/app/main/messages/BookMessage';
import CirculationMessage from 'src/app/main/messages/CirculationMessage';
import Book from 'src/app/main/models/Book';
import CirculationStatus from 'src/app/main/models/CirculationStatus';
import Member from 'src/app/main/models/Member';
import { HTTPService } from 'src/app/main/services/HTTPService';
import CONFIG from 'src/app/main/urls/urls';
import CirculationValidation from 'src/app/main/validations/CirculationValidation';
import { URL } from 'url';

@Component({
  selector: 'app-add-circulation',
  templateUrl: './add-circulation.component.html',
  styleUrls: ['./add-circulation.component.css'],
})
export class AddCirculationComponent extends URLLoader implements OnInit {
  circulationForm: FormGroup;
  msg: CirculationMessage;
  submitted = false;
  memberNames$ = [];
  bookNames$ = [];
  returnStatus$ = [];
  writers$ = [];

  @Output() closeModalEvent = new EventEmitter<string>();
  circulationI18n;

  closeModal() {
    this.closeModalEvent.emit();
  }

  goBack() {
    this.router
      .navigateByUrl('/dashboard', { skipLocationChange: true })
      .then(() => {
        this.router.navigate(['/circulation']);
      });
  }

  get f() {
    return this.circulationForm.controls;
  }

  constructor(
    private validation: CirculationValidation,
    private message: CirculationMessage,
    private httpService: HTTPService,
    private router: Router
  ) {
    super();
    this.circulationForm = this.validation.formGroupInstance;
    this.msg = this.message;
  }

  ngOnInit(): void {
    this.getBooks();
    this.getCirculationStatus();
    this.getMembers();
    this.getWriters();
    this.getCirculationByLang(CONFIG.LANG);
  }

  getCirculationByLang(lang) {
    this.httpService
      .getAll(CONFIG.URL_BASE + '/i18n/circulation/' + lang)
      .subscribe(
        (data) => {
          this.circulationI18n = data;
        },
        (err: HttpErrorResponse) => {
          super.show('Error', err.message, 'error');
        }
      );
  }

  reset() {
    this.circulationForm.reset();
  }

  add() {
    this.submitted = true;
    this.circulationForm.value.memberName = this.memberNames$.filter(
      (x) => x.id == parseInt(this.circulationForm.value.memberName)
    )[0];
    this.circulationForm.value.bookName = this.bookNames$.filter(
      (x) => x.id == parseInt(this.circulationForm.value.bookName)
    )[0];
    this.circulationForm.value.returnStatus = this.returnStatus$.filter(
      (x) => x.id == parseInt(this.circulationForm.value.returnStatus)
    )[0];
    this.circulationForm.value.writer = this.writers$.filter(
      (x) => x.id == parseInt(this.circulationForm.value.writer)
    )[0];
    if (this.validation.checkValidation()) {
      console.log(this.circulationForm.value);
      this.httpService
        .create(
          CONFIG.URL_BASE + '/circulation/create',
          this.circulationForm.value
        )
        .then(() => {
          console.log(this.circulationForm.value);
          this.closeModal();
          this.goBack();
        });
      super.show('Confirmation', this.msg.confirmationMessages.add, 'success');
    }
  }

  getMembers() {
    this.httpService.getAll(CONFIG.URL_BASE + '/member/all').subscribe(
      (data: Member[]) => {
        this.memberNames$ = data;
        console.log(this.memberNames$);
      },
      (err: HttpErrorResponse) => {
        super.show('Error', err.message, 'error');
      }
    );
  }

  getBooks() {
    this.httpService.getAll(CONFIG.URL_BASE + '/book/all').subscribe(
      (data: Book[]) => {
        this.bookNames$ = data;
        console.log(this.bookNames$);
      },
      (err: HttpErrorResponse) => {
        super.show('Error', err.message, 'error');
      }
    );
  }

  getWriters() {
    this.httpService.getAll(CONFIG.URL_BASE + '/writer/all').subscribe(
      (data: Book[]) => {
        this.writers$ = data;
      },
      (err: HttpErrorResponse) => {
        super.show('Error', err.message, 'error');
      }
    );
  }

  getCirculationStatus() {
    this.httpService
      .getAll(CONFIG.URL_BASE + '/circulationstatus/all')
      .subscribe(
        (data: CirculationStatus[]) => {
          this.returnStatus$ = data;
        },
        (err: HttpErrorResponse) => {
          super.show('Error', err.message, 'error');
        }
      );
  }
}
