import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { BarCode } from 'src/app/main/models/BarCode';
import { HTTPService } from 'src/app/main/services/HTTPService';

@Component({
  selector: 'app-bar-code-modal',
  templateUrl: './bar-code-modal.component.html',
  styleUrls: ['./bar-code-modal.component.css']
})
export class BarCodeModalComponent implements OnInit {

  @Input() barCode: BarCode;

  constructor(
    private toastr: ToastrService,
    public activeModal: NgbActiveModal,
    private barCodeService: HTTPService
  ) {}

  ngOnInit(): void {
    console.log(this.barCode);
  }

  onSaveClick(): void {
    if(this.validateFormData(this.barCode)){
      if (this.barCode.id) {
        this.barCodeService.updateBarCode(this.barCode.id, this.barCode).subscribe(() => {
          this.activeModal.close(this.barCode);
        });
      } else {
        
        this.barCodeService.createBarCode(this.barCode).subscribe((newBarCode) => {
          this.activeModal.close(newBarCode);
          this.toastr.success('Item added successfully!', 'Success');
        });
      }
      
    }
   
  }

  validateFormData(data: any): boolean {
    if (!data.isbn || !/^\d{3}-\d{1,5}-\d{1,7}-\d{1,7}-\d{1}$/.test(data.isbn)) {
      this.toastr.error('Invalid ISBN format. Example: 978-3-16-148410-0');
      return false;
    }
  
    if (!data.type || !['QR Code', 'Code128', 'Code39', 'EAN13', 'UPC'].includes(data.type)) {
      this.toastr.error('Invalid type. Please select a valid bar code type.');
      return false;
    }
  
    if (!data.width || data.width <= 0) {
      this.toastr.error('Width must be a positive number.');
      return false;
    }
  
    if (!data.height || data.height <= 0) {
      this.toastr.error('Height must be a positive number.');
      return false;
    }
  
    if (!data.displayValue && typeof data.displayValue !== 'boolean') {
      this.toastr.error('Invalid display value. Please check the display value field.');
      return false;
    }
  
    if (!data.font || !['Arial', 'Verdana', 'Times New Roman', 'Courier New'].includes(data.font)) {
      this.toastr.error('Invalid font. Please select a valid font.');
      return false;
    }
  
    if (!data.color || !['Black', 'Red', 'Blue', 'Green'].includes(data.color)) {
      this.toastr.error('Invalid color. Please select a valid color.');
      return false;
    }
  
    if (!data.margin || data.margin < 0) {
      this.toastr.error('Margin must be a non-negative number.');
      return false;
    }
  
    if (!data.rotation || data.rotation < 0 || data.rotation >= 360) {
      this.toastr.error('Rotation must be a number between 0 and 359.');
      return false;
    }
  
    return true;
  }
  

  onCancelClick(): void {
    this.activeModal.dismiss();
  }

}
