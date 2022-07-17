import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { URLLoader } from 'src/app/main/configs/URLLoader';
import IncomeMessage from 'src/app/main/messages/incomeMessage';
import { HTTPService } from 'src/app/main/services/HTTPService';
import CONFIG from 'src/app/main/urls/urls';
import IncomeValidation from 'src/app/main/validations/IncomeValidation';

@Component({
  selector: 'app-add-income',
  templateUrl: './add-income.component.html',
  styleUrls: ['./add-income.component.css'],
})
export class AddIncomeComponent extends URLLoader implements OnInit {
  incomeForm: FormGroup;
  msg: IncomeMessage;
  submitted = false;
  @Output() closeModalEvent = new EventEmitter<string>();
  selectedFile: File;
  retrievedImage: any;
  base64Data: any;
  @Input() incomeI18n;
  constructor(
    private validation: IncomeValidation,
    private message: IncomeMessage,
    private httpService: HTTPService,
    private router: Router
  ) {
    super();
    this.incomeForm = this.validation.formGroupInstance;
    this.msg = this.message;
  }

  closeModal() {
    this.closeModalEvent.emit();
  }

  goBack() {
    this.router
      .navigateByUrl('/dashboard', { skipLocationChange: true })
      .then(() => {
        this.router.navigate(['/income']);
      });
  }
  get f() {
    return this.incomeForm.controls;
  }

  ngOnInit(): void {
    this.getIncomeByLang(CONFIG.getInstance().getLang());
  }

  reset() {
    this.incomeForm.reset();
  }

  add() {
    this.submitted = true;
    if (this.validation.checkValidation()) {
      this.httpService.create(
        CONFIG.URL_BASE + '/income/create',
        this.incomeForm.value
      );
      this.incomeForm.reset();
      this.closeModal();
      this.goBack();
      super.show(
        'Confirmation',
        this.msg.addConfirmation[CONFIG.getInstance().getLang()],
        'success'
      );
    }
  }

  getIncomeByLang(lang) {
    this.httpService.getAll(CONFIG.URL_BASE + '/i18n/income/' + lang).subscribe(
      (data) => {
        this.incomeI18n = data;
      },
      (err: HttpErrorResponse) => {
        super.show('Error', err.message, 'warning');
      }
    );
  }
}
