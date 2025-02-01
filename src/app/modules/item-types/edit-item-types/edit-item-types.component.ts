import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { HTTPService } from 'src/app/main/services/HTTPService';
import CONFIG from 'src/app/main/urls/urls';

@Component({
  selector: 'app-edit-item-types',
  templateUrl: './edit-item-types.component.html',
  styleUrls: ['./edit-item-types.component.css']
})
export class EditItemTypesComponent implements OnInit {

  @Input() mediaType
  
  constructor(private toastr: ToastrService,public activeModal: NgbActiveModal, private mediaTypeService: HTTPService) {}

  ngOnInit(): void {
    // Optionally handle any initialization logic here
  }

  onSaveClick(): void {
    this.activeModal.close(this.mediaType);
  }

  onCancelClick(): void {
    this.activeModal.dismiss();
  }

  saveMediaType(): void {
  
      this.mediaTypeService.create(CONFIG.URL_BASE+'/mediatype/create',this.mediaType).then(() => {
        this.activeModal.close(this.mediaType);
        this.toastr.success('Item edited successfully!', 'Success');
      });
    
  }

}
