import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { URLLoader } from 'src/app/main/configs/URLLoader';
import BookMessage from 'src/app/main/messages/BookMessage';
import Publisher from 'src/app/main/models/Publisher';
import { HTTPService } from 'src/app/main/services/HTTPService';
import CONFIG from 'src/app/main/urls/urls';

@Component({
  selector: 'app-publisher',
  templateUrl: './publisher.component.html',
  styleUrls: ['./publisher.component.css'],
})
export class PublisherComponent extends URLLoader implements OnInit {
  publishers$ = [{}];
  id;
  publisherI18n;
  loading = false;

  constructor(
    private httpService: HTTPService,
    private router: Router,
    private messageService: BookMessage
  ) {
    super();
  }

  edit(id) {
    this.id = id;
  }

  ngOnInit(): void {
    this.getAll();
    this.getPublisherByLang(CONFIG.getInstance().getLang());
  }

  reloadPage() {
    this.router
      .navigateByUrl('/dashboard', { skipLocationChange: true })
      .then(() => {
        this.router.navigate(['/publisher']);
      });
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

  delete(id) {
    var r = confirm('Do you want to delete this recording ?');
    if (r) {
      this.httpService.remove(CONFIG.URL_BASE + '/publisher/delete/' + id);
      super.show(
        'Confirmation',
        this.messageService.confirmationMessages.delete,
        'success'
      );
      this.reloadPage();
    }
  }

  getAll() {
    this.loading = true;
    this.httpService.getAll(CONFIG.URL_BASE + '/publisher/all').subscribe(
      (data: Publisher[]) => {
        this.publishers$ = data;
        this.loading = false;
      },
      (err: HttpErrorResponse) => {
        super.show('Error', err.message, 'warning');
      }
    );
  }
}
