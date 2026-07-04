import { Component, OnInit } from '@angular/core';
import { Contract } from 'src/app/main/models/Contract';
import { ContractModalComponent } from '../contract-modal/contract-modal.component';
import { HTTPService } from 'src/app/main/services/HTTPService';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UploadDocumentComponent } from '../upload-document/upload-document.component';
import CONFIG from 'src/app/main/urls/urls';
import { ToastrService } from 'ngx-toastr';
import { ViewContractComponent } from '../view-contract/view-contract.component';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-contract',
    templateUrl: './contract.component.html',
    styleUrls: ['./contract.component.css'],
    standalone: false
})
export class ContractComponent implements OnInit {

  

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
  markdownContent
  loadingIndicator=false
  contracts: Contract[] = [];

  constructor(
    private contractService: HTTPService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private httpService:HTTPService,
    private http:HttpClient
  ) {}

  ngOnInit(): void {
    this.loadContracts();
    this.fetchMarkdownFile()
  }

  loadContracts(): void {
    this.loadingIndicator=true
    this.contractService.getAllContracts().subscribe(data => {
      this.contracts = data;
      this.loadingIndicator=false
    });
  }

  openAddDialog(): void {
    const modalRef = this.modalService.open(ContractModalComponent);
    modalRef.componentInstance.contract = {} as Contract;

    modalRef.result.then(result => {
      if (result) {
        this.contractService.createContract(result).subscribe(() => {
          this.loadContracts();
        });
      }
    }).catch(() => {});
  }

  openEditDialog(contract: Contract): void {
    const modalRef = this.modalService.open(ContractModalComponent);
    modalRef.componentInstance.contract = { ...contract };

    modalRef.result.then(result => {
      if (result) {
        this.contractService.updateContract(result.id, result).subscribe(() => {
          this.loadContracts();
        });
      }
    }).catch(() => {});
  }

  openViewDialog(contract: Contract): void {
    const modalRef = this.modalService.open(ViewContractComponent,{size: 'xl', 
      centered: true,});
    modalRef.componentInstance.contract = { ...contract };

    modalRef.result.then(result => {
      if (result) {
        this.contractService.updateContract(result.id, result).subscribe(() => {
          this.loadContracts();
        });
      }
    }).catch(() => {});
  }

  deleteContract(id: number): void {
    this.contractService.deleteContract(id).subscribe(() => {
      this.loadContracts();
    });
  }

  openUploadDialog(row): void {
    const modalRef = this.modalService.open(UploadDocumentComponent);
    modalRef.componentInstance.contract = row;

    modalRef.result.then(result => {
      if (result) {
       /*  this.departmentService.createDepartment(result).subscribe(() => {
          this.loadDepartments();
        }); */
      }
    }).catch(() => {});
  }
  

  sendReminder(row:Contract){
    let userName = row.vendor.email.split('@')[0];

    // Replace placeholders
    let today = new Date().toLocaleDateString().replace(/\//g, '-'); // Get today's date in local format
   let  emailMessage: string = `
Dear [Vendor Name],

I hope this message finds you well.

This is a friendly reminder regarding your contract with [Your Company Name]. As per our records, your contract is set to [expire/renew] on [expiration date]. We want to ensure that all necessary steps are completed in time, allowing a smooth continuation of our partnership.

Please review the contract and inform us of any changes or updates you'd like to discuss before the deadline.

Key Details:

Vendor Name: [Vendor Name]
Contract Number: [Contract Number]
Expiration/Renewal Date: [Expiration Date]

If you need any assistance or have any questions, feel free to reach out. We look forward to continuing our partnership and working with you.

Thank you for your attention to this matter.

Best regards,
[Your Full Name]
[Your Position]
[Your Company Name]
[Contact Information]
`;

emailMessage = emailMessage
      .replace("[Name]", userName)  // Replace [Name] with the username
      .replace("[All]", "Members")  // Replace [ALL] with "Members"
      .replace("[Date]", today).replace("[Library Name]", "");; 
     //
     const body = {
      toEmail: 'kchaouanis20@gmail.com',
      subject: "Reminder: Upcoming Contract Renewal/Expiration",
      body: emailMessage
    };
  this.httpService.create(CONFIG.URL_BASE+'/notice/send',body)
.finally(()=>{
this.toastr.success("Your email was sent successfully! ")
})
  }


  fetchMarkdownFile(): void {
    this.http.get('assets/documentation/modules/contract.html', { responseType: 'text' })
      .subscribe(data => {
        this.markdownContent = data;
      });
  }
}
