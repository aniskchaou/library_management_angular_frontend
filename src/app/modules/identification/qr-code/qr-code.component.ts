import { Component, OnInit } from '@angular/core';
import { QrCodeModalComponent } from '../qr-code-modal/qr-code-modal.component';
import { QRCode } from 'src/app/main/models/QRcode';
import { HTTPService } from 'src/app/main/services/HTTPService';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { ViewQrcodeComponent } from '../view-qrcode/view-qrcode.component';
import CONFIG from 'src/app/main/urls/urls';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.css']
})
export class QrCodeComponent implements OnInit {

  qrCodes: QRCode[] = [];
  selectedQRCode: QRCode | null = null;
  qrCodeData: string = '';
  qrCodeWidth: number = 200;
  qrCodeHeight: number = 200;
  qrCodeMargin: number = 0;
  loadingIndicator = true;
  reorderable = true;
  markdownContent: any;
  loadingImage: boolean;
  retrieveResonse: any;
  base64Data: any;
  retrievedImage: any;

  constructor(
    private toastr: ToastrService,
    private qrCodeService: HTTPService,
    private modalService: NgbModal,
    private http:HttpClient,
    private httpService:HTTPService
  ) {}

  ngOnInit(): void {
    this.loadQRCodes();
    this.fetchMarkdownFile()
  }

  loadQRCodes(): void {
    this.qrCodeService.getAllQrCodes().subscribe({
      next: data => {
        this.qrCodes = data;
        this.loadingIndicator = false;
      },
      error: error => {
        console.error('Error loading QR codes:', error);
        alert('Failed to load QR codes. Please try again.');
        this.loadingIndicator = false;
      }
    });
  }

  openAddDialog(): void {
    const modalRef = this.modalService.open(QrCodeModalComponent);
    modalRef.componentInstance.qrCode = {} as QRCode;

    modalRef.result.then(result => {
      if (result) {
        this.qrCodeService.createQrCode(result).subscribe({
          next: () => {
            this.loadQRCodes();
          },
          error: error => {
            console.error('Error creating QR code:', error);
            alert('Failed to add QR code. Please try again.');
          }
        });
      }
    }).catch(error => {
      console.error('Modal dismissed with error:', error);
      alert('Error occurred while opening add dialog.');
    });
  }

  

  openEditDialog(qrCode: QRCode): void {
    this.selectedQRCode = { ...qrCode };
    const modalRef = this.modalService.open(QrCodeModalComponent);
    modalRef.componentInstance.qrCode = this.selectedQRCode;

    modalRef.result.then(result => {
      if (result) {
        this.qrCodeService.updateQrCode(result.id, result).subscribe({
          next: () => {
            this.loadQRCodes();
          },
          error: error => {
            console.error('Error updating QR code:', error);
            alert('Failed to update QR code. Please try again.');
          }
        });
      }
    }).catch(error => {
      console.error('Modal dismissed with error:', error);
      alert('Error occurred while opening edit dialog.');
    });
  }

  openViewDialog(qrCode: QRCode): void {
    this.selectedQRCode = { ...qrCode };
    const modalRef = this.modalService.open(ViewQrcodeComponent);
    modalRef.componentInstance.qrCode = { ...qrCode };
    modalRef.result.then(result => {})
  }

  deleteQRCode(id: number): void {
    this.qrCodeService.deleteQrCode(id).subscribe({
      next: () => {
        this.toastr.success('Item removed successfully!', 'Success');
        this.loadQRCodes();
      },
      error: error => {
        console.error('Error deleting QR code:', error);
        alert('Failed to delete QR code. Please try again.');
      }
    });
  }

  generateQRCode(): void {
    // Add your QR code generation logic here
    console.log('Generate QR Code with data:', this.qrCodeData);
  }

  updateFilter(event: any): void {
    const value = event.target.value.toLowerCase();
    this.qrCodes = this.qrCodes.filter(qrCode =>
      qrCode.isbn.toLowerCase().includes(value)
    );
  }

  refreshData(): void {
    this.loadingIndicator = true;
    this.loadQRCodes();
  }

  onSelect(event: any): void {
    console.log('Row selected:', event);
  }

  onActivate(event: any): void {
    console.log('Row activated:', event);
  }

  fetchMarkdownFile(): void {
    this.http.get('assets/documentation/modules/qrcode.html', { responseType: 'text' })
      .subscribe(data => {
        console.log(data)
        this.markdownContent = data;
      });
  }

   printQrCode(qrCode) {
    // Construct the URL for the image
    let imgSrc = CONFIG.URL_BASE + '/qrcode/get/' + qrCode?.isbn + '.png';
    
    // Open a new window
    let printWindow = window.open('', '_blank');
    
    // Write the HTML content to the new window
    printWindow.document.write(`
        <html>
            <head>
                <title>Print QR Code</title>
                <style>
                    body {
                        text-align: center;
                        margin: 0;
                        padding: 0;
                    }
                    img {
                        max-width: 100%;
                        max-height: 100%;
                    }
                </style>
            </head>
            <body>
                <img src="${imgSrc}" alt="QR Code" />
            </body>
        </html>
    `);

    // Ensure the new window is fully loaded before printing
    printWindow.document.close();
    printWindow.focus();
    
    // Trigger the print dialog
    printWindow.onload = function() {
        printWindow.print();
        printWindow.onafterprint = function() {
            printWindow.close(); // Close the window after printing
        };
    };
    this.toastr.success('Item is printed!', 'Success');
}

 downloadQrCode(qrCode) {
  // Construct the URL for the image
  let imgSrc = CONFIG.URL_BASE + '/qrcode/get/' + qrCode?.isbn + '.png';
    
  // Open a new window (or tab)
  let downloadWindow = window.open(imgSrc, '_blank');
  
  // Check if the window opened successfully
  if (downloadWindow) {
      // Instruct the new page to download the image
      downloadWindow.onload = function() {
          let a = document.createElement('a');
          a.href = imgSrc;
          a.download = qrCode?.isbn + '.png';
          downloadWindow.document.body.appendChild(a);
          a.click();
          downloadWindow.document.body.removeChild(a);
          downloadWindow.close();  // Close the window after downloading
      };
  } else {
      console.log("Failed to open the new window.");
  }
  this.toastr.success('Item is downloded!', 'Success');
}

regenerateQRCode(qrCode){
  this.httpService.getAll(CONFIG.URL_BASE + '/qrcode/saveQRCode/' + qrCode?.isbn ).subscribe((data)=>{
    console.log(data)
    this.toastr.success('Item is regenerated', 'Success');
  })
}


  
}
