import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { DataTables } from 'src/app/main/configs/DataTables';
import { URLLoader } from 'src/app/main/configs/URLLoader';
import CatalogItem from 'src/app/main/models/Book';
import { HTTPService } from 'src/app/main/services/HTTPService';
import CONFIG from 'src/app/main/urls/urls';
import { ViewBookComponent } from '../view-book/view-book.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CheckInComponent } from '../../circulations/check-in/check-in.component';
import { CheckOutComponent } from '../../circulations/check-out/check-out.component';
import { HoldComponent } from '../../circulations/hold/hold.component';
import { BarCodeModalComponent } from '../../identification/bar-code-modal/bar-code-modal.component';
import { QrCodeModalComponent } from '../../identification/qr-code-modal/qr-code-modal.component';
import { EditBookComponent } from '../edit-book/edit-book.component';
import { AddBookComponent } from '../add-book/add-book.component';
import { UploadBookCoverComponent } from '../upload-book-cover/upload-book-cover.component';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
})
export class BookListComponent extends URLLoader implements OnInit, AfterViewInit {
  @Input() books;
  @Output() idEvent = new EventEmitter<string>();
  @Output() deleteEvent = new EventEmitter<string>();
  @Input() bookI18n;
  @Output() viewEvent = new EventEmitter<string>();
  @Output() destroyEvent = new EventEmitter<string>();
  @Output() archiveEvent = new EventEmitter<string>();
  selectedFile: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  imageName: any;

  temp = [];
  
  loadingIndicator = true;
  reorderable = true;

  columns = [
    { name: 'Title', prop: 'title', visible: true },
    { name: 'ISBN', prop: 'isbn', visible: true },
    { name: 'Writer', prop: 'writer', visible: true },
    { name: 'Publisher', prop: 'publisher', visible: true },
    { name: 'Edition', prop: 'edition', visible: true },
    { name: 'Price', prop: 'price', visible: true },
    { name: 'Category', prop: 'category', visible: true },
    { name: 'Actions', prop: 'actions', visible: true }
  ];

  constructor(private httpService: HTTPService, private router: Router,private modalService: NgbModal) {
    super();
  }
  ngAfterViewInit(): void {
    //super.enableDataTable()
    this.initDataTable('dt_book')
  }
  ngOnInit(): void {
    this.loadScripts();
  }

  edit(id) {
    this.editCategory(id);
  }

  editCategory(value: string) {
    this.idEvent.emit(value);
  }

  delete(id) {
    this.deleteCategory(id);
  }

  view(value: string) {
    this.viewEvent.emit(value);
  }

  handleAction(event)
  {

  }

  deleteCategory(id) {
    this.deleteEvent.emit(id);
  }

  getImage(image) {
    this.httpService
      .getAll('http://localhost:8080/book/get/' + image)
      .subscribe((res) => {
        this.retrieveResonse = res;
        this.base64Data = this.retrieveResonse.picByte;
        this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
      });
    return this.retrievedImage;
  }

  openViewDialog(catalog: CatalogItem): void {
    const modalRef = this.modalService.open(ViewBookComponent,{size: 'xl', // Set the modal size to extra-large
      centered: true,}); // Open the CategoryViewComponent in modal
    modalRef.componentInstance.book = { ...catalog }; // Pass category data

    console.log(catalog); // Ensure category is passed properly and logged

    modalRef.result.then(result => {
      console.log(result); // Handle any result (if needed)
    }).catch(error => console.log(error)); // Handle any errors
  }


  destroyBook(id) {
    this.destroyEvent.emit(id);
    //this.httpService.getAll(CONFIG.URL_BASE + '/book/destroybook/' + id);
  }

  archiveBook(id) {
    this.archiveEvent.emit(id);
  }

  openCheckinDialog(row): void {
    const modalRef = this.modalService.open(CheckInComponent);
    modalRef.componentInstance.department = {} ;

    modalRef.result.then(result => {
      if (result) {
       /*  this.departmentService.createDepartment(result).subscribe(() => {
          this.loadDepartments();
        }); */
      }
    }).catch(error => console.log(error));
  }

  openCheckoutDialog(row): void {
    const modalRef = this.modalService.open(CheckOutComponent);
    modalRef.componentInstance.department = {} ;

    modalRef.result.then(result => {
      if (result) {
      /*   this.departmentService.createDepartment(result).subscribe(() => {
          this.loadDepartments();
        }); */
      }
    }).catch(error => console.log(error));
  }

  openOnHoldDialog(row): void {
    const modalRef = this.modalService.open(HoldComponent);
    modalRef.componentInstance.department = {} ;

    modalRef.result.then(result => {
      if (result) {
      /*   this.departmentService.createDepartment(result).subscribe(() => {
          this.loadDepartments();
        }); */
      }
    }).catch(error => console.log(error));
  }

  duplicate(book){}


  openQRCodeViewDialog(row): void {
    const modalRef = this.modalService.open(QrCodeModalComponent);
    modalRef.componentInstance.qrCode = {} ;

    modalRef.result.then(result => {
      if (result) {
      /*   this.departmentService.createDepartment(result).subscribe(() => {
          this.loadDepartments();
        }); */
      }
    }).catch(error => console.log(error));
  }


  openBarCodeViewDialog(row): void {
    const modalRef = this.modalService.open(BarCodeModalComponent);
    modalRef.componentInstance.barCode = {} ;

    modalRef.result.then(result => {
      if (result) {
      /*   this.departmentService.createDepartment(result).subscribe(() => {
          this.loadDepartments();
        }); */
      }
    }).catch(error => console.log(error));
  }

  openEditDialog(row): void {
    const modalRef = this.modalService.open(AddBookComponent);
    modalRef.componentInstance.catalogItem = row ;

    modalRef.result.then(result => {
      if (result) {
      /*   this.departmentService.createDepartment(result).subscribe(() => {
          this.loadDepartments();
        }); */
      }
    }).catch(error => console.log(error));
  }



  openChangeCoverDialog(row): void {
    const modalRef = this.modalService.open(UploadBookCoverComponent);
    modalRef.componentInstance.book = row;

    modalRef.result.then(result => {
      if (result) {
       
      }
    }).catch(error => console.log(error));
  }
}
