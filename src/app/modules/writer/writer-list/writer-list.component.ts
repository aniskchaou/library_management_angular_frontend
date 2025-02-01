import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { URLLoader } from 'src/app/main/configs/URLLoader';
import Writer from 'src/app/main/models/Writer';
import { HTTPService } from 'src/app/main/services/HTTPService';
import CONFIG from 'src/app/main/urls/urls';
import { ViewWriterComponent } from '../view-writer/view-writer.component';
import { DataService } from 'src/app/main/services/data.service';
import { EditWriterComponent } from '../edit-writer/edit-writer.component';

@Component({
  selector: 'app-writer-list',
  templateUrl: './writer-list.component.html',
  styleUrls: ['./writer-list.component.css'],
})
export class WriterListComponent extends URLLoader implements OnInit,AfterViewInit {
  @Input() writers;
  @Input() writerI18n;
  @Output() idEvent = new EventEmitter<string>();
  constructor(private http:HTTPService, private modalService: NgbModal,private dataService:DataService) {
    super();
  }
  writer
  publications

  columns = [
   // { name: 'ID', prop: 'id', visible: true },
    { name: 'Name', prop: 'name', visible: true },
    { name: 'Note', prop: 'note', visible: true },
    { name: 'Date of Birth', prop: 'dob', visible: true },
    { name: 'Died', prop: 'died', visible: true },
    { name: 'Date of Death', prop: 'dod', visible: true },
    { name: 'Publications', prop: 'publications', visible: true },
    { name: 'Bio', prop: 'bio', visible: true },
    { name: 'Awards', prop: 'awards', visible: true },
    { name: 'refrences', prop: 'refrences', visible: true },
    { name: 'Actions', prop: 'actions', visible: true }
  ];
  

  loading = true;
  reorderable = true;

  onActivate(event): void {
    console.log('Row activated:', event);
    if (event.type === 'click') {
      const writer = event.row;
      // Open the edit dialog or perform another action
      console.log('Row clicked:', writer);
    }
  }

  // Event triggered when a row is selected
  onSelect(event): void {
    console.log('Row selected:', event);
    const selectedWriter = event.selected;
    // Perform actions with the selected row
    console.log('Selected writer:', selectedWriter);
  }

  editRow(writer: Writer): void {
    console.log('Editing writer:', writer);
    // Logic to edit writer
  }

  deleteRow(writer: Writer): void {
    console.log('Deleting writer:', writer);
    // Logic to delete writer
  }

  ngAfterViewInit(): void {
    //super.enableDataTable()
  }
  ngOnInit(): void {
    this.loadScripts();
  }

  showPublications(id){
    this.http.get(CONFIG.URL_BASE+'/writer/'+id).subscribe(data=>this.writer=data)
  }

  edit(id) {
    //this.setId(id);
    //this.httpService.ID.next(id.toString());
    this.editCategory(id);
  }

  editCategory(value: string) {
    this.idEvent.emit(value);
  }

  openViewDialog(writer: Writer): void {
    const modalRef = this.modalService.open(ViewWriterComponent); // Open the CategoryViewComponent in modal
    modalRef.componentInstance.writer = { ...writer }; // Pass category data

    console.log(writer); // Ensure category is passed properly and logged

    modalRef.result.then(result => {
      console.log(result); // Handle any result (if needed)
      this.dataService.triggerRefresh()
    }).catch(error => console.log(error)); // Handle any errors
  }

  openEditDialog(writer): void {
    console.log(writer);
    const modalRef = this.modalService.open(EditWriterComponent); // Open the CategoryViewComponent in modal
    modalRef.componentInstance.author = { ...writer }; // Pass category data
   // this.closeModal()
    // Ensure category is passed properly and logged

    modalRef.result.then(result => {
      console.log(result); // Handle any result (if needed)
    }).catch(error => console.log(error)); // Handle any errors
  }

  delete(writer) {
    var r = confirm('Voulez-vous supprimer cet enregistrement ?');
    if (r) {
      this.http.remove(CONFIG.URL_BASE + '/writer/delete/' + writer.id).finally(()=>{
        //this.closeModal()
        this.dataService.triggerRefresh()
      });
      
     // this.reloadPage();
    }

  }

  getRandomColor(): string {
    // const letters = '0123456789ABCDEF';
    // let color = '#';
    // for (let i = 0; i < 6; i++) {
    //   color += letters[Math.floor(Math.random() * 16)];
    // }
    return 'grey';
  }

}
