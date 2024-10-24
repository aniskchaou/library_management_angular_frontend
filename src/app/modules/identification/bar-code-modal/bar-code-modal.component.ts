import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
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
    public activeModal: NgbActiveModal,
    private barCodeService: HTTPService
  ) {}

  ngOnInit(): void {
    console.log(this.barCode);
  }

  onSaveClick(): void {
    if (this.barCode.id) {
      this.barCodeService.updateBarCode(this.barCode.id, this.barCode).subscribe(() => {
        this.activeModal.close(this.barCode);
      });
    } else {
      this.barCodeService.createBarCode(this.barCode).subscribe((newBarCode) => {
        this.activeModal.close(newBarCode);
      });
    }
  }

  onCancelClick(): void {
    this.activeModal.dismiss();
  }

}
