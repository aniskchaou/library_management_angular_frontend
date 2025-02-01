import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { NoticeTemplate } from 'src/app/main/models/NoticeTemplate';
import { HTTPService } from 'src/app/main/services/HTTPService';

@Component({
  selector: 'app-notice-template-modal',
  templateUrl: './notice-template-modal.component.html',
  styleUrls: ['./notice-template-modal.component.css']
})
export class NoticeTemplateModalComponent implements OnInit {

  @Input() noticeTemplate: NoticeTemplate;

  constructor(private toastr: ToastrService,public activeModal: NgbActiveModal, private noticeTemplateService: HTTPService) {}

  ngOnInit(): void {
    console.log(this.noticeTemplate);
  }

  saveNoticeTemplate(): void {
  if(this.validateNoticeTemplateForm(this.noticeTemplate,true)){
    this.noticeTemplateService.createNoticeTemplate(this.noticeTemplate).subscribe(() => {
        this.activeModal.close(this.noticeTemplate);
        this.toastr.success('Item added successfully!', 'Success');
      });
    
  }
      

  }

  onCancelClick(): void {
    this.activeModal.dismiss();
  }

  errors: any;

validateNoticeTemplateForm(form: any, submitted: boolean): boolean {
  this.errors = {};

  // Validate Title
  if (!form.title || form.title.trim().length < 2) {
    this.errors.title = 'Title is required and must be at least 2 characters long.';
    this.toastr.error(this.errors.title, 'Validation Error');
  }

  // Validate Content Template
  if (!form.contentTemplate || form.contentTemplate.trim().length < 10) {
    this.errors.contentTemplate = 'Content template is required and must be at least 10 characters long.';
    this.toastr.error(this.errors.contentTemplate, 'Validation Error');
  }

  // All validations complete; return whether the form is valid
  return Object.keys(this.errors).length === 0;
}

}
