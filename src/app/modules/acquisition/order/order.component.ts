import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/main/models/Order';
import { OrderModalComponent } from '../order-modal/order-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HTTPService } from 'src/app/main/services/HTTPService';
import { ToastrService } from 'ngx-toastr';
import CONFIG from 'src/app/main/urls/urls';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.css'],
    standalone: false
})
export class OrderComponent implements OnInit {

  orders: Order[] = [];
  loadingIndicator = true;

  constructor(
    private orderService: HTTPService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private httpService:HTTPService
  ) {}

  columns = [
    { name: 'Order Number', prop: 'orderNumber', visible: true },
    { name: 'Order Date', prop: 'orderDate', visible: true },
    { name: 'Vendor', prop: 'vendor', visible: true },
    { name: 'Total Cost', prop: 'totalCost', visible: true },
    { name: 'Status', prop: 'status', visible: true },
    // { name: 'Notes', prop: 'notes', visible: true },
    //{ name: 'Contract', prop: 'contract', visible: true },
    //{ name: 'Invoice', prop: 'invoice', visible: true },
    { name: 'Actions', prop: 'actions', visible: true }
  ];

  loading=false

  toggleColumn(columnName: string): void {
    const column = this.columns.find(col => col.prop === columnName || col.name === columnName);
    if (column) {
      column.visible = !column.visible;
    }
  }

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.loadingIndicator = true;
    this.orderService.getAllOrders().subscribe({
      next: (data) => {
        this.orders = data;
        this.loadingIndicator = false;
      },
      error: (err) => {
        console.error('Failed to load orders', err);
        this.loadingIndicator = false;
      }
    });
  }

  openAddDialog(): void {
    const modalRef = this.modalService.open(OrderModalComponent);
    modalRef.componentInstance.order = {} as Order;

    modalRef.result.then(result => {
        this.loadOrders()
      
    }).catch(() => {});
  }

  openEditDialog(order: Order): void {
    const modalRef = this.modalService.open(OrderModalComponent);
    modalRef.componentInstance.order = { ...order };

    modalRef.result.then(result => {
      if (result) {
        this.orderService.updateOrder(result.id, result).subscribe({
          next: () => this.loadOrders(),
          error: (err) => console.error('Failed to update order', err)
        });
      }
    }).catch(() => {});
  }

  deleteOrder(id: number): void {
    this.orderService.deleteOrder(id).subscribe({
      next: () => this.loadOrders(),
      error: (err) => console.error('Failed to delete order', err)
    });
  }

  updateOrderStatus(id: number, status: string) {
    let url = '';
    let successMessage = '';
  
    switch (status) {
      case 'Shipped':
        url = CONFIG.URL_BASE + '/order/' + id + '/status/ship';
        successMessage = 'Order marked as Shipped';
        break;
  
      case 'Cancelled':
        url = CONFIG.URL_BASE + '/order/' + id + '/status/cancel';
        successMessage = 'Order marked as Cancelled';
        break;
  
      case 'Delivered':
        url = CONFIG.URL_BASE + '/order/' + id + '/status/deliver';
        successMessage = 'Order marked as Delivered';
        break;
  
      case 'Pending':
        url = CONFIG.URL_BASE + '/order/' + id + '/status/pending';
        successMessage = 'Order marked as Pending';
        break;
  
      default:
        this.toastr.error('Invalid status');
        return;
    }
  
    this.httpService.getAll(url).subscribe(
      (data) => {
        this.toastr.success(successMessage);
      },
      (err: HttpErrorResponse) => {
        this.toastr.error('Failed to update order status');
      }
    );
  }
  

}