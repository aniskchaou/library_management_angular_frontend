import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NoticeTemplate } from 'src/app/main/models/NoticeTemplate';
import { HTTPService } from 'src/app/main/services/HTTPService';
import { NoticeTemplateModalComponent } from '../notice-template-modal/notice-template-modal.component';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import Member from 'src/app/main/models/Member';
import CONFIG from 'src/app/main/urls/urls';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-notice-template',
    templateUrl: './notice-template.component.html',
    styleUrls: ['./notice-template.component.css'],
    standalone: false
})
export class NoticeTemplateComponent implements OnInit {

  barChartData = [
    { "name": "Fiction", "value": 120 },
    { "name": "Non-fiction", "value": 150 },
    { "name": "Science", "value": 80 },
    { "name": "History", "value": 60 },
    { "name": "Biography", "value": 90 },
    { "name": "Fantasy", "value": 110 }
  ];

  pieChartData = [
    { "name": "Fiction", "value": 120 },
    { "name": "Non-fiction", "value": 150 },
    { "name": "Science", "value": 80 },
    { "name": "History", "value": 60 },
    { "name": "Biography", "value": 90 },
    { "name": "Fantasy", "value": 110 }
  ];

  lineChartData = [
    { 
      "name": "Borrow Rate",
      "series": [
        { "name": "Fiction", "value": 10 },
        { "name": "Non-fiction", "value": 15 },
        { "name": "Science", "value": 8 },
        { "name": "History", "value": 6 },
        { "name": "Biography", "value": 9 },
        { "name": "Fantasy", "value": 11 }
      ]
    }
  ];

  doughnutChartData = [
    { "name": "Fiction", "value": 5 },
    { "name": "Non-fiction", "value": 7 },
    { "name": "Science", "value": 4 },
    { "name": "History", "value": 3 },
    { "name": "Biography", "value": 4 },
    { "name": "Fantasy", "value": 6 }
  ];

  noticeTemplates: NoticeTemplate[] = [];
  noticeTemplates$: BehaviorSubject<NoticeTemplate[]> = new BehaviorSubject<NoticeTemplate[]>([]);
  markdownContent
  loading=false
  members: Member[];
  constructor(private toastr: ToastrService,private noticeTemplateService: HTTPService, 
    private modalService: NgbModal,
    private http:HttpClient,
  private httpService:HTTPService) {}

  ngOnInit(): void {
    this.loadNoticeTemplates();
    this.fetchMarkdownFile()
  }

  loadNoticeTemplates(): void {
    this.loading=true
    this.noticeTemplateService.getAllNoticeTemplate().subscribe((data: NoticeTemplate[]) => {
      this.noticeTemplates = data;
      this.noticeTemplates$.next(data);
      this.loading=false
    });
  }

  fetchMarkdownFile(): void {
    this.http.get('assets/documentation/modules/notice-template.html', { responseType: 'text' })
      .subscribe(data => {
        this.markdownContent = data;
      });
  }

  openAddDialog(): void {
    const modalRef = this.modalService.open(NoticeTemplateModalComponent);
    modalRef.componentInstance.noticeTemplate = {} as NoticeTemplate;

    modalRef.result.then(result => {
     
      
        this.noticeTemplateService.createNoticeTemplate(result).subscribe(() => {
          this.loadNoticeTemplates();
        });
      
    }).catch(() => {});
  }

  openEditDialog(noticeTemplate: NoticeTemplate): void {
    const modalRef = this.modalService.open(NoticeTemplateModalComponent);
    modalRef.componentInstance.noticeTemplate = { ...noticeTemplate };

    modalRef.result.then(result => {
      if (result) {
        this.noticeTemplateService.updateNoticeTemplate(result.id!, result).subscribe(() => {
          this.loadNoticeTemplates();
        });
      }
    }).catch(() => {});
  }

 /*  deleteNoticeTemplate(id: number): void {
    this.noticeTemplateService.deleteNoticeTemplate(id).subscribe(() => {
      this.loadNoticeTemplates();
      this.toastr.success('Item removed successfully!', 'Success');
    });
  } */

    deleteNoticeTemplate(id: number): void {
      this.noticeTemplateService.deleteNoticeTemplate(id).subscribe({
        next: (response) => {
          // Handle response if needed, since it may be text
          this.loadNoticeTemplates();
          this.toastr.success('Item removed successfully!', 'Success');
        },
        error: (err) => {
          this.toastr.error('Error removing item', 'Error');
        }
      });
    }
    

  clone(obj: any) {
    // Create a copy of the object and modify the title and remove the ID
    const clonedObj = { 
        ...obj, 
        title: obj.title + " (copy)" // Append "(copy)" to the title
    };

    delete clonedObj.id; // Remove the id field

    // Send the modified object to the createNoticeTemplate method
    this.noticeTemplateService.createNoticeTemplate(clonedObj).subscribe(() => {
        this.loadNoticeTemplates(); // Reload the templates after creation
    });
  }

  



}
