import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import Member from 'src/app/main/models/Member';
import { FileUploadService } from 'src/app/main/services/FileUploadService ';

@Component({
    selector: 'app-upload-document-member',
    templateUrl: './upload-document-member.component.html',
    styleUrls: ['./upload-document-member.component.css'],
    standalone: false
})
export class UploadDocumentMemberComponent implements OnInit {

  
  member:Member
  uploadForm: UntypedFormGroup;
  fileToUpload: File = null;
  constructor(private toastr: ToastrService,private fileUploadService:FileUploadService,private fb: UntypedFormBuilder,private activeModal: NgbActiveModal) {
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

    this.fileUploadService.uploadMember(this.member.id,formData)
      .subscribe(response => {
        this.toastr.success("Your file has been uploaded successfully.", 'Success');
      });
  }

}
