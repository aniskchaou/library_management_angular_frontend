import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
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

/*   closeModal(data){
    this.activeModal.dismiss(data);
  } */


  closeModal(){

  }

  onSubmit(): void {
    this.submitted = true;

    /* if (this.mediaTypeForm.invalid) {
      return;
    } */

    // Perform the HTTP request to save the form data
    this.httpClient.create(CONFIG.URL_BASE +'/mediatype/create', this.mediaTypeForm.value).finally(()=>{

      this.dataService.triggerRefresh()
      this.activeModal.dismiss(this.mediaTypeForm.value);
    //this.closeModal()
    })
    

  }

  onCancel(): void {
    this.router.navigate(['/media-type']);
  }



}
