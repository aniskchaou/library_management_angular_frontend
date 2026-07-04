import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Invoice } from 'src/app/main/models/Invoice';
import { Vendor } from 'src/app/main/models/Vendor';
import { HTTPService } from 'src/app/main/services/HTTPService';

@Component({
    selector: 'app-invoice-modal',
    templateUrl: './invoice-modal.component.html',
    styleUrls: ['./invoice-modal.component.css'],
    standalone: false
})
export class InvoiceModalComponent implements OnInit {

  @Input() invoice: Invoice;
  vendors: Vendor[] = [];

  constructor(
    public activeModal: NgbActiveModal,
    private invoiceService: HTTPService,
    private vendorService: HTTPService,
    private toastr:ToastrService
  ) {}

  ngOnInit(): void {
    this.loadVendors();
  }

  onSaveClick(): void {
    if(this.validateInvoiceForm(this.invoice)){
      this.invoiceService.createInvoice(this.invoice).subscribe((newInvoice) => {
        this.toastr.success('Item added successfully!', 'Success');
        this.activeModal.close(newInvoice);
      });
    }
  }

  onCancelClick(): void {
    this.activeModal.dismiss();
  }

  loadVendors(): void {
    this.vendorService.getAllVendors().subscribe((data: Vendor[]) => {
      this.vendors = data;
    });
  }

  validateInvoiceForm(invoice: any): boolean {
    const errors: Record<string, string> = {};

    // Validate Invoice Number
    if (!invoice.invoiceNumber || invoice.invoiceNumber.trim().length < 3) {
        errors.invoiceNumber = 'Invoice Number is required and must be at least 3 characters long.';
    }

    // Validate Invoice Date
    if (!invoice.invoiceDate || isNaN(Date.parse(invoice.invoiceDate))) {
        errors.invoiceDate = 'Invoice Date is required and must be a valid date.';
    }

    // Validate Vendor
    if (!invoice.vendor || typeof invoice.vendor !== 'object' || !invoice.vendor.name) {
        errors.vendor = 'Vendor selection is required.';
    }

    // Validate Total Amount
    if (!invoice.totalAmount || typeof invoice.totalAmount !== 'number' || invoice.totalAmount <= 0) {
        errors.totalAmount = 'Total Amount is required and must be a positive number.';
    }

    // Validate Notes (Optional but must be meaningful if provided)
    if (invoice.notes && invoice.notes.trim().length < 5) {
        errors.notes = 'Notes must be at least 5 characters long if provided.';
    }

    // Display errors using Toastr or console
    Object.entries(errors).forEach(([field, message]) => {
        console.error(`${field}: ${message}`);
        this.toastr.error(message, 'Validation Error');
    });

    // Return true if no errors, false otherwise
    return Object.keys(errors).length === 0;
}


}
