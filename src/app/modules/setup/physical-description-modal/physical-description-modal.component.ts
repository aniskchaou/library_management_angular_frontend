import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
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
    private descriptionService: HTTPService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    console.log(this.description);
  }

  onSaveClick(): void {
      if(this.validateDescriptionForm())
      this.descriptionService.createPhysicalDescription(this.description).subscribe((newDescription) => {
        this.activeModal.close(newDescription);
        this.toastr.success('Item added successfully!', 'Success');
      });
  }

  onCancelClick(): void {
    this.activeModal.dismiss();
  }
  
  errors:any

  validateDescriptionForm() {
    this.errors = {};

    if (!this.description.height || this.description.height <= 0) {
      this.errors.height = 'Height is required and must be a positive number.';
      this.toastr.error(this.errors.height, 'Validation Error');
    }

    if (!this.description.width || this.description.width <= 0) {
      this.errors.width = 'Width is required and must be a positive number.';
      this.toastr.error(this.errors.width, 'Validation Error');
    }

    if (!this.description.thickness || this.description.thickness <= 0) {
      this.errors.thickness = 'Thickness is required and must be a positive number.';
      this.toastr.error(this.errors.thickness, 'Validation Error');
    }

    if (!this.description.weight || this.description.weight <= 0) {
      this.errors.weight = 'Weight is required and must be a positive number.';
      this.toastr.error(this.errors.weight, 'Validation Error');
    }

    if (!this.description.pageCount || this.description.pageCount <= 0) {
      this.errors.pageCount = 'Page Count is required and must be a positive number.';
      this.toastr.error(this.errors.pageCount, 'Validation Error');
    }

    if (!this.description.bindingType || this.description.bindingType.trim().length < 3) {
      this.errors.bindingType = 'Binding Type is required and must be at least 3 characters long.';
      this.toastr.error(this.errors.bindingType, 'Validation Error');
    }

    return Object.keys(this.errors).length === 0;
  }

  submitDescriptionForm() {
    if (this.validateDescriptionForm()) {
      console.log('Form is valid. Submitting:', this.description);
    } else {
      console.log('Form is invalid. Errors:', this.errors);
    }
  }
}



