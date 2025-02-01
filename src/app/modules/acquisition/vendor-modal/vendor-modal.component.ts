import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
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
    private toastr: ToastrService,
    public activeModal: NgbActiveModal,
    private vendorService: HTTPService
  ) {}

  ngOnInit(): void {
    if (!this.vendor) {
      this.vendor = {} as Vendor; // Initialize vendor if not provided
    }
    // Initialize tooltips
   // (window as any).$('[data-toggle="tooltip"]').tooltip();
  }

  onSaveClick(): void {
     if(this.validateVendorForm(this.vendor))
     {
      this.vendorService.createVendor(this.vendor).subscribe({
        next: (newVendor) => {this.activeModal.close(newVendor) ; this.toastr.success('Item added successfully!', 'Success');},
        error: (err) => console.error('Error creating vendor', err)
      });
     }
      
    
  }

  onCancelClick(): void {
    this.activeModal.dismiss();
  }

  validateVendorForm(vendor: any): boolean {
    const errors: any = {};
  
    // Validate Name
    if (!vendor.name || vendor.name.trim().length < 2) {
      errors.name = 'Name is required and must be at least 2 characters long.';
    }
  
    // Validate Address
    if (!vendor.address || vendor.address.trim().length < 5) {
      errors.address = 'Address is required and must be at least 5 characters long.';
    }
  
    // Validate Phone
    if (!vendor.phone || vendor.phone.trim().length < 10) {
      errors.phone = 'Phone number is required and must be at least 10 characters long.';
    }
  
    // Validate Fax (Optional but must follow proper format)
    if (vendor.fax && !this.isValidPhone(vendor.fax)) {
      errors.fax = 'Please enter a valid fax number.';
    }
  
    // Validate Website (Optional but must be a valid URL)
    if (vendor.website && !this.isValidUrl(vendor.website)) {
      errors.website = 'Please enter a valid website URL.';
    }
  
    // Validate Account Number
    if (!vendor.accountNumber || vendor.accountNumber.trim().length < 6) {
      errors.accountNumber = 'Account Number is required and must be at least 6 characters long.';
    }
  
    // Validate Email
    if (!vendor.email || !this.isValidEmail(vendor.email)) {
      errors.email = 'A valid email is required.';
    }
  
   /*  // Validate Tax Rate (Optional but must be a positive number)
    if (vendor.taxRate !== undefined && (isNaN(vendor.taxRate) || vendor.taxRate < 0)) {
      errors.taxRate = 'Tax Rate must be a positive number.';
    }
  
    // Validate Discount (Optional but must be a positive number)
    if (vendor.discount !== undefined && (isNaN(vendor.discount) || vendor.discount < 0)) {
      errors.discount = 'Discount must be a positive number.';
    }
  
    // Validate Delivery Time (Optional)
    if (vendor.deliveryTime && vendor.deliveryTime.trim().length < 2) {
      errors.deliveryTime = 'Delivery Time must be at least 2 characters long.';
    }
  
    // Validate Notes (Optional but must be at least 5 characters if provided)
    if (vendor.notes && vendor.notes.trim().length < 5) {
      errors.notes = 'Notes must be at least 5 characters long.';
    }
   */
    // Display errors using Toastr or console
    Object.entries(errors).forEach(([field, message]) => {
      console.error(`${field}: ${message}`);
      this.toastr.error(message+'', 'Validation Error');
    });
  
    // Return true if no errors, false otherwise
    return Object.keys(errors).length === 0;
  }
  
  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  isValidUrl(url: string): boolean {
    const urlRegex = /^(https?:\/\/)?([\w\d\-]+\.)+\w{2,}(\/.*)?$/;
    return urlRegex.test(url);
  }
  
  isValidPhone(phone: string): boolean {
    const phoneRegex = /^\+?[0-9\-()\s]+$/;
    return phoneRegex.test(phone);
  }
  

}