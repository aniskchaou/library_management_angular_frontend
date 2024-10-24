import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FileUploadService } from 'src/app/main/services/FileUploadService ';

@Component({
  selector: 'app-upload-book-cover',
  templateUrl: './upload-book-cover.component.html',
  styleUrls: ['./upload-book-cover.component.css']
})
export class UploadBookCoverComponent implements OnInit {
 @Input()
  book
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

    this.fileUploadService.uploadImageCover(this.book.id,this.book.id+'.jpg',formData)
      .subscribe(response => {
        console.log(response);
      });
  }

}
