import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { URLLoader } from 'src/app/main/configs/URLLoader';
import { HTTPService } from 'src/app/main/services/HTTPService';

@Component({
  selector: 'app-destroyed-books-list',
  templateUrl: './destroyed-books-list.component.html',
  styleUrls: ['./destroyed-books-list.component.css'],
})
export class DestroyedBooksListComponent extends URLLoader implements OnInit {
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

  constructor(private httpService: HTTPService) {
    super();
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
}
