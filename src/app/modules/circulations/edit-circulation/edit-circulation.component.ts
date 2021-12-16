import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { URLLoader } from 'src/app/main/configs/URLLoader';
import CategoryMessage from 'src/app/main/messages/CategoryMessage';
import Book from 'src/app/main/models/Book';
import Circulation from 'src/app/main/models/Circulation';
import CirculationStatus from 'src/app/main/models/CirculationStatus';
import Member from 'src/app/main/models/Member';
import { HTTPService } from 'src/app/main/services/HTTPService';
import CONFIG from 'src/app/main/urls/urls';

@Component({
  selector: 'app-edit-circulation',
  templateUrl: './edit-circulation.component.html',
  styleUrls: ['./edit-circulation.component.css'],
})
export class EditCirculationComponent extends URLLoader implements OnInit {
  model: Circulation;
  @Input() id: string;
  @Output() closeModalEvent = new EventEmitter<string>();
  memberNames$: Member[];
  writers$: Book[];
  returnStatus$: CirculationStatus[];
  bookNames$: Book[];
  circulationI18n: Object;

  closeModal() {
    this.closeModalEvent.emit();
  }

  constructor(
    private httpService: HTTPService,
    private message: CategoryMessage,
    private router: Router
  ) {
    super();
  }

  ngOnChanges(changes: any) {
    this.getCirculation();
  }

  getCirculation() {
    console.log(this.id);
    if (this.id) {
      this.httpService
        .get(CONFIG.URL_BASE + '/circulation/' + this.id)
        .subscribe((data: Circulation) => {
          this.model = data;
        });
    }
  }

  ngOnInit(): void {
    // this.getCirculation();
    this.getBooks();
    this.getWriters();
    this.getMembers();
    this.getCirculationStatus();
    this.getCirculationByLang(CONFIG.getInstance().getLang());
  }

  edit() {
    this.httpService
      .create(CONFIG.URL_BASE + '/circulation/create', this.model)
      .then(() => {
        super.show(
          'Confirmation',
          this.message.confirmationMessages.add,
          'success'
        );
        this.closeModal();
        this.goBack();
      });
  }

  getMembers() {
    this.httpService.getAll(CONFIG.URL_BASE + '/member/all').subscribe(
      (data: Member[]) => {
        this.memberNames$ = data;
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

  goBack() {
    this.router
      .navigateByUrl('/dashboard', { skipLocationChange: true })
      .then(() => {
        this.router.navigate(['/circulation']);
      });
  }
}
