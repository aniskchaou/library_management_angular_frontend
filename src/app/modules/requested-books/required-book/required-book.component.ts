import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { URLLoader } from 'src/app/main/configs/URLLoader';
import BookMessage from 'src/app/main/messages/BookMessage';
import RequestedBook from 'src/app/main/models/RequestedBook';
import { HTTPService } from 'src/app/main/services/HTTPService';
import CONFIG from 'src/app/main/urls/urls';

@Component({
  selector: 'app-required-book',
  templateUrl: './required-book.component.html',
  styleUrls: ['./required-book.component.css'],
})
export class RequiredBookComponent extends URLLoader implements OnInit {
  requiredBook$ = [{}];
  id;
  requestedBookI18n;

  constructor(
    private httpService: HTTPService,
    private messageService: BookMessage,
    private router: Router
  ) {
    super();
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

  edit(id) {
    this.id = id;
  }

  ngOnInit(): void {
    this.getAll();
    this.getRequestedBookByLang(CONFIG.LANG);
  }

  resolve() {
    super.show(
      'Information',
      'cette fonctionalités est en cours de développement.',
      'info'
    );
  }

  getAll() {
    this.httpService.getAll(CONFIG.URL_BASE + '/requestedbook/all').subscribe(
      (data: RequestedBook[]) => {
        this.requiredBook$ = data;
      },
      (err: HttpErrorResponse) => {
        super.show('Error', err.message, 'warning');
      }
    );
  }

  view(id) {
    this.id = id;
  }

  delete(id) {
    var r = confirm('Do you want to delete this recording ?');
    if (r) {
      this.httpService.remove(CONFIG.URL_BASE + '/requestedbook/delete/' + id);
      super.show(
        'Confirmation',
        this.messageService.confirmationMessages.delete,
        'success'
      );
      this.reloadPage();
    }
  }

  reloadPage() {
    this.router
      .navigateByUrl('/dashboard', { skipLocationChange: true })
      .then(() => {
        this.router.navigate(['/requested-book']);
      });
  }
}
