import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
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
    private invoiceService: HTTPService
  ) {}

  ngOnInit(): void {
    this.loadVendors();
    this.loadContracts();
    this.loadInvoices();
  }

  onSaveClick(): void {
     console.log(this.order)
      this.orderService.createOrder(this.order).subscribe((newOrder) => {
        this.activeModal.close(newOrder);
      });
    
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

}
