import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Invoice } from 'src/app/main/models/Invoice';
import { Vendor } from 'src/app/main/models/Vendor';
import { HTTPService } from 'src/app/main/services/HTTPService';

@Component({
  selector: 'app-invoice-modal',
  templateUrl: './invoice-modal.component.html',
  styleUrls: ['./invoice-modal.component.css']
})
export class InvoiceModalComponent implements OnInit {

  @Input() invoice: Invoice;
  vendors: Vendor[] = [];

  constructor(
    public activeModal: NgbActiveModal,
    private invoiceService: HTTPService,
    private vendorService: HTTPService
  ) {}

  ngOnInit(): void {
    this.loadVendors();
  }

  onSaveClick(): void {
    if (this.invoice.id) {
      this.invoiceService.updateInvoice(this.invoice.id, this.invoice).subscribe(() => {
        this.activeModal.close(this.invoice);
      });
    } else {
      this.invoiceService.createInvoice(this.invoice).subscribe((newInvoice) => {
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

}
