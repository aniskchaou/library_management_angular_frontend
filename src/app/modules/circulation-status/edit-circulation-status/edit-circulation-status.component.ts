import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { URLLoader } from 'src/app/main/configs/URLLoader';
import CategoryMessage from 'src/app/main/messages/CategoryMessage';
import CirculationStatus from 'src/app/main/models/CirculationStatus';
import { HTTPService } from 'src/app/main/services/HTTPService';
import CONFIG from 'src/app/main/urls/urls';

@Component({
  selector: 'app-edit-circulation-status',
  templateUrl: './edit-circulation-status.component.html',
  styleUrls: ['./edit-circulation-status.component.css'],
})
export class EditCirculationStatusComponent
  extends URLLoader
  implements OnInit
{
  model;
  @Input() id;
  @Output() closeModalEvent = new EventEmitter<string>();
  circulationStatusI18n;

  closeModal() {
    this.closeModalEvent.emit();
  }

  constructor(
    private httpService: HTTPService,
    private message: CategoryMessage,
    private router: Router
  ) {
    super();
    this.model = this.create();
  }

  create() {
    return new CirculationStatus(0, '');
  }

  ngOnInit(): void {
    this.httpService.ID.subscribe((idd) => {
      this.model = this.httpService.get(idd);
      if (this.model == undefined) {
        this.model = this.model = this.create();
      }
    });
    this.getCirculationStatusByLang(CONFIG.LANG);
  }

  ngOnChanges(changes: any) {
    console.log('jkv');
    this.httpService
      .get(CONFIG.URL_BASE + '/circulationstatus/' + this.id)
      .subscribe((data: CirculationStatus) => {
        this.model = data;
        console.log(this.model);
      });
  }

  getCirculationStatusByLang(lang) {
    // this.appointements$ = this.appointmentTestService.getAll()
    this.httpService
      .getAll(CONFIG.URL_BASE + '/i18n/circulationstatus/' + lang)
      .subscribe(
        (data) => {
          this.circulationStatusI18n = data;
          console.log(this.circulationStatusI18n);
          //document.getElementById('table').DataTable().ajax.reload();
        },
        (err: HttpErrorResponse) => {
          super.show('Error', err.message, 'error');
        }
      );
  }

  edit() {
    this.httpService.create(
      CONFIG.URL_BASE + '/circulationstatus/create',
      this.model
    );
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
        this.router.navigate(['/circulation-status']);
      });
  }
}
