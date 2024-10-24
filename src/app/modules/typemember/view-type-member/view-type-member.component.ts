import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view-type-member',
  templateUrl: './view-type-member.component.html',
  styleUrls: ['./view-type-member.component.css']
})
export class ViewTypeMemberComponent implements OnInit {

  @Input()
  selectedMember
  
  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  
closeModal(): void {
    this.activeModal.dismiss(); // Close the modal using NgbActiveModal
  }

}
