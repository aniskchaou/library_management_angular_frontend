import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NoticeTemplate } from 'src/app/main/models/NoticeTemplate';
import { HTTPService } from 'src/app/main/services/HTTPService';

@Component({
  selector: 'app-notice-template-modal',
  templateUrl: './notice-template-modal.component.html',
  styleUrls: ['./notice-template-modal.component.css']
})
export class NoticeTemplateModalComponent implements OnInit {

  @Input() noticeTemplate: NoticeTemplate;

  constructor(public activeModal: NgbActiveModal, private noticeTemplateService: HTTPService) {}

  ngOnInit(): void {
    console.log(this.noticeTemplate);
  }

  saveNoticeTemplate(): void {
    if (this.noticeTemplate.id) {
      this.noticeTemplateService.updateNoticeTemplate(this.noticeTemplate.id, this.noticeTemplate).subscribe(() => {
        this.activeModal.close(this.noticeTemplate);
      });
    } else {
      this.noticeTemplateService.createNoticeTemplate(this.noticeTemplate).subscribe(() => {
        this.activeModal.close(this.noticeTemplate);
      });
    }
  }

  onCancelClick(): void {
    this.activeModal.dismiss();
  }

}
