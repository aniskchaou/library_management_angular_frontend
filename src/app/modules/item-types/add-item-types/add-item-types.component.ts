import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/main/services/data.service';
import { HTTPService } from 'src/app/main/services/HTTPService';
import CONFIG from 'src/app/main/urls/urls';

@Component({
  selector: 'app-add-item-types',
  templateUrl: './add-item-types.component.html',
  styleUrls: ['./add-item-types.component.css']
})
export class AddItemTypesComponent implements OnInit {

  mediaTypeForm: FormGroup;
  submitted = false;

  constructor(
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private router: Router,
    private httpClient: HTTPService,
    private dataService:DataService,
    private activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {
    this.mediaTypeForm = this.formBuilder.group({
      imageUrl: ['', [Validators.required, Validators.maxLength(255)]],
      name: ['', [Validators.required, Validators.maxLength(100)]],
      code: ['', [Validators.required, Validators.maxLength(50)]],
      parentCode: ['', [Validators.maxLength(50)]],
      searchCategory: ['', [Validators.required]],
      notForLoan: [false, Validators.required],
      rentalCharge: ['', [Validators.required, Validators.min(0)]],
      dailyRentalCharge: ['', [Validators.required, Validators.min(0)]],
      hourlyRentalCharge: ['', [Validators.required, Validators.min(0)]],
      defaultReplacementCost: ['', [Validators.required, Validators.min(0)]],
      processingFee: ['', [Validators.required, Validators.min(0)]],
      checkinMessage: ['', Validators.maxLength(255)],
      libraryLimitations: ['', Validators.maxLength(255)],
    });
  }

  // Get form controls for validation
  get f() {
    return this.mediaTypeForm.controls;
  }

   closeModal(){
    this.activeModal.dismiss();
  } 



  onSubmit(): void {
    this.submitted = true;

    /* if (this.mediaTypeForm.invalid) {
      return;
    } */
    if(this.validateMediaTypeForm(this.mediaTypeForm.value,true)){
      this.httpClient.create(CONFIG.URL_BASE +'/mediatype/create', this.mediaTypeForm.value).finally(()=>{

      this.dataService.triggerRefresh()
      this.toastr.success('Item added successfully!', 'Success');
      this.activeModal.dismiss(this.mediaTypeForm.value);
    //this.closeModal()
    })
    }
    // Perform the HTTP request to save the form data
    
    

  }

  onCancel(): void {
    this.router.navigate(['/media-type']);
  }



  errors: any;

validateMediaTypeForm(form: any, submitted: boolean): boolean {
  this.errors = {};

  // Validate Name
  if (!form.name || form.name.trim().length < 2) {
    this.errors.name = 'Name is required and must be at least 2 characters long.';
    this.toastr.error(this.errors.name, 'Validation Error');
  }

  // Validate Code
  if (!form.code || form.code.trim().length < 3) {
    this.errors.code = 'Code is required and must be at least 3 characters long.';
    this.toastr.error(this.errors.code, 'Validation Error');
  }

  // Validate Parent Code (optional but validate if provided)
  if (form.parentCode && form.parentCode.trim().length < 3) {
    this.errors.parentCode = 'Parent code must be at least 3 characters long if provided.';
    this.toastr.error(this.errors.parentCode, 'Validation Error');
  }

  // Validate Rental Charges (all must be numbers and positive)
  if (form.rentalCharge !== undefined && (form.rentalCharge <= 0 || isNaN(form.rentalCharge))) {
    this.errors.rentalCharge = 'Rental charge must be a positive number.';
    this.toastr.error(this.errors.rentalCharge, 'Validation Error');
  }

  // Validate Daily Rental Charge
  if (form.dailyRentalCharge !== undefined && (form.dailyRentalCharge <= 0 || isNaN(form.dailyRentalCharge))) {
    this.errors.dailyRentalCharge = 'Daily rental charge must be a positive number.';
    this.toastr.error(this.errors.dailyRentalCharge, 'Validation Error');
  }

  // Validate Hourly Rental Charge
  if (form.hourlyRentalCharge !== undefined && (form.hourlyRentalCharge <= 0 || isNaN(form.hourlyRentalCharge))) {
    this.errors.hourlyRentalCharge = 'Hourly rental charge must be a positive number.';
    this.toastr.error(this.errors.hourlyRentalCharge, 'Validation Error');
  }

  // Validate Default Replacement Cost
  if (form.defaultReplacementCost !== undefined && (form.defaultReplacementCost <= 0 || isNaN(form.defaultReplacementCost))) {
    this.errors.defaultReplacementCost = 'Replacement cost must be a positive number.';
    this.toastr.error(this.errors.defaultReplacementCost, 'Validation Error');
  }

  // Validate Processing Fee
  if (form.processingFee !== undefined && (form.processingFee <= 0 || isNaN(form.processingFee))) {
    this.errors.processingFee = 'Processing fee must be a positive number.';
    this.toastr.error(this.errors.processingFee, 'Validation Error');
  }

  // Validate Checkin Message
  if (!form.checkinMessage || form.checkinMessage.trim().length < 2) {
    this.errors.checkinMessage = 'Check-in message is required and must be at least 2 characters long.';
    this.toastr.error(this.errors.checkinMessage, 'Validation Error');
  }

  // Validate Library Limitations
  if (!form.libraryLimitations || form.libraryLimitations.trim().length < 2) {
    this.errors.libraryLimitations = 'Library limitations are required and must be at least 2 characters long.';
    this.toastr.error(this.errors.libraryLimitations, 'Validation Error');
  }

  // Validate Not for Loan (checkbox: must be checked if relevant)
  // (Checkbox validation is optional, as it just needs to be checked/unchecked)
  
  // All validations complete; return whether the form is valid
  return Object.keys(this.errors).length === 0;
}

}
