import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { QRCode } from 'src/app/main/models/QRcode';
import { HTTPService } from 'src/app/main/services/HTTPService';

@Component({
  selector: 'app-qr-code-modal',
  templateUrl: './qr-code-modal.component.html',
  styleUrls: ['./qr-code-modal.component.css']
})
export class QrCodeModalComponent implements OnInit {

  @Input() qrCode: QRCode;

  constructor(private toastr: ToastrService,
    public activeModal: NgbActiveModal,
    private qrCodeService: HTTPService
  ) {}

  ngOnInit(): void {
    console.log(this.qrCode);
  }

  validateFormData(data: any): boolean {
    if (!data.isbn || !/^\d{3}-\d{1,5}-\d{1,7}-\d{1,7}-\d{1}$/.test(data.isbn)) {
      this.toastr.error('Invalid ISBN format. Example: 978-3-16-148410-0');
      return false;
    }
    if (!data.width || data.width <= 0) {
      this.toastr.error('Width must be a positive number.');
      return false;
    }
    if (!data.height || data.height <= 0) {
      this.toastr.error('Height must be a positive number.');
      return false;
    }
    if (!data.margin || data.margin < 0) {
      this.toastr.error('Margin must be a non-negative number.');
      return false;
    }
    return true;
  }

  

  onSaveClick(): void {
    if (this.qrCode.id) {
      this.qrCodeService.updateQrCode(this.qrCode.id, this.qrCode).subscribe({
        next: () => {
          this.activeModal.close(this.qrCode);
        },
        error: (err) => {
          console.error('Error updating QR code:', err);
          alert('Failed to update QR code. Please try again.');
        }
      });
    } else {
      if(this.validateFormData(this.qrCode)){
        this.qrCodeService.createQrCode(this.qrCode).subscribe({
          next: (newQRCode) => {
            this.activeModal.close(newQRCode);
          },
          error: (err) => {
            console.error('Error creating QR code:', err);
            alert('Failed to create QR code. Please try again.');
          }
        });
        this.toastr.success('Item added successfully!', 'Success');
      }
      
    }
    
  }

  onCancelClick(): void {
    this.activeModal.dismiss();
  }
}
