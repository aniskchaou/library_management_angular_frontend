import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { URLLoader } from 'src/app/main/configs/URLLoader';
import BookMessage from 'src/app/main/messages/BookMessage';
import CirculationStatus from 'src/app/main/models/CirculationStatus';
import { HTTPService } from 'src/app/main/services/HTTPService';
import CONFIG from 'src/app/main/urls/urls';

@Component({
  selector: 'app-circulation-status',
  templateUrl: './circulation-status.component.html',
  styleUrls: ['./circulation-status.component.css'],
})
export class CirculationStatusComponent extends URLLoader implements OnInit {
  circulationStatus$ = [{}];
  circulationStatusI18n$: any = {};
  id;
  circulation;
  edit(id) {
    this.id = id;
    console.log(this.id);
  }

  constructor(
    private httpService: HTTPService,
    private messageService: BookMessage,
    private router: Router
  ) {
    super();
  }

  delete(id) {
    var r = confirm('Voulez-vous supprimer cet enregistrement ?');
    if (r) {
      /* this.categoryTestService.remove(parseInt(id));
      super.show(
        'Confirmation',
        this.messageService.confirmationMessages.delete,
        'success'
      );*/
      this.httpService.remove(CONFIG.URL_BASE + '/circulation/delete/' + id);
      super.show(
        'Confirmation',
        this.messageService.confirmationMessages.delete,
        'success'
      );
      this.reloadPage();
    }
  }

  ngOnInit(): void {
    this.getAll();
    this.getTranslationByLang(CONFIG.LANG);
  }
  reloadPage() {
    this.router
      .navigateByUrl('/dashboard', { skipLocationChange: true })
      .then(() => {
        this.router.navigate(['/circulationsratus']);
      });
  }

  getAll() {
    // this.appointements$ = this.appointmentTestService.getAll()
    this.httpService
      .getAll(CONFIG.URL_BASE + '/circulationstatus/all')
      .subscribe(
        (data: CirculationStatus[]) => {
          this.circulationStatus$ = data;
          console.log(this.circulationStatus$);
        },
        (err: HttpErrorResponse) => {
          super.show('Error', err.message, 'error');
        }
      );
  }

  getTranslationByLang(lang) {
    // this.appointements$ = this.appointmentTestService.getAll()
    this.httpService
      .getAll(CONFIG.URL_BASE + '/i18n/circulationstatus/' + lang)
      .subscribe(
        (data) => {
          this.circulationStatusI18n$ = data;
          console.log(this.circulationStatusI18n$);
        },
        (err: HttpErrorResponse) => {
          super.show('Error', err.message, 'error');
        }
      );
  }
}
