import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { URLLoader } from 'src/app/main/configs/URLLoader';
import { HTTPService } from 'src/app/main/services/HTTPService';
import CONFIG from 'src/app/main/urls/urls';

@Component({
  selector: 'app-view-book',
  templateUrl: './view-book.component.html',
  styleUrls: ['./view-book.component.css'],
})
export class ViewBookComponent extends URLLoader implements OnInit {
  @Input() id;
  book;
  bookI18n;
  constructor(private httpService: HTTPService) {
    super();
  }

  ngOnInit(): void {
    console.log(this.book);
    this.viewBook(this.id);
    this.getBookByLang(CONFIG.getInstance().getLang());
  }

  ngOnChanges(changes: any) {
    this.viewBook(this.id);
    this.getBookByLang(CONFIG.getInstance().getLang());
  }
  viewBook(id: any) {
    if (this.id) {
      this.httpService.getAll(CONFIG.URL_BASE + '/book/' + id).subscribe(
        (data) => {
          this.book = data;
        },
        (err: HttpErrorResponse) => {
          super.show('Error', err.message, 'warning');
        }
      );
    }
  }

  getBookByLang(lang) {
    this.httpService.getAll(CONFIG.URL_BASE + '/i18n/book/' + lang).subscribe(
      (data) => {
        this.bookI18n = data;
      },
      (err: HttpErrorResponse) => {
        super.show('Error', err.message, 'warning');
      }
    );
  }
}
