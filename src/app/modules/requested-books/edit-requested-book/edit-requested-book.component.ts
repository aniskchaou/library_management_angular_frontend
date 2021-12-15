import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { URLLoader } from 'src/app/main/configs/URLLoader';
import CategoryMessage from 'src/app/main/messages/CategoryMessage';
import RequestedBook from 'src/app/main/models/RequestedBook';
import { HTTPService } from 'src/app/main/services/HTTPService';
import CONFIG from 'src/app/main/urls/urls';

@Component({
  selector: 'app-edit-requested-book',
  templateUrl: './edit-requested-book.component.html',
  styleUrls: ['./edit-requested-book.component.css'],
})
export class EditRequestedBookComponent extends URLLoader implements OnInit {
  model;
  @Input() id: string;
  @Output() closeModalEvent = new EventEmitter<string>();
  requestedBookI18n;

  constructor(
    private httpService: HTTPService,
    private message: CategoryMessage
  ) {
    super();
    this.model = this.create();
  }

  closeModal() {
    this.closeModalEvent.emit();
  }

  create() {
    return new RequestedBook(0, '', '', '', '', '', '');
  }

  ngOnInit(): void {
    this.getRequestedBookByLang(CONFIG.LANG);
  }

  ngOnChanges(changes: any) {
    if (this.id != undefined) {
      this.httpService
        .get(CONFIG.URL_BASE + '/requestedbook/create' + this.id)
        .subscribe((data: RequestedBook) => {
          this.model = data;
          console.log(this.model);
        });
    }
  }

  edit() {
    this.httpService
      .create(CONFIG.URL_BASE + '/requestedbook/create', this.model)
      .then(() => {
        this.closeModal();
        super.show(
          'Confirmation',
          this.message.confirmationMessages.add,
          'success'
        );
      });
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
}
