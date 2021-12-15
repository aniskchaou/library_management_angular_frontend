import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { URLLoader } from 'src/app/main/configs/URLLoader';
import BookMessage from 'src/app/main/messages/BookMessage';
import { HTTPService } from 'src/app/main/services/HTTPService';
import CONFIG from 'src/app/main/urls/urls';
import CirculationStatusValidation from 'src/app/main/validations/CirculationStatusValidation';

@Component({
  selector: 'app-add-circulation-status',
  templateUrl: './add-circulation-status.component.html',
  styleUrls: ['./add-circulation-status.component.css'],
})
export class AddCirculationStatusComponent extends URLLoader implements OnInit {
  circulationStatusForm: FormGroup;
  msg: BookMessage;
  submitted = false;
  circulationStatusI18n;

  get f() {
    return this.circulationStatusForm.controls;
  }

  @Output() closeModalEvent = new EventEmitter<string>();

  closeModal() {
    this.closeModalEvent.emit();
  }

  goBack() {
    this.router
      .navigateByUrl('/dashboard', { skipLocationChange: true })
      .then(() => {
        this.router.navigate(['/circulation-status']);
      });
  }

  constructor(
    private validation: CirculationStatusValidation,
    private message: BookMessage,
    //private bookTestService: BookTestService,
    private httpService: HTTPService,
    private router: Router
  ) {
    super();
    this.circulationStatusForm = this.validation.formGroupInstance;
    this.msg = this.message;
  }

  ngOnInit(): void {
    this.getCirculationStatusByLang(CONFIG.LANG);
  }

  reset() {
    this.circulationStatusForm.reset();
  }

  add() {
    this.submitted = true;

    if (this.validation.checkValidation()) {
      //this.bookTestService.create(this.bookForm.value)
      this.httpService.create(
        CONFIG.URL_BASE + '/circulationstatus/create',
        this.circulationStatusForm.value
      );
      this.closeModal();
      this.goBack();
      super.show('Confirmation', this.msg.confirmationMessages.add, 'success');
    }
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
}
