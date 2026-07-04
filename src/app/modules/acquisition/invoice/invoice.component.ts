import { Component, OnInit } from '@angular/core';
import { Invoice } from 'src/app/main/models/Invoice';
import { InvoiceModalComponent } from '../invoice-modal/invoice-modal.component';
import { PaymentModalComponent, getInvoicePaymentStatus } from '../payment-modal/payment-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HTTPService } from 'src/app/main/services/HTTPService';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-invoice',
    templateUrl: './invoice.component.html',
    styleUrls: ['./invoice.component.css'],
    standalone: false
})
export class InvoiceComponent implements OnInit {

 

  barChartData = [
    { "name": "Fiction", "value": 120 },
    { "name": "Non-fiction", "value": 150 },
    { "name": "Science", "value": 80 },
    { "name": "History", "value": 60 },
    { "name": "Biography", "value": 90 },
    { "name": "Fantasy", "value": 110 }
  ];

  pieChartData = [
    { "name": "Fiction", "value": 120 },
    { "name": "Non-fiction", "value": 150 },
    { "name": "Science", "value": 80 },
    { "name": "History", "value": 60 },
    { "name": "Biography", "value": 90 },
    { "name": "Fantasy", "value": 110 }
  ];

  lineChartData = [
    { 
      "name": "Borrow Rate",
      "series": [
        { "name": "Fiction", "value": 10 },
        { "name": "Non-fiction", "value": 15 },
        { "name": "Science", "value": 8 },
        { "name": "History", "value": 6 },
        { "name": "Biography", "value": 9 },
        { "name": "Fantasy", "value": 11 }
      ]
    }
  ];

  doughnutChartData = [
    { "name": "Fiction", "value": 5 },
    { "name": "Non-fiction", "value": 7 },
    { "name": "Science", "value": 4 },
    { "name": "History", "value": 3 },
    { "name": "Biography", "value": 4 },
    { "name": "Fantasy", "value": 6 }
  ];
  markdownContent: string
  loadingIndicator=false
  invoices: Invoice[] = [];

  constructor(
    private invoiceService: HTTPService,
    private modalService: NgbModal,
    private http:HttpClient
  ) {}

  ngOnInit(): void {
    this.loadInvoices();
    this.fetchMarkdownFile()
  }

  loadInvoices(): void {
    this.loadingIndicator=true
    this.invoiceService.getAllInvoices().subscribe(data => {
      this.invoices = data;
      this.loadingIndicator=false
    });
  }

  openAddDialog(): void {
    const modalRef = this.modalService.open(InvoiceModalComponent);
    modalRef.componentInstance.invoice = {} as Invoice;

    modalRef.result.then(result => {
      if (result) {
        this.invoiceService.createInvoice(result).subscribe(() => {
          this.loadInvoices();
        });
      }
    }).catch(() => {});
  }

  openEditDialog(invoice: Invoice): void {
    const modalRef = this.modalService.open(InvoiceModalComponent);
    modalRef.componentInstance.invoice = { ...invoice };

    modalRef.result.then(result => {
      if (result) {
        this.invoiceService.updateInvoice(result.id, result).subscribe(() => {
          this.loadInvoices();
        });
      }
    }).catch(() => {});
  }

  deleteInvoice(id: number): void {
    this.invoiceService.deleteInvoice(id).subscribe(() => {
      this.loadInvoices();
    });
  }

  download(){}

  pay(invoice: Invoice): void {
    const modalRef = this.modalService.open(PaymentModalComponent, { size: 'lg' });
    modalRef.componentInstance.invoice = invoice;
    modalRef.result.then(() => {
      // Payment recorded — trigger change detection so badges refresh
      this.invoices = [...this.invoices];
    }).catch(() => { /* dismissed */ });
  }

  paymentStatus(invoice: Invoice): { label: string; cssClass: string; paidAmount: number } {
    return getInvoicePaymentStatus(invoice.id!, invoice.totalAmount);
  }

  fetchMarkdownFile(): void {
  this.http.get('assets/documentation/modules/invoice.html', { responseType: 'text' })
    .subscribe(data => {
      this.markdownContent = data;
    });
}

}
