import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-view-publisher',
    templateUrl: './view-publisher.component.html',
    styleUrls: ['./view-publisher.component.css'],
    standalone: false
})
export class ViewPublisherComponent implements OnInit {

  @Input()
  selectedPublisher
  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  
closeModal(): void {
    this.activeModal.dismiss(); // Close the modal using NgbActiveModal
  }

}
