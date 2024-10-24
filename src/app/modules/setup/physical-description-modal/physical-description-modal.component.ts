import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PhysicalDescription } from 'src/app/main/models/PhysicalDescription';
import { HTTPService } from 'src/app/main/services/HTTPService';

@Component({
  selector: 'app-physical-description-modal',
  templateUrl: './physical-description-modal.component.html',
  styleUrls: ['./physical-description-modal.component.css']
})
export class PhysicalDescriptionModalComponent implements OnInit {

  @Input() description: PhysicalDescription;

  constructor(
    public activeModal: NgbActiveModal,
    private descriptionService: HTTPService
  ) {}

  ngOnInit(): void {
    console.log(this.description);
  }

  onSaveClick(): void {

      this.descriptionService.createPhysicalDescription(this.description).subscribe((newDescription) => {
        this.activeModal.close(newDescription);
      });
  }

  onCancelClick(): void {
    this.activeModal.dismiss();
  }

}
