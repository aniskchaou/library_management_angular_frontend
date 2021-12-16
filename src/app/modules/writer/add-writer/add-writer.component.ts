import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { URLLoader } from 'src/app/main/configs/URLLoader';
import BookMessage from 'src/app/main/messages/BookMessage';
import WriterMessage from 'src/app/main/messages/WriterMessage';
import { HTTPService } from 'src/app/main/services/HTTPService';
import CONFIG from 'src/app/main/urls/urls';
import WriterValidation from 'src/app/main/validations/WriterValidation';

@Component({
  selector: 'app-add-writer',
  templateUrl: './add-writer.component.html',
  styleUrls: ['./add-writer.component.css'],
})
export class AddWriterComponent extends URLLoader implements OnInit {
  writerForm: FormGroup;
  msg: WriterMessage;
  submitted = false;
  @Output() closeModalEvent = new EventEmitter<string>();
  writerI18n;

  closeModal() {
    this.closeModalEvent.emit();
  }

  goBack() {
    this.router
      .navigateByUrl('/dashboard', { skipLocationChange: true })
      .then(() => {
        this.router.navigate(['/writer']);
      });
  }

  reloadPage() {
    this.router
      .navigateByUrl('/dashboard', { skipLocationChange: true })
      .then(() => {
        this.router.navigate(['/writer']);
      });
  }

  get f() {
    return this.writerForm.controls;
  }

  constructor(
    private validation: WriterValidation,
    private message: WriterMessage,
    private httpService: HTTPService,
    private router: Router
  ) {
    super();
    this.writerForm = this.validation.formGroupInstance;
    this.msg = this.message;
  }

  ngOnInit(): void {
    this.getWriterByLang(CONFIG.getInstance().getLang());
  }

  reset() {
    this.writerForm.reset();
  }

  add() {
    this.submitted = true;
    if (this.validation.checkValidation()) {
      this.httpService.create(
        CONFIG.URL_BASE + '/writer/create',
        this.writerForm.value
      );
      this.closeModal();
      this.goBack();
      super.show('Confirmation', this.msg.confirmationMessages.add, 'success');
    }
  }

  getWriterByLang(lang) {
    this.httpService.getAll(CONFIG.URL_BASE + '/i18n/writer/' + lang).subscribe(
      (data) => {
        this.writerI18n = data;
      },
      (err: HttpErrorResponse) => {
        super.show('Error', err.message, 'warning');
      }
    );
  }
}
