import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Contract } from 'src/app/main/models/Contract';
import { FileUploadService } from 'src/app/main/services/FileUploadService ';

@Component({
  selector: 'app-upload-document',
  templateUrl: './upload-document.component.html',
  styleUrls: ['./upload-document.component.css']
})
export class UploadDocumentComponent implements OnInit {

  contract:Contract
  uploadForm: FormGroup;
  fileToUpload: File = null;
  constructor(private fileUploadService:FileUploadService,private fb: FormBuilder,private activeModal: NgbActiveModal) {
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

    this.fileUploadService.uploadContract(this.contract.vendor.id,formData)
      .subscribe(response => {
        console.log(response);
      });
  }

}
