import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { URLLoader } from 'src/app/main/configs/URLLoader';
import ExpenseMessage from 'src/app/main/messages/expenseMessage';
import { HTTPService } from 'src/app/main/services/HTTPService';
import CONFIG from 'src/app/main/urls/urls';
import ExpenseValidation from 'src/app/main/validations/ExpenseValidation';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.css'],
})
export class AddExpenseComponent extends URLLoader implements OnInit {
  expenseForm: FormGroup;
  msg: ExpenseMessage;
  submitted = false;
  @Output() closeModalEvent = new EventEmitter<string>();
  @Input() expenseI18n;
  selectedFile: File;
  retrievedImage: any;
  base64Data: any;

  constructor(
    private validation: ExpenseValidation,
    private message: ExpenseMessage,
    private httpService: HTTPService,
    private router: Router
  ) {
    super();
    this.expenseForm = this.validation.formGroupInstance;
    this.msg = this.message;
  }

  closeModal() {
    this.closeModalEvent.emit();
  }

  goBack() {
    this.router
      .navigateByUrl('/dashboard', { skipLocationChange: true })
      .then(() => {
        this.router.navigate(['/expense']);
      });
  }
  get f() {
    return this.expenseForm.controls;
  }

  ngOnInit(): void {
    this.getExpenseByLang(CONFIG.getInstance().getLang());
    console.log(this.expenseI18n);
  }

  reset() {
    this.expenseForm.reset();
  }

  add() {
    this.submitted = true;
    if (this.validation.checkValidation()) {
      this.httpService.create(
        CONFIG.URL_BASE + '/expense/create',
        this.expenseForm.value
      );
      this.expenseForm.reset();
      this.closeModal();
      this.goBack();
      super.show(
        'Confirmation',
        this.msg.addConfirmation[CONFIG.getInstance().getLang()],
        'success'
      );
    }
  }

  getExpenseByLang(lang) {
    this.httpService
      .getAll(CONFIG.URL_BASE + '/i18n/expense/' + lang)
      .subscribe(
        (data) => {
          this.expenseI18n = data;
        },
        (err: HttpErrorResponse) => {
          super.show('Error', err.message, 'warning');
        }
      );
  }
}
