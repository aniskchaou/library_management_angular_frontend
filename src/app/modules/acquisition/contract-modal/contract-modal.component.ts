import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Contract } from 'src/app/main/models/Contract';
import { Vendor } from 'src/app/main/models/Vendor';
import { HTTPService } from 'src/app/main/services/HTTPService';
import { UploadDocumentComponent } from '../upload-document/upload-document.component';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-contract-modal',
    templateUrl: './contract-modal.component.html',
    styleUrls: ['./contract-modal.component.css'],
    standalone: false
})
export class ContractModalComponent implements OnInit {

  
  @Input() contract: Contract;
  vendors: Vendor[] = [];

  constructor(
    public activeModal: NgbActiveModal,
    private contractService: HTTPService,
    private vendorService: HTTPService,
    private modalService: NgbModal,
    private toastr:ToastrService
  ) {}

  ngOnInit(): void {
    this.loadVendors();
  }

  loadVendors(): void {
    this.vendorService.getAllVendors().subscribe(data => {
      this.vendors = data;
    });
  }

  onSaveClick(): void {
      if(this.validateContractForm(this.contract)){
        this.contractService.createContract(this.contract).subscribe((newContract) => {
          this.activeModal.close(newContract);
          this.toastr.success('Item added successfully!', 'Success');
        });
      }
      
   
  }

  onCancelClick(): void {
    this.activeModal.dismiss();
  }

  validateContractForm(contract: Contract): boolean {
    const errors: Record<string, string> = {};

    // Validate Contract Number
    if (!contract.contractNumber || contract.contractNumber.trim().length < 3) {
        errors.contractNumber = 'Contract Number is required and must be at least 3 characters long.';
    }

    // Validate Start Date
    if (!contract.startDate) {
        errors.startDate = 'Start Date is required and must be a valid date.';
    }

    // Validate End Date
    if (!contract.endDate) {
        errors.endDate = 'End Date is required and must be a valid date.';
    } else if (new Date(contract.startDate) > new Date(contract.endDate)) {
        errors.endDate = 'End Date must be after the Start Date.';
    }

    // Validate Vendor
    if (!contract.vendor || !contract.vendor.name) {
        errors.vendor = 'Vendor selection is required.';
    }

    // Validate Terms (Optional but must be meaningful if provided)
    if (contract.terms && contract.terms.trim().length < 5) {
        errors.terms = 'Terms must be at least 5 characters long if provided.';
    }

    // Display errors using Toastr or console
    Object.entries(errors).forEach(([field, message]) => {
        console.error(`${field}: ${message}`);
        this.toastr.error(message, 'Validation Error');
    });

    // Return true if no errors, false otherwise
    return Object.keys(errors).length === 0;
}




 
}
