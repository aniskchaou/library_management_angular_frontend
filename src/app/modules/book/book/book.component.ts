import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { URLLoader } from 'src/app/main/configs/URLLoader';
import BookMessage from 'src/app/main/messages/BookMessage';
import BookTestService from 'src/app/main/mocks/BookTestService';
import Book from 'src/app/main/models/Book';
import { HTTPService } from 'src/app/main/services/HTTPService';
import CONFIG from 'src/app/main/urls/urls';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
})
export class BookComponent extends URLLoader implements OnInit {
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
    this.getMenuByLang(CONFIG.getInstance().getLang());
  }

  view(id) {
    this.id = id;
  }

  getAll() {
    this.loading = true;
    this.httpService
      .getAll(CONFIG.URL_BASE + '/book/all')
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(
        (data: Book[]) => {
          this.books$ = data;
          this.loading = false;
        },
        (err: HttpErrorResponse) => {
          super.show('Error', err.message, 'warning');
        }
      );
  }

  getMenuByLang(lang) {
    this.httpService.getAll(CONFIG.URL_BASE + '/i18n/menu/' + lang).subscribe(
      (data) => {
        console.log(data);
        this.httpService.menuI18n.next(data);
      },
      (err: HttpErrorResponse) => {
        super.show('Error', err.message, 'warning');
        //this.reload = true;
      }
    );
  }

  groupByAuthors() {
    this.loading = true;
    this.httpService
      .getAll(CONFIG.URL_BASE + '/book/groupbyauthors')
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(
        (data: Book[]) => {
          this.books$ = data;
          this.loading = false;
        },
        (err: HttpErrorResponse) => {
          super.show('Error', err.message, 'warning');
        }
      );
  }

  groupByCategories() {
    this.loading = true;
    this.httpService
      .getAll(CONFIG.URL_BASE + '/book/groupbycategories')
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(
        (data: Book[]) => {
          this.books$ = data;
          this.loading = false;
        },
        (err: HttpErrorResponse) => {
          super.show('Error', err.message, 'warning');
        }
      );
  }

  groupByEditionYears() {
    this.loading = true;
    this.httpService
      .getAll(CONFIG.URL_BASE + '/book/groupbyeditionyears')
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(
        (data: Book[]) => {
          this.books$ = data;
          this.loading = false;
        },
        (err: HttpErrorResponse) => {
          super.show('Error', err.message, 'warning');
        }
      );
  }

  groupByPublishers() {
    this.loading = true;
    this.httpService
      .getAll(CONFIG.URL_BASE + '/book/groupbypublishers')
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(
        (data: Book[]) => {
          this.books$ = data;
          this.loading = false;
        },
        (err: HttpErrorResponse) => {
          super.show('Error', err.message, 'warning');
        }
      );
  }

  filterByYears(year) {
    this.loading = true;
    this.httpService
      .getAll(CONFIG.URL_BASE + '/book/filterbyyears/' + year)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(
        (data: Book[]) => {
          this.books$ = data;
          this.loading = false;
        },
        (err: HttpErrorResponse) => {
          super.show('Error', err.message, 'warning');
        }
      );
  }
  filterByWriters(writers) {
    this.loading = true;
    this.httpService
      .getAll(CONFIG.URL_BASE + '/book/filterbywriters/' + writers.id)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(
        (data: Book[]) => {
          this.books$ = data;
          this.loading = false;
        },
        (err: HttpErrorResponse) => {
          super.show('Error', err.message, 'warning');
        }
      );
  }
  filterByCategories(category) {
    this.loading = true;
    this.httpService
      .getAll(CONFIG.URL_BASE + '/book/filterbycategories/' + category)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(
        (data: Book[]) => {
          this.books$ = data;
          this.loading = false;
        },
        (err: HttpErrorResponse) => {
          super.show('Error', err.message, 'warning');
        }
      );
  }

  destroy(id) {
    this.httpService
      .put(CONFIG.URL_BASE + '/book/destroybook/' + id)
      .subscribe((data) => {
        super.show('Confirmation', 'Book has been destroyed', 'success');
        this.reloadPage();
      });
  }
  archive(id) {
    this.httpService
      .put(CONFIG.URL_BASE + '/book/archivebook/' + id)
      .subscribe((data) => {
        super.show('Confirmation', 'Book has been archived', 'success');
        this.reloadPage();
      });
  }
}
