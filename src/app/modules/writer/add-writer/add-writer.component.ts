import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { URLLoader } from 'src/app/main/configs/URLLoader';
import BookMessage from 'src/app/main/messages/BookMessage';
import WriterMessage from 'src/app/main/messages/WriterMessage';
import { DataService } from 'src/app/main/services/data.service';
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

  /* closeModal() {
    this.closeModalEvent.emit();
  } */

  goBack() {
    this.router
      .navigateByUrl('/dashboard', { skipLocationChange: true })
      .then(() => {
        this.router.navigate(['/writer']);
      });
  }

  closeModal(): void {
    this.activeModal.dismiss(); // Close the modal using NgbActiveModal
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
    private toastr: ToastrService,
    private validation: WriterValidation,
    private message: WriterMessage,
    private httpService: HTTPService,
    private router: Router,
    private dataService:DataService,
    private activeModal: NgbActiveModal
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
    if (this.validateWriterForm(this.writerForm.value,true)) {
      console.log(this.writerForm.value)
      this.httpService.create(
        CONFIG.URL_BASE + '/writer/create',
        this.writerForm.value
      ).finally(()=>{
        this.closeModal();
          this.dataService.triggerRefresh()
          this.toastr.success('Item added successfully!', 'Success');
      });
     // 
      //this.goBack();
      //super.show('Confirmation', this.msg.confirmationMessages.add, 'success');
    }
  }

  getWriterByLang(lang) {
    lang='EN'
    this.httpService.getAll(CONFIG.URL_BASE + '/i18n/writer/EN').subscribe(
      (data) => {
        this.writerI18n = data;
      },
      (err: HttpErrorResponse) => {
        super.show('Error', err.message, 'warning');
      }
    );
  }

  errors: any;

validateWriterForm(form: any, submitted: boolean): boolean {
  this.errors = {};

  // Validate Name
  if (!form.name || form.name.trim().length < 2) {
    this.errors.name = 'Name is required and must be at least 2 characters long.';
    this.toastr.error(this.errors.name, 'Validation Error');
  }

  // Validate Note
  if (!form.note || form.note.trim().length < 2) {
    this.errors.note = 'Note is required and must be at least 2 characters long.';
    this.toastr.error(this.errors.note, 'Validation Error');
  }

  // Validate Date of Birth (required field)
  if (!form.dob) {
    this.errors.dob = 'Date of Birth is required.';
    this.toastr.error(this.errors.dob, 'Validation Error');
  }

  // Validate Died (radio button, required)
  if (form.died !== 'yes' && form.died !== 'no') {
    this.errors.died = 'Please select if the writer has passed away.';
    this.toastr.error(this.errors.died, 'Validation Error');
  }

  // Validate Date of Death (conditionally required if "died" is "yes")
  if (form.died === 'yes' && !form.dod) {
    this.errors.dod = 'Date of Death is required if the writer is deceased.';
    this.toastr.error(this.errors.dod, 'Validation Error');
  }

  // Validate Bio
  if (!form.bio || form.bio.trim().length < 10) {
    this.errors.bio = 'Bio is required and must be at least 10 characters long.';
    this.toastr.error(this.errors.bio, 'Validation Error');
  }

  // Validate Publications
  if (!form.publications || form.publications.trim().length < 10) {
    this.errors.publications = 'Publications are required and must be at least 10 characters long.';
    this.toastr.error(this.errors.publications, 'Validation Error');
  }

  // Validate Awards
  if (!form.awards || form.awards.trim().length < 5) {
    this.errors.awards = 'Awards must be at least 5 characters long.';
    this.toastr.error(this.errors.awards, 'Validation Error');
  }

  // Validate References
  if (!form.refrences || form.refrences.trim().length < 5) {
    this.errors.refrences = 'References must be at least 5 characters long.';
    this.toastr.error(this.errors.refrences, 'Validation Error');
  }

  // Return whether the form is valid
  return Object.keys(this.errors).length === 0;
}

}
