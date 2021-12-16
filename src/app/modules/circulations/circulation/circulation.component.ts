import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { URLLoader } from 'src/app/main/configs/URLLoader';
import CirculationMessage from 'src/app/main/messages/CirculationMessage';
import Circulation from 'src/app/main/models/Circulation';
import { HTTPService } from 'src/app/main/services/HTTPService';
import CONFIG from 'src/app/main/urls/urls';

@Component({
  selector: 'app-circulation',
  templateUrl: './circulation.component.html',
  styleUrls: ['./circulation.component.css'],
})
export class CirculationComponent extends URLLoader implements OnInit {
  circulations$ = [];
  id;
  circulationI18n;
  loading = false;

  edit(id) {
    if (id != undefined) {
      this.id = id;
    }
  }

  getCirculationByLang(lang) {
    this.httpService
      .getAll(CONFIG.URL_BASE + '/i18n/circulation/' + lang)
      .subscribe(
        (data) => {
          this.circulationI18n = data;
        },
        (err: HttpErrorResponse) => {
          super.show('Error', err.message, 'error');
        }
      );
  }

  view(id) {
    this.id = id;
  }

  reloadPage() {
    this.router
      .navigateByUrl('/dashboard', { skipLocationChange: true })
      .then(() => {
        this.router.navigate(['/circulation']);
      });
  }

  delete(id) {
    this.httpService.remove(CONFIG.URL_BASE + '/circulation/delete/' + id);
    super.show(
      'Confirmation',
      this.messageService.confirmationMessages.delete,
      'success'
    );
    this.reloadPage();
  }

  constructor(
    private httpService: HTTPService,
    private messageService: CirculationMessage,
    private router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.getAll();
    this.getCirculationByLang(CONFIG.getInstance().getLang());
  }

  getAll() {
    this.loading = true;
    this.httpService.getAll(CONFIG.URL_BASE + '/circulation/all').subscribe(
      (data: Circulation[]) => {
        this.circulations$ = data;
        this.loading = false;
      },
      (err: HttpErrorResponse) => {
        super.show('Error', err.message, 'error');
      }
    );
  }
}
