import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HTTPService } from 'src/app/main/services/HTTPService';
import CONFIG from 'src/app/main/urls/urls';

@Component({
    selector: 'app-barcode-view',
    templateUrl: './barcode-view.component.html',
    styleUrls: ['./barcode-view.component.css'],
    standalone: false
})
export class BarcodeViewComponent implements OnInit {

  @Input() barCode:any
  loadingImage: boolean;
  retrieveResonse: any;
  base64Data: any;
  retrievedImage:any;

  constructor(private httpService:HTTPService,private activeModal: NgbActiveModal) { 
    
    //
  }

  ngOnInit(): void {
    //this.getImage(this.qrCode?.isbn)
    this.retrievedImage=CONFIG.URL_BASE+'/barcode/get/' + this.barCode?.isbn+'.png';
  }
  closeModal(){
     this.activeModal.close()
  }

}
