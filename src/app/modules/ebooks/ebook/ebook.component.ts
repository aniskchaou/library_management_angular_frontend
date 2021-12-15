import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { URLLoader } from 'src/app/main/configs/URLLoader';
import EBook from 'src/app/main/models/EBook';
import { HTTPService } from 'src/app/main/services/HTTPService';
import CONFIG from 'src/app/main/urls/urls';

@Component({
  selector: 'app-ebook',
  templateUrl: './ebook.component.html',
  styleUrls: ['./ebook.component.css'],
})
export class EbookComponent extends URLLoader implements OnInit {
  ebooks$ = [{}];

  constructor(private httpService: HTTPService) {
    super();
  }

  ngOnInit(): void {}

  getAll() {
    // this.appointements$ = this.appointmentTestService.getAll()
    this.httpService.getAll(CONFIG.URL_BASE + '/book/all').subscribe(
      (data: EBook[]) => {
        this.ebooks$ = data;
        // console.log(this.books$);
      },
      (err: HttpErrorResponse) => {
        super.show('Error', err.message, 'error');
      }
    );
  }
}
