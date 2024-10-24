import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Contract } from 'src/app/main/models/Contract';
import { HTTPService } from 'src/app/main/services/HTTPService';
import CONFIG from 'src/app/main/urls/urls';

@Component({
  selector: 'app-view-contract',
  templateUrl: './view-contract.component.html',
  styleUrls: ['./view-contract.component.css']
})
export class ViewContractComponent implements OnInit {
  
  contract:Contract
  files: Object;
  constructor(private httpService:HTTPService,private activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    this.httpService
    .getAll(CONFIG.URL_BASE + '/contract/files/'+this.contract.vendor.id)
    .subscribe(
      (data) => {
        this.files = data;
      },
      (err: HttpErrorResponse) => {}
    );
  }
  downloadFile(filename: string): void {
    const link = document.createElement('a');
    link.href = CONFIG.URL_BASE+`/contract/vendor-files/${this.contract.vendor.id}/${filename}`
    link.target = '_blank';
    link.click();
}


closeModal(): void {
    this.activeModal.dismiss(); // Close the modal using NgbActiveModal
  }

}
