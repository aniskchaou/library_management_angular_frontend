import { HttpClient, HttpErrorResponse, HttpEventType, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from 'src/app/main/services/data.service';
import { HTTPService } from 'src/app/main/services/HTTPService';
import CONFIG from 'src/app/main/urls/urls';
import { EditMemberComponent } from '../edit-member/edit-member.component';
import { FileUploadService } from 'src/app/main/services/FileUploadService ';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import html2canvas from 'html2canvas';
import { ToastrService } from 'ngx-toastr';
declare var paypal: any;
@Component({
    selector: 'app-view-member',
    templateUrl: './view-member.component.html',
    styleUrls: ['./view-member.component.css'],
    standalone: false
})
export class ViewMemberComponent implements OnInit, OnChanges {
  @Input() id: any; // Member ID passed from the parent
  @Input() member: any; // Member data passed from the parent
  memberI18n: any;
  statistics;
  circulations;
  loadingIndicator = true;
  reorderable = true;
  files: any[] = [];
  paymentLink: any;

 

  constructor(
    private toastr: ToastrService,
    private activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private router: Router,
    private dataService: DataService,
    private httpService: HTTPService,
    private fileUploadService: FileUploadService,
    private fb: UntypedFormBuilder,
    private http:HttpClient
  ) {
    this.uploadForm = this.fb.group({
      file: [null]
    });
  }

  ngOnInit(): void {
    // Fetch member data initially if ID is available
    if (this.id) {
      this.viewMember(this.id);
    }
    // Fetch internationalization data
    this.getMemberByLang(CONFIG.getInstance().getLang());


    this.httpService.getAll(`${CONFIG.URL_BASE}/circulation/member-satistics/`+this.member.id).subscribe(
      (data) => {
        this.statistics = data;
      },
      (err: HttpErrorResponse) => {
        console.error('Error fetching member:', err.message);
      }
    );


    this.httpService.getAll(`${CONFIG.URL_BASE}/circulation/member/`+this.member.id).subscribe(
      (data) => {
        this.circulations = data;
      },
      (err: HttpErrorResponse) => {
        console.error('Error fetching member:', err.message);
      }
    );

    this.httpService
    .getAll(CONFIG.URL_BASE + '/member/files/'+this.member.id)
    .subscribe(
      (data) => {
        this.files = data as any;
      },
      (err: HttpErrorResponse) => {}
    );








  /*   paypal.Buttons({
      createOrder: (data, actions) => {
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: '0.1'  // Dynamic amount
            }
          }]
        });
      },
      onApprove: (data, actions) => {
        return actions.order.capture().then((details) => {
          // Here you can send the response to the backend for further processing
          this.handlePaymentSuccess(details);
        });
      }
    }).render('#paypal-button-container'); */










  }

  generatePaymentLink(amount,currency,description) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + btoa(localStorage.getItem('username') + ':' + localStorage.getItem('password')),
    });

    // Prepare the payload
    const body = {
      amount: amount,
      currency: currency,
      description: description,
    };

    // Make the HTTP POST request
    return this.http.post<string>(`${CONFIG.URL_BASE}/api/paypal/create-payment`, body, { headers: headers}).subscribe((data:any) => {
      this.paymentLink=data?.paymentLink
    }, error => {
      console.error('Error sending payment link:', error);
    });
  }

  copyPaymentLink(paymentLink: string) {
    if (paymentLink) {
      // Use the Clipboard API to write the payment link to the clipboard
      navigator.clipboard.writeText(paymentLink).then(() => {
        // Successfully copied the text
        alert('Payment link copied to clipboard!'); // Notify the user
      }).catch(err => {
        // Handle the error if the copy operation fails
        console.error('Failed to copy: ', err);
        alert('Failed to copy the payment link. Please try again.'); // Notify the user about the error
      });
    } else {
      alert('No payment link available to copy.'); // Notify if there's no link to copy
    }
  }
  
  

  sendPaymentLink() {
    if (this.paymentLink) {
      const paymentData = {
        paymentLink: this.paymentLink,
        amountDue: 10 ,// Replace with actual amount
        description: 'Payment for Order', // Replace with actual description
        customerName: this.member?.firstname,
        email:this.member?.primary_email // Replace with actual customer name
      };

      const header = new HttpHeaders({
        Authorization: 'Basic ' + btoa(localStorage.getItem('username') + ':' + localStorage.getItem('password')),
        'Content-Type': 'application/json'
      });

      this.http.post(CONFIG.URL_BASE+'/api/paypal/send-payment-link', paymentData, { headers: header})
        .subscribe(() => {
        }, error => {
          console.error('Error sending payment link:', error);
        });
    } else {
      console.error('No payment link to send.');
    }
  }

  handlePaymentSuccess(details: any) {
    this.httpService.create(CONFIG.URL_BASE+'/api/paypal/complete', details)
      .then(response => {
      }, error => {
        console.error('Payment failed', error);
      });
    }
  ngOnChanges(changes: any): void {
    // Check if the ID input has changed and fetch the new member details
    if (changes.id && changes.id.currentValue) {
      this.viewMember(changes.id.currentValue);
    }
  }

  viewMember(id: any): void {
    this.httpService.getAll(`${CONFIG.URL_BASE}/member/${id}`).subscribe(
      (data) => {
        this.member = data;
      },
      (err: HttpErrorResponse) => {
        console.error('Error fetching member:', err.message);
      }
    );
  }

  getMemberByLang(lang: string): void {
     lang='EN'
    this.httpService.getAll(`${CONFIG.URL_BASE}/i18n/member/${lang}`).subscribe(
      (data) => {
        this.memberI18n = data;
      },
      (err: HttpErrorResponse) => {
        console.error('Error fetching member internationalization data:', err.message);
      }
    );
  }

  deleteRow(row: any): void {
    // Implement delete functionality here, e.g., call a delete service
  }

  editRow(row: any): void {
    this.openEditDialog(row);
  }

  closeModal(): void {
    this.activeModal.dismiss(); // Close the modal
  }

  openEditDialog(member: any): void {
    const modalRef = this.modalService.open(EditMemberComponent);
    modalRef.componentInstance.member = { ...member }; // Pass the member data
    this.closeModal()
    modalRef.result.then(result => {
      this.dataService.triggerRefresh(); // Trigger refresh in other components
    }).catch(() => {});
  }



  
  uploadForm: UntypedFormGroup;
  fileToUpload: File = null;

  

  onFileChange(event) {
    if (event.target.files.length > 0) {
      this.fileToUpload = event.target.files[0];
      this.uploadForm.patchValue({
        file: this.fileToUpload
      });
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('file', this.uploadForm.get('file').value);

    this.fileUploadService.upload(formData)
      .subscribe(response => {
      });
      this.toastr.success("Your file has been uploaded successfully.", 'Success');
  }


   // Method to download the card as an image
   downloadCard(): void {
    this.toastr.success("Your PDF file will be downloaded shortly.", 'Success');
    const cardElement = document.querySelector('.membership-card') as HTMLElement;

    html2canvas(cardElement).then(canvas => {
      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = 'membership-card.png';
      link.click();
    });
  }

  // Method to print the card
  printCard(): void {
    const printContent = document.querySelector('.membership-container')?.innerHTML;
    const printWindow = window.open('', '', 'height=600,width=800');
    
    if (printWindow && printContent) {
      printWindow.document.write('<html><head><title>Membership Card</title>');
      printWindow.document.write('<style>body { font-family: Arial, sans-serif; }</style>');  // You can add your CSS here
      printWindow.document.write('</head><body>');
      printWindow.document.write(printContent);
      printWindow.document.write('</body></html>');
      printWindow.document.close();
      printWindow.print();
    }
  }

  downloadFile(filename: string): void {
    this.toastr.success("Your PDF file will be downloaded shortly.", 'Success');
    const link = document.createElement('a');
    link.href = CONFIG.URL_BASE+`/member/member-files/${this.member.id}/${filename}`
    link.target = '_blank';
    link.click();
}






}
