import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { URLLoader } from 'src/app/main/configs/URLLoader';
import BookMessage from 'src/app/main/messages/BookMessage';
import CirculationStatus from 'src/app/main/models/CirculationStatus';
import { HTTPService } from 'src/app/main/services/HTTPService';
import CONFIG from 'src/app/main/urls/urls';
import { AddCirculationStatusComponent } from '../add-circulation-status/add-circulation-status.component';

@Component({
    selector: 'app-circulation-status',
    templateUrl: './circulation-status.component.html',
    styleUrls: ['./circulation-status.component.css'],
    standalone: false
})
export class CirculationStatusComponent extends URLLoader implements OnInit {
  circulationStatus$ = [{}];
  circulationStatusI18n$: any = {};
  id;
  loading = false;
  circulation;
  edit(id) {
    this.id = id;
  }

  

  constructor(
    private httpService: HTTPService,
    private messageService: BookMessage,
    private router: Router,
    private modalService: NgbModal
  ) {
    super();
  }

  openAddDialog(): void {
    const modalRef = this.modalService.open(AddCirculationStatusComponent, { size: 'xl', centered: true });
    modalRef.result.then(result => {
      if (result) { this.getAll(); }
    }).catch(() => {});
  }

  delete(id) {
    var r = confirm('Voulez-vous supprimer cet enregistrement ?');
    if (r) {
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
    this.getTranslationByLang(CONFIG.getInstance().getLang());
  }
  reloadPage() {
    this.router
      .navigateByUrl('/dashboard', { skipLocationChange: true })
      .then(() => {
        this.router.navigate(['/circulationsratus']);
      });
  }

  getAll() {
    this.loading = true;
    this.httpService
      .getAll(CONFIG.URL_BASE + '/circulationstatus/all')
      .subscribe(
        (data: CirculationStatus[]) => {
          this.circulationStatus$ = data;
          this.loading = false;
        },
        (err: HttpErrorResponse) => {
          super.show('Error', err.message, 'warning');
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
        },
        (err: HttpErrorResponse) => {
          super.show('Error', err.message, 'error');
        }
      );
  }
}
