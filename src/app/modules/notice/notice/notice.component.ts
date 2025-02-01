import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Notice } from 'src/app/main/models/Notice';
import { HTTPService } from 'src/app/main/services/HTTPService';
import { NoticeModalComponent } from '../notice-modal/notice-modal.component';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import CONFIG from 'src/app/main/urls/urls';
import Member from 'src/app/main/models/Member';
import { NoticeTemplate } from 'src/app/main/models/NoticeTemplate';
import { not } from '@angular/compiler/src/output/output_ast';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-notice',
  templateUrl: './notice.component.html',
  styleUrls: ['./notice.component.css']
})
export class NoticeComponent implements OnInit {
  
  barChartData = [
    { "name": "Notices Sent", "value": 120 },
    { "name": "Notices Received", "value": 150 },
    { "name": "Notices Pending", "value": 80 },
    { "name": "High Importance", "value": 60 },
    { "name": "Medium Importance", "value": 90 },
    { "name": "Low Importance", "value": 110 }
  ];

  pieChartData = [
    { "name": "Notices Sent", "value": 120 },
    { "name": "Notices Received", "value": 150 },
    { "name": "Notices Pending", "value": 80 },
    { "name": "High Importance", "value": 60 },
    { "name": "Medium Importance", "value": 90 },
    { "name": "Low Importance", "value": 110 }
  ];

  lineChartData = [
    { 
      "name": "Notices Over Time",
      "series": [
        { "name": "January", "value": 10 },
        { "name": "February", "value": 15 },
        { "name": "March", "value": 8 },
        { "name": "April", "value": 6 },
        { "name": "May", "value": 9 },
        { "name": "June", "value": 11 }
      ]
    }
  ];

  doughnutChartData = [
    { "name": "Notices Sent", "value": 5 },
    { "name": "Notices Received", "value": 7 },
    { "name": "Notices Pending", "value": 4 },
    { "name": "High Importance", "value": 3 },
    { "name": "Medium Importance", "value": 4 },
    { "name": "Low Importance", "value": 6 }
  ];

  notices: Notice[] = [];
  temp: Notice[] = []; // Backup for filtering
  selected = [];
  loadingIndicator = true;
  reorderable = true;
  markdownContent: any;
  members: Member[];
  noticeTemplates: NoticeTemplate[];

  constructor(private toastr: ToastrService,private httpService:HTTPService,private noticeService: HTTPService, private modalService: NgbModal,private http:HttpClient) {}

  ngOnInit(): void {
    setTimeout(() => { this.loadingIndicator = false; }, 1000);
    this.loadNotices();
    this.fetchMarkdownFile()
  
  }

  loadNotices(): void {
    this.noticeService.getAllNotice().subscribe((data: Notice[]) => {
      this.notices = data;
      this.temp = [...data];
      this.loadingIndicator = false;
    });
  }

  setHighPriority(row){
    this.httpService.getAll(CONFIG.URL_BASE+'/notice/'+row.id+'/importance/high').subscribe(()=>{
      this.toastr.success("The notice has been successfully updated to 'high' importance.")
    })
  }

  updateFilter(event): void {
    const val = event.target.value.toLowerCase();
    const temp = this.temp.filter(d => d.subject.toLowerCase().includes(val));
    this.notices = temp;
  }

  onSelect({ selected }): void {
    console.log('Selected row:', selected);
    this.selected = [...selected];
  }

  onActivate(event): void {
    console.log('Activate Event:', event);
  }

  openAddDialog(): void {
    const modalRef = this.modalService.open(NoticeModalComponent);
    modalRef.componentInstance.notice = {} as Notice;

    modalRef.result.then(result => {
      if (result) {
        this.noticeService.createNotice(result).subscribe(() => {
          this.loadNotices();
        });
      }
    }).catch(error => console.log(error));
  }

  openEditDialog(notice: Notice): void {
    const modalRef = this.modalService.open(NoticeModalComponent);
    modalRef.componentInstance.notice = { ...notice };

    modalRef.result.then(result => {
      if (result) {
        this.noticeService.updateNotice(result.id!, result).subscribe(() => {
          this.loadNotices();
        });
      }
    }).catch(error => console.log(error));
  }

  deleteNotice(id: number): void {
    this.noticeService.deleteNotice(id).subscribe( {
        next: (response) => {
          // Handle response if needed, since it may be text
          this.loadNotices();
          this.toastr.success('Item removed successfully!', 'Success');
        },
        error: (err) => {
          this.toastr.error('Error removing item', 'Error');
        }
      }
    );
  }

  refreshData(): void {
    this.loadNotices();
  }

  fetchMarkdownFile(): void {
    this.http.get('assets/documentation/modules/notice.html', { responseType: 'text' })
      .subscribe(data => {
        console.log(data)
        this.markdownContent = data;
      });
  }

  notifyNotice(notice:Notice){

    let userName = notice.receiver.split('@')[0];

    // Replace placeholders
    let today = new Date().toLocaleDateString().replace(/\//g, '-'); // Get today's date in local format
    
    notice.subject = notice.subject
      .replace("[Name]", userName)  // Replace [Name] with the username
      .replace("[All]", "Members")  // Replace [ALL] with "Members"
      .replace("[Date]", today).replace("[Library Name]", "");; 
     console.log(notice.subject)
    
     

    if(notice.notificationMethod=='sms'||notice.notificationMethod=='SMS')
    {

      const bodysms = {
        toEmail: '+33643824870',
        subject: notice.type,
        body: notice.subject
      };
       console.log(CONFIG.URL_BASE+'/notice/+33643824870/'+notice.subject+'/send')
     this.httpService.create(CONFIG.URL_BASE+'/notice/send-sms',bodysms).finally(()=>{
      this.toastr.success("Your SMS was sent successfully! Keep an eye out for a reply")

     })

    }else{

      const body = {
        toEmail: notice.receiver,
        subject: notice.type,
        body: notice.subject
      };
    this.httpService.create(CONFIG.URL_BASE+'/notice/send',body)
.finally(()=>{
  this.toastr.success("Your email was sent successfully! Check your inbox for a confirmation")
}
       
    );
  
  }

}


}