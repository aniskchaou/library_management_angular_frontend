import { Component, Input, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from 'src/app/main/services/data.service';
import { HTTPService } from 'src/app/main/services/HTTPService';
import CONFIG from 'src/app/main/urls/urls';

@Component({
    selector: 'app-view-item-types',
    templateUrl: './view-item-types.component.html',
    styleUrls: ['./view-item-types.component.css'],
    standalone: false
})
export class ViewItemTypesComponent implements OnInit {

  @Input()
  selectedItem
  constructor(private activeModal:NgbActiveModal,private httpService:HTTPService,private dataService:DataService) { }

  ngOnInit(): void {
  }

  closeModal(){
    this.activeModal.dismiss();
  }

  onEdit(selectedItem) {
    // Implement your edit logic here
  }
  
  onDelete(item) {
    this.delete(item.id)
  }
  delete(id) {
    var r = confirm('Do you want to delete this recording ?');
    if (r) {
      this.httpService.remove(CONFIG.URL_BASE + '/mediatype/delete/' + id).finally(()=>{
        this.dataService.triggerRefresh()
        this.closeModal()
      });
      /* super.show(
        'Confirmation',
        this.messageService.confirmationMessages.delete,
        'success'
      );
      this.reloadPage(); */
      
    }
  }
  

}
