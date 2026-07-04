import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { URLLoader } from 'src/app/main/configs/URLLoader';
import Publisher from 'src/app/main/models/Publisher';
import { ViewPublisherComponent } from '../view-publisher/view-publisher.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditPublisherComponent } from '../edit-publisher/edit-publisher.component';

@Component({
    selector: 'app-publisher-list',
    templateUrl: './publisher-list.component.html',
    styleUrls: ['./publisher-list.component.css'],
    standalone: false
})
export class PublisherListComponent extends URLLoader implements OnInit,AfterViewInit {
  @Input() publishers;
  @Input() publisherI18n;
  @Output() editEvent = new EventEmitter<string>();
  @Output() deleteEvent = new EventEmitter<string>();

  columns = [
   // { name: 'ID', prop: 'id', visible: true },
    { name: 'Publisher Name', prop: 'name', visible: true },
    { name: 'Address', prop: 'address', visible: true },
    { name: 'Email', prop: 'email', visible: true },
    { name: 'Phone', prop: 'phone', visible: true },
    { name: 'Country', prop: 'country', visible: true },
    { name: 'Website', prop: 'website', visible: true },
    { name: 'Actions', prop: 'actions', visible: true }
  ];
  

  loading: boolean = true;
  reorderable: boolean = true;
  

  constructor(private modalService: NgbModal) {
    super();
  }
  ngAfterViewInit(): void {
    super.enableDataTable()
  }

  ngOnInit(): void {
    this.loadScripts();
  }

  edit(id) {
    this.editCategory(id);
  }

  delete(id) {
    this.deleteEvent.emit(id);
  }

  editCategory(value: string) {
    this.editEvent.emit(value);
  }

  editRow(row: Publisher): void {
    // Add edit logic here
  }

  deleteRow(row: Publisher): void {
    this.publishers = this.publishers.filter(r => r !== row);
    // Add delete logic here
  }

  onSelect(selected) {
  }

  onActivate(event) {
  }

  openViewDialog(item): void {
    const modalRef = this.modalService.open(ViewPublisherComponent,{size: 'xl', // Set the modal size to extra-large
      centered: true,});
    modalRef.componentInstance.selectedPublisher = item; // Ensure category is passed properly
  
    //

    modalRef.result.then(result => {
       //this.fetchItemList()
      
    }).catch(() => {});
  }

  openEditDialog(row): void {
    const modalRef = this.modalService.open(EditPublisherComponent, { size: 'xl', centered: true });
    modalRef.componentInstance.publisher = { ...row };

    modalRef.result.then(result => {
      if (result) {
      
      }
    }).catch(() => {});
  }

}
