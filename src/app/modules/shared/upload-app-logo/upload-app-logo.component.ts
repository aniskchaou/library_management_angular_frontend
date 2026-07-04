import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FileUploadService } from 'src/app/main/services/FileUploadService ';

@Component({
    selector: 'app-upload-app-logo',
    templateUrl: './upload-app-logo.component.html',
    styleUrls: ['./upload-app-logo.component.css'],
    standalone: false
})
export class UploadAppLogoComponent implements OnInit {

  uploadForm: UntypedFormGroup;
  fileToUpload: File = null;
  constructor(private fileUploadService:FileUploadService,private fb: UntypedFormBuilder,private activeModal: NgbActiveModal) {
    this.uploadForm = this.fb.group({
      file: [null]
    });
   }

  ngOnInit(): void {
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      this.fileToUpload = event.target.files[0];
      this.uploadForm.patchValue({
        file: this.fileToUpload
      });
    }
  }

  
closeModal(): void {
    this.activeModal.dismiss(); // Close the modal using NgbActiveModal
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('file', this.uploadForm.get('file').value);

    this.fileUploadService.uploadlogo(formData)
      .subscribe(response => {
      });
  }

}
