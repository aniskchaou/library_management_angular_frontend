import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Contract } from 'src/app/main/models/Contract';
import { Vendor } from 'src/app/main/models/Vendor';
import { HTTPService } from 'src/app/main/services/HTTPService';
import { UploadDocumentComponent } from '../upload-document/upload-document.component';

@Component({
  selector: 'app-contract-modal',
  templateUrl: './contract-modal.component.html',
  styleUrls: ['./contract-modal.component.css']
})
export class ContractModalComponent implements OnInit {

  
  @Input() contract: Contract;
  vendors: Vendor[] = [];

  constructor(
    public activeModal: NgbActiveModal,
    private contractService: HTTPService,
    private vendorService: HTTPService,
    private modalService: NgbModal
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
   
      this.contractService.createContract(this.contract).subscribe((newContract) => {
        this.activeModal.close(newContract);
      });
   
  }

  onCancelClick(): void {
    this.activeModal.dismiss();
  }


 
}
