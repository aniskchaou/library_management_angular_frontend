import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Vendor } from 'src/app/main/models/Vendor';
import { HTTPService } from 'src/app/main/services/HTTPService';


@Component({
  selector: 'app-vendor-modal',
  templateUrl: './vendor-modal.component.html',
  styleUrls: ['./vendor-modal.component.css']
})
export class VendorModalComponent implements OnInit {
  @Input() vendor: Vendor = {} as Vendor;

  constructor(
    public activeModal: NgbActiveModal,
    private vendorService: HTTPService
  ) {}

  ngOnInit(): void {
    if (!this.vendor) {
      this.vendor = {} as Vendor; // Initialize vendor if not provided
    }
    // Initialize tooltips
    (window as any).$('[data-toggle="tooltip"]').tooltip();
  }

  onSaveClick(): void {
  
      this.vendorService.createVendor(this.vendor).subscribe({
        next: (newVendor) => this.activeModal.close(newVendor),
        error: (err) => console.error('Error creating vendor', err)
      });
    
  }

  onCancelClick(): void {
    this.activeModal.dismiss();
  }
}