import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { URLLoader } from 'src/app/main/configs/URLLoader';
import BookMessage from 'src/app/main/messages/BookMessage';
import BookTestService from 'src/app/main/mocks/BookTestService';
import Book from 'src/app/main/models/Book';
import Category from 'src/app/main/models/Category';
import Publisher from 'src/app/main/models/Publisher';
import Writer from 'src/app/main/models/Writer';
import { HTTPService } from 'src/app/main/services/HTTPService';
import CONFIG from 'src/app/main/urls/urls';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css'],
})
export class EditBookComponent extends URLLoader implements OnInit {
  model: Book = new Book(
    0,
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    ''
  );
  @Input() id: string;
  @Output() closeModalEvent = new EventEmitter<string>();
  publishers$: any[];
  writers$: any[];
  bookI18n;
  categories$: any[];

  closeModal() {
    this.closeModalEvent.emit();
  }

  getWriters() {
    this.httpService.getAll(CONFIG.URL_BASE + '/writer/all').subscribe(
      (data: Writer[]) => {
        this.writers$ = data;
      },
      (err: HttpErrorResponse) => {
        super.show('Error', err.message, 'warning');
      }
    );
  }

  getPublishers() {
    this.httpService.getAll(CONFIG.URL_BASE + '/publisher/all').subscribe(
      (data: Publisher[]) => {
        this.publishers$ = data;
        console.log(this.publishers$);
      },
      (err: HttpErrorResponse) => {
        super.show('Error', err.message, 'error');
      }
    );
  }

  constructor(
    private bookTestService: BookTestService,
    private message: BookMessage,
    private httpService: HTTPService,
    private router: Router
  ) {
    super();
    this.model = new Book(
      0,
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      ''
    );
  }

  ngOnInit(): void {
    this.getPublishers();
    this.getWriters();
    this.getBookByLang(CONFIG.LANG);
    this.getcategories();
  }

  getcategories() {
    this.httpService.getAll(CONFIG.URL_BASE + '/category/all').subscribe(
      (data: Category[]) => {
        this.categories$ = data;
      },
      (err: HttpErrorResponse) => {
        super.show('Error', err.message, 'warning');
      }
    );
  }

  ngOnChanges(changes: any) {
    console.log('jkv');
    this.httpService
      .get(CONFIG.URL_BASE + '/book/' + this.id)
      .subscribe((data: Book) => {
        this.model = data;
      });
  }

  edit() {
    this.model.publisher = this.publishers$.filter(
      (x) => x.id == parseInt(this.model.publisher)
    )[0];
    this.model.writer = this.writers$.filter(
      (x) => x.id == parseInt(this.model.writer)
    )[0];
    this.model.category = this.categories$.filter(
      (x) => x.id == parseInt(this.model.category)
    )[0];
    this.httpService.create(CONFIG.URL_BASE + '/book/create', this.model);
    this.closeModal();
    this.goBack();
    super.show(
      'Confirmation',
      this.message.confirmationMessages.edit,
      'success'
    );
  }

  goBack() {
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
}
