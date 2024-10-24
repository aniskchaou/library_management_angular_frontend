import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { URLLoader } from 'src/app/main/configs/URLLoader';
import CatalogItem from 'src/app/main/models/Book';
import { HTTPService } from 'src/app/main/services/HTTPService';
import { ViewBookComponent } from '../view-book/view-book.component';

@Component({
  selector: 'app-destroyed-books-list',
  templateUrl: './destroyed-books-list.component.html',
  styleUrls: ['./destroyed-books-list.component.css'],
})
export class DestroyedBooksListComponent extends URLLoader implements OnInit,AfterViewInit {
  @Input() books;
  @Output() idEvent = new EventEmitter<string>();
  @Output() deleteEvent = new EventEmitter<string>();
  @Input() bookI18n;
  @Output() viewEvent = new EventEmitter<string>();
  selectedFile: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  imageName: any;

  loadingIndicator = true;
  reorderable = true;

  columns = [
    { name: 'Title', prop: 'title', visible: true },
    { name: 'ISBN', prop: 'isbn', visible: true },
    { name: 'Writer', prop: 'writer', visible: true },
    { name: 'Publisher', prop: 'publisher', visible: true },
    { name: 'Edition', prop: 'edition', visible: true },
    //{ name: 'Price', prop: 'price', visible: true },
    { name: 'Category', prop: 'category', visible: true },
    { name: 'Actions', prop: 'actions', visible: true }
  ];

  constructor(private httpService: HTTPService, private modalService: NgbModal) {
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

  editCategory(value: string) {
    this.idEvent.emit(value);
  }

  delete(id) {
    this.deleteCategory(id);
  }

  view(value: string) {
    this.viewEvent.emit(value);
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
}
