import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { URLLoader } from 'src/app/main/configs/URLLoader';
import Writer from 'src/app/main/models/Writer';
import { HTTPService } from 'src/app/main/services/HTTPService';
import CONFIG from 'src/app/main/urls/urls';

@Component({
  selector: 'app-writer-result-list',
  templateUrl: './writer-result-list.component.html',
  styleUrls: ['./writer-result-list.component.css'],
})
export class WriterResultListComponent extends URLLoader implements OnInit {
  constructor(private httpService: HTTPService) {
    super();
  }
  loading = false;
  @Input() word;
  writers = [];
  writerI18n;
  resultI18n;

  ngOnInit(): void {
    //this.loadScripts();
    this.gethWriters(this.word);
    this.getWriterByLang(CONFIG.getInstance().getLang());
  }

  ngOnChanges() {
    this.gethWriters(this.word);
    this.getWriterByLang(CONFIG.getInstance().getLang());
  }

  gethWriters(word) {
    this.loading = true;
    this.httpService
      .getAll(CONFIG.URL_BASE + '/search/writer/' + word)
      .subscribe(
        (data: Writer[]) => {
          this.writers = data;
          this.loading = false;
        },
        (err: HttpErrorResponse) => {
          super.show('Error', err.message, 'warning');
        }
      );
  }

  getWriterByLang(lang) {
    this.httpService.getAll(CONFIG.URL_BASE + '/i18n/writer/' + lang).subscribe(
      (data) => {
        this.writerI18n = data;
      },
      (err: HttpErrorResponse) => {
        super.show('Error', err.message, 'error');
      }
    );
  }
}
