import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { URLLoader } from 'src/app/main/configs/URLLoader';
import { EditCirculationStatusComponent } from '../edit-circulation-status/edit-circulation-status.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-circulation-status-list',
  templateUrl: './circulation-status-list.component.html',
  styleUrls: ['./circulation-status-list.component.css'],
})
export class CirculationStatusListComponent
  extends URLLoader
  implements OnInit
{
  @Input() circulationStatus;
  @Input() circulationStatusI18n;
  @Output() idEvent = new EventEmitter<string>();

  temp = [];
  
  loadingIndicator = true;
  reorderable = true;

  columns = [
    //{ name: 'ID', prop: 'id', visible: true },
    { name: 'Name', prop: 'name', visible: true },
    { name: 'Actions', prop: 'actions', visible: true }
  ];

  constructor(private modalService: NgbModal) {
    super();
  }
  ngOnInit(): void {
    this.loadScripts();
  }

  edit(id) {
    //this.setId(id);
    //this.httpService.ID.next(id.toString());
    this.editCategory(id);
  }

  editCategory(value: string) {
    this.idEvent.emit(value);
  }

  openEditDialog(circulation): void {
    const modalRef = this.modalService.open(EditCirculationStatusComponent
      ,{size: 'xl',
      centered: true}
    );
    modalRef.componentInstance.model = { ...circulation }; // Ensure category is passed properly
  
    console.log(circulation); // Ensure category is not undefined here

    modalRef.result.then(result => {
      console.log(result)
       //this.getAll()
      
    }).catch(error => console.log(error));
  }
}
