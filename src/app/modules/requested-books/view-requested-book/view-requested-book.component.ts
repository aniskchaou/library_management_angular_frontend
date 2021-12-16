import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { HTTPService } from 'src/app/main/services/HTTPService';
import CONFIG from 'src/app/main/urls/urls';

@Component({
  selector: 'app-view-requested-book',
  templateUrl: './view-requested-book.component.html',
  styleUrls: ['./view-requested-book.component.css'],
})
export class ViewRequestedBookComponent implements OnInit {
  @Input() id;
  requestedbook;
  requestedbookI18n;

  constructor(private httpService: HTTPService) {}

  ngOnInit(): void {}

  ngOnChanges(changes: any) {
    this.viewRequestedBook(this.id);
    this.getRequestedbookByLang(CONFIG.getInstance().getLang());
  }

  viewRequestedBook(id: any) {
    this.httpService.getAll(CONFIG.URL_BASE + '/requestedbook/' + id).subscribe(
      (data) => {
        this.requestedbook = data;
      },
      (err: HttpErrorResponse) => {
        //super.show('Error', err.message, 'error');
      }
    );
  }

  getRequestedbookByLang(lang) {
    this.httpService
      .getAll(CONFIG.URL_BASE + '/i18n/requestedbook/' + lang)
      .subscribe(
        (data) => {
          this.requestedbookI18n = data;
        },
        (err: HttpErrorResponse) => {
          // super.show('Error', err.message, 'error');
        }
      );
  }
}
