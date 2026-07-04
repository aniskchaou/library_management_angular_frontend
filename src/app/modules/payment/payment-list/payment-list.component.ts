import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { URLLoader } from 'src/app/main/configs/URLLoader';
import { HTTPService } from 'src/app/main/services/HTTPService';
import CONFIG from 'src/app/main/urls/urls';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-payment-list',
    templateUrl: './payment-list.component.html',
    styleUrls: ['./payment-list.component.css'],
    standalone: false
})
export class PaymentListComponent extends URLLoader implements OnInit {
  @Input() payments;
  @Input() paymentI18n;
  @Output() editEvent = new EventEmitter<string>();
  @Output() deleteEvent = new EventEmitter<string>();
  @Output() waiveEvent = new EventEmitter<any>();

  constructor(private httpService: HTTPService, private toastr: ToastrService) {
    super();
  }

  ngOnInit(): void {
    this.loadScripts();
  }

  edit(id) { this.editCategory(id); }
  delete(id) { this.deleteCategory(id); }
  editCategory(value: string) { this.editEvent.emit(value); }
  deleteCategory(value) { this.deleteEvent.emit(value); }

  waiveFine(payment: any): void {
    const reason = prompt('Enter waive reason (optional):') ?? 'Waived by librarian';
    if (reason === null) return; // cancelled
    this.httpService.create(CONFIG.URL_BASE + '/payment/waive', {
      memberId: payment.member?.id ?? payment.memberId,
      reason
    }).then(() => {
      this.toastr.success('Fine waived', 'Success');
      this.waiveEvent.emit(payment);
    }).catch(() => this.toastr.error('Could not waive fine', 'Error'));
  }

  openReceipt(paymentId: number): void {
    window.open(`${CONFIG.URL_BASE}/receipt/payment/${paymentId}`, '_blank');
  }
}
