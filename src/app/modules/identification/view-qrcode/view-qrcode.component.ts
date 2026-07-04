import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { finalize } from 'rxjs/operators';
import { QRCode } from 'src/app/main/models/QRcode';
import { HTTPService } from 'src/app/main/services/HTTPService';
import CONFIG from 'src/app/main/urls/urls';

@Component({
    selector: 'app-view-qrcode',
    templateUrl: './view-qrcode.component.html',
    styleUrls: ['./view-qrcode.component.css'],
    standalone: false
})
export class ViewQrcodeComponent implements OnInit {

  @Input() qrCode:any
  loadingImage: boolean;
  retrieveResonse: any;
  base64Data: any;
  retrievedImage:any;

  constructor(private httpService:HTTPService,private activeModal: NgbActiveModal) { 
    
    //
  }

  ngOnInit(): void {
    //this.getImage(this.qrCode?.isbn)
    this.retrievedImage=CONFIG.URL_BASE+'/qrcode/get/' + this.qrCode?.isbn+'.png';
  }
  closeModal(){
    this.activeModal.close()
  }
/* 
   getImage(image) {
    this.loadingImage = true;
    if (image) {
      
      this.httpService
        .getAll(CONFIG.URL_BASE+'/qrcode/get/' + image+".png")
        .pipe(
          finalize(() => {
            this.loadingImage = false;
          })
        )
        .subscribe((res) => {
          this.retrieveResonse = res;
          this.base64Data = this.retrieveResonse.picByte;

          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
           this.retrievedImage=res
        });
    } 
  } */

}
