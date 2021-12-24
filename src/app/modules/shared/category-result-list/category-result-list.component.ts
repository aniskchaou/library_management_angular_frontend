import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { URLLoader } from 'src/app/main/configs/URLLoader';
import Category from 'src/app/main/models/Category';
import { HTTPService } from 'src/app/main/services/HTTPService';
import CONFIG from 'src/app/main/urls/urls';

@Component({
  selector: 'app-category-result-list',
  templateUrl: './category-result-list.component.html',
  styleUrls: ['./category-result-list.component.css'],
})
export class CategoryResultListComponent extends URLLoader implements OnInit {
  categories: Category[];
  categoryI18n;
  @Input() word;
  constructor(private httpService: HTTPService) {
    super();
  }
  loading = false;

  ngOnInit(): void {
    //this.loadScripts();
    this.getCategories(this.word);
    this.getCategoryByLang(CONFIG.getInstance().getLang());
  }

  ngOnChanges() {
    this.getCategories(this.word);
    this.getCategoryByLang(CONFIG.getInstance().getLang());
  }

  getCategories(word) {
    this.loading = true;
    this.httpService
      .getAll(CONFIG.URL_BASE + '/search/category/' + word)
      .subscribe(
        (data: Category[]) => {
          this.categories = data;
          this.loading = false;
        },
        (err: HttpErrorResponse) => {
          super.show('Error', err.message, 'warning');
        }
      );
  }

  getCategoryByLang(lang) {
    this.httpService
      .getAll(CONFIG.URL_BASE + '/i18n/category/' + lang)
      .subscribe(
        (data) => {
          this.categoryI18n = data;
        },
        (err: HttpErrorResponse) => {
          super.show('Error', err.message, 'warning');
        }
      );
  }
}
