import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { URLLoader } from 'src/app/main/configs/URLLoader';
import Book from 'src/app/main/models/Book';
import CirculationStatus from 'src/app/main/models/CirculationStatus';
import Member from 'src/app/main/models/Member';
import { HTTPService } from 'src/app/main/services/HTTPService';
import CONFIG from 'src/app/main/urls/urls';

@Component({
  selector: 'app-circulation-report',
  templateUrl: './circulation-report.component.html',
  styleUrls: ['./circulation-report.component.css'],
})
export class CirculationReportComponent extends URLLoader implements OnInit {
  memberNames$: Member[];
  bookNames$: Book[];
  writers$: Book[];
  returnStatus$: CirculationStatus[];
  loading: boolean;
  searchButtonClicked: boolean;
  menu;
  constructor(private httpService: HTTPService) {
    super();
  }

  ngOnInit(): void {
    this.searchButtonClicked = false;
    this.loadScripts();
    this.getMembers();
    this.getBooks();
    this.getCirculationStatus();
    this.getWriters();
    this.httpService.menuI18n$.subscribe((data) => {
      this.menu = data;
    });
  }

  getMembers() {
    this.httpService.getAll(CONFIG.URL_BASE + '/member/all').subscribe(
      (data: Member[]) => {
        this.memberNames$ = data;
        console.log(this.memberNames$);
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
        console.log(this.bookNames$);
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
  search() {
    this.searchButtonClicked = true;
    this.loadScripts();
    this.loading = true;
    this.httpService
      .getAll(CONFIG.URL_BASE + '/circulation/circulationreport/')
      .subscribe(
        (data: Book[]) => {},
        (err: HttpErrorResponse) => {
          super.show('Error', err.message, 'warning');
        }
      );
  }
}
