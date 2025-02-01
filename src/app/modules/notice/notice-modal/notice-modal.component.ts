import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import Member from 'src/app/main/models/Member';
import { Notice } from 'src/app/main/models/Notice';
import { NoticeTemplate } from 'src/app/main/models/NoticeTemplate';
import { HTTPService } from 'src/app/main/services/HTTPService';
import CONFIG from 'src/app/main/urls/urls';

@Component({
  selector: 'app-notice-modal',
  templateUrl: './notice-modal.component.html',
  styleUrls: ['./notice-modal.component.css']
})
export class NoticeModalComponent implements OnInit {

  @Input() notice: Notice;
  members: Member[];
  noticeTemplates: NoticeTemplate[];

  constructor(private toastr: ToastrService,private noticeTemplateService:HTTPService,public activeModal: NgbActiveModal, private noticeService: HTTPService,private httpService:HTTPService) {}

  ngOnInit(): void {
    console.log(this.notice);
    this.loadNoticeTemplates()
    this.getAllMembers()
  }

  saveNotice(): void {
    console.log(this.notice)
    if(this.validateNoticeForm(this.notice,true)){
       this.noticeService.createNotice(this.notice).subscribe(() => {
        this.activeModal.close(this.notice);
        this.toastr.success('Item added successfully!', 'Success');
      });
    }
     
    
  }

  getAllMembers() {
    //this.loading = true;
    this.httpService.getAll(CONFIG.URL_BASE + '/member/all').subscribe(
      (data: Member[]) => {
        this.members = data;
        console.log(data)
        //this.loading = false;
      },
      (err: HttpErrorResponse) => {
        //show('Error', err.message, 'error');
      }
    );
  }

  loadNoticeTemplates(): void {
    //this.loading=true
    this.noticeTemplateService.getAllNoticeTemplate().subscribe((data: NoticeTemplate[]) => {
      this.noticeTemplates = data;
      //this.noticeTemplates$.next(data);
      //this.loading=false
    });
  }

  onCancelClick(): void {
    this.activeModal.dismiss();
  }

  errors: any;

validateNoticeForm(form: any, submitted: boolean): boolean {
  this.errors = {};

  // Validate Notification Method
  if (!form.notificationMethod) {
    this.errors.notificationMethod = 'Notification method is required.';
    this.toastr.error(this.errors.notificationMethod, 'Validation Error');
  }

  // Validate Receiver
  if (!form.receiver) {
    this.errors.receiver = 'Receiver is required.';
    this.toastr.error(this.errors.receiver, 'Validation Error');
  }

  // Validate Subject
  if (!form.subject) {
    this.errors.subject = 'Subject is required.';
    this.toastr.error(this.errors.subject, 'Validation Error');
  }

  // Validate Type
  if (!form.type) {
    this.errors.type = 'Type is required.';
    this.toastr.error(this.errors.type, 'Validation Error');
  }

  // Validate Importance
  if (!form.importance) {
    this.errors.importance = 'Importance is required.';
    this.toastr.error(this.errors.importance, 'Validation Error');
  }

  // All validations complete; return whether the form is valid
  return Object.keys(this.errors).length === 0;
}

}
