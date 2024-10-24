import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
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

  constructor(private noticeTemplateService:HTTPService,public activeModal: NgbActiveModal, private noticeService: HTTPService,private httpService:HTTPService) {}

  ngOnInit(): void {
    console.log(this.notice);
    this.loadNoticeTemplates()
    this.getAllMembers()
  }

  saveNotice(): void {
    console.log(this.notice)
    if (this.notice.id) {
      this.noticeService.updateNotice(this.notice.id, this.notice).subscribe(() => {
        this.activeModal.close(this.notice);
      });
    } else {
      this.noticeService.createNotice(this.notice).subscribe(() => {
        this.activeModal.close(this.notice);
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

}
