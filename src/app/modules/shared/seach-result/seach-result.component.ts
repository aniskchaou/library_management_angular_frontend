import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { URLLoader } from 'src/app/main/configs/URLLoader';
import { HTTPService } from 'src/app/main/services/HTTPService';
import CONFIG from 'src/app/main/urls/urls';

@Component({
  selector: 'app-seach-result',
  templateUrl: './seach-result.component.html',
  styleUrls: ['./seach-result.component.css'],
})
export class SeachResultComponent extends URLLoader implements OnInit {
  searchWord;
  bookNumber = '0';
  categoryNumber = '0';
  writerNumber = '0';
  resultI18n;
  constructor(private route: ActivatedRoute, private httpService: HTTPService) {
    super();
  }
  loading = false;
  ngOnInit(): void {
    this.loading = true;
    this.loadScripts();

    this.route.paramMap.subscribe((paramMap) => {
      this.searchWord = paramMap.get('search');
      console.log(this.searchWord);
      this.getResultI18n(CONFIG.getInstance().getLang());
      this.getBookNumber(this.searchWord);
      this.getCategoryNumber(this.searchWord);
      this.getWriterNumber(this.searchWord);
      this.loading = false;
    });
  }

  getResultI18n(lang) {
    this.httpService.getAll(CONFIG.URL_BASE + '/search/i18n/' + lang).subscribe(
      (data) => {
        this.resultI18n = data;
      },
      (err: HttpErrorResponse) => {
        super.show('Error', err.message, 'warning');
      }
    );
  }

  getBookNumber(word) {
    this.httpService
      .getAll(CONFIG.URL_BASE + '/search/bookcount/' + word)
      .subscribe(
        (data: string) => {
          this.bookNumber = data;
        },
        (err: HttpErrorResponse) => {
          super.show('Error', err.message, 'warning');
        }
      );
  }

  getCategoryNumber(word) {
    this.httpService
      .getAll(CONFIG.URL_BASE + '/search/categorycount/' + word)
      .subscribe(
        (data: string) => {
          this.categoryNumber = data;
        },
        (err: HttpErrorResponse) => {
          super.show('Error', err.message, 'warning');
        }
      );
  }
  getWriterNumber(word) {
    this.httpService
      .getAll(CONFIG.URL_BASE + '/search/writercount/' + word)
      .subscribe(
        (data: string) => {
          this.writerNumber = data;
        },
        (err: HttpErrorResponse) => {
          super.show('Error', err.message, 'warning');
        }
      );
  }
}
