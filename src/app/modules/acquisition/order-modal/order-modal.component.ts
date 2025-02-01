import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Contract } from 'src/app/main/models/Contract';
import { Invoice } from 'src/app/main/models/Invoice';
import { Order } from 'src/app/main/models/Order';
import { Vendor } from 'src/app/main/models/Vendor';
import { HTTPService } from 'src/app/main/services/HTTPService';

@Component({
  selector: 'app-order-modal',
  templateUrl: './order-modal.component.html',
  styleUrls: ['./order-modal.component.css']
})
export class OrderModalComponent implements OnInit {

  @Input() order: Order;
  vendors: Vendor[] = [];
  contracts: Contract[] = [];
  invoices: Invoice[] = [];

  constructor(
    public activeModal: NgbActiveModal,
    private orderService: HTTPService,
    private vendorService: HTTPService,
    private contractService: HTTPService,
    private invoiceService: HTTPService,
    private toastr:ToastrService
  ) {}

  ngOnInit(): void {
    this.loadVendors();
    this.loadContracts();
    this.loadInvoices();
  }

  onSaveClick(): void {
     console.log(this.order)
     if(this.validateOrderForm(this.order)){
      this.orderService.createOrder(this.order).subscribe((newOrder) => {
        this.toastr.success('Item added successfully!', 'Success');
        this.activeModal.close(newOrder);
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

  loadContracts(): void {
    this.contractService.getAllContracts().subscribe((data: Contract[]) => {
      this.contracts = data;
    });
  }

  loadInvoices(): void {
    this.invoiceService.getAllInvoices().subscribe((data: Invoice[]) => {
      this.invoices = data;
    });
  }

  validateOrderForm(order: any): boolean {
    const errors: Record<string, string> = {};

    // Validate Order Number
    if (!order.orderNumber || order.orderNumber.trim().length < 3) {
        errors.orderNumber = 'Order Number is required and must be at least 3 characters long.';
    }

    // Validate Order Date
    if (!order.orderDate || isNaN(Date.parse(order.orderDate))) {
        errors.orderDate = 'Order Date is required and must be a valid date.';
    }

    // Validate Vendor
    if (!order.vendor || typeof order.vendor !== 'object' || !order.vendor.name) {
        errors.vendor = 'Vendor selection is required.';
    }

    // Validate Total Cost
    if (!order.totalCost || typeof order.totalCost !== 'number' || order.totalCost <= 0) {
        errors.totalCost = 'Total Cost is required and must be a positive number.';
    }

    // Validate Status
    if (!order.status || !['Pending', 'Cancelled', 'Shipped', 'Delivered'].includes(order.status)) {
        errors.status = 'Status is required and must be one of the following: Pending, Cancelled, Shipped, Delivered.';
    }

    // Validate Notes (Optional but must be meaningful if provided)
    if (order.notes && order.notes.trim().length < 5) {
        errors.notes = 'Notes must be at least 5 characters long if provided.';
    }

    // Validate Contract
    if (!order.contract || typeof order.contract !== 'object' || !order.contract.contractNumber) {
        errors.contract = 'Contract selection is required.';
    }

    // Validate Invoice
    if (!order.invoice || typeof order.invoice !== 'object' || !order.invoice.invoiceNumber) {
        errors.invoice = 'Invoice selection is required.';
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
