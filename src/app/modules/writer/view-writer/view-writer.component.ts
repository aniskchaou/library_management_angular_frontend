import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Writer from 'src/app/main/models/Writer';
import { EditWriterComponent } from '../edit-writer/edit-writer.component';
import { HTTPService } from 'src/app/main/services/HTTPService';
import CONFIG from 'src/app/main/urls/urls';
import { DataService } from 'src/app/main/services/data.service';

@Component({
    selector: 'app-view-writer',
    templateUrl: './view-writer.component.html',
    styleUrls: ['./view-writer.component.css'],
    standalone: false
})
export class ViewWriterComponent implements OnInit {
  @Input() writer

  constructor(private activeModal: NgbActiveModal,private modalService: NgbModal,
    private httpService:HTTPService,private dataService:DataService) { }

  ngOnInit(): void {
  }

  closeModal(): void {
    this.activeModal.dismiss(); // Close the modal using NgbActiveModal
  }

  editRow(writer){

  }

  deleteRow(writer){
    this.delete(writer)
  }

  openEditDialog(writer): void {
    const modalRef = this.modalService.open(EditWriterComponent, { size: 'xl', centered: true });
    modalRef.componentInstance.author = { ...writer };
    this.closeModal();

    modalRef.result.then(result => {
    }).catch(() => {});
  }

  delete(writer) {
    var r = confirm('Voulez-vous supprimer cet enregistrement ?');
    if (r) {
      this.httpService.remove(CONFIG.URL_BASE + '/writer/delete/' + writer.id).finally(()=>{
        this.closeModal()
        this.dataService.triggerRefresh()
      });
      
     // this.reloadPage();
    }

  }

}
