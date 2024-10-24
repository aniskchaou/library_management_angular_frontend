import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { QRCode } from 'src/app/main/models/QRcode';
import { HTTPService } from 'src/app/main/services/HTTPService';

@Component({
  selector: 'app-qr-code-modal',
  templateUrl: './qr-code-modal.component.html',
  styleUrls: ['./qr-code-modal.component.css']
})
export class QrCodeModalComponent implements OnInit {

  @Input() qrCode: QRCode;

  constructor(
    public activeModal: NgbActiveModal,
    private qrCodeService: HTTPService
  ) {}

  ngOnInit(): void {
    console.log(this.qrCode);
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
      this.qrCodeService.createQrCode(this.qrCode).subscribe({
        next: (newQRCode) => {
          this.activeModal.close(newQRCode);
        },
        error: (err) => {
          console.error('Error creating QR code:', err);
          alert('Failed to create QR code. Please try again.');
        }
      });
    }
  }

  onCancelClick(): void {
    this.activeModal.dismiss();
  }
}
