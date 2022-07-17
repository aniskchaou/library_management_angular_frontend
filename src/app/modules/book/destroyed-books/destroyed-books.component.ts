import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { URLLoader } from 'src/app/main/configs/URLLoader';
import BookMessage from 'src/app/main/messages/BookMessage';
import BookTestService from 'src/app/main/mocks/BookTestService';
import Book from 'src/app/main/models/Book';
import { HTTPService } from 'src/app/main/services/HTTPService';
import CONFIG from 'src/app/main/urls/urls';

@Component({
  selector: 'app-destroyed-books',
  templateUrl: './destroyed-books.component.html',
  styleUrls: ['./destroyed-books.component.css'],
})
export class DestroyedBooksComponent extends URLLoader implements OnInit {
  showsummary: boolean = false;
  showgraphic: boolean = false;
  loading = false;
  books$ = [];
  id = 0;
  bookI18n;
  @Output() viewEvent = new EventEmitter<string>();

  constructor(
    private bookTestService: BookTestService,
    private messageService: BookMessage,
    private httpService: HTTPService,
    private router: Router
  ) {
    super();
  }

  edit(id) {
    this.id = id;
  }

  filter(data) {
    console.log(data);
    if (data == null) {
      super.show('Search Result', 'No result !', 'info');
    } else {
      this.books$.length = 0;
      this.books$.push(data);
    }
  }

  delete(id) {
    var r = confirm('Do you want to delete this recording ?');
    if (r) {
      this.httpService.remove(CONFIG.URL_BASE + '/book/delete/' + id);
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
        this.router.navigate(['/book']);
      });
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

  ngOnInit() {
    this.getAll();
    this.getBookByLang(CONFIG.getInstance().getLang());
  }

  view(id) {
    this.id = id;
  }

  getAll() {
    this.loading = true;
    this.httpService.getAll(CONFIG.URL_BASE + '/book/destroyed').subscribe(
      (data: Book[]) => {
        this.books$ = data;
        this.loading = false;
      },
      (err: HttpErrorResponse) => {
        super.show('Error', err.message, 'warning');
      }
    );
  }
}
