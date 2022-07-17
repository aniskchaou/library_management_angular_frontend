import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { URLLoader } from 'src/app/main/configs/URLLoader';
import { HTTPService } from 'src/app/main/services/HTTPService';
import CONFIG from 'src/app/main/urls/urls';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
})
export class BookListComponent extends URLLoader implements OnInit {
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

  constructor(private httpService: HTTPService, private router: Router) {
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

  destroyBook(id) {
    this.destroyEvent.emit(id);
    //this.httpService.getAll(CONFIG.URL_BASE + '/book/destroybook/' + id);
  }

  archiveBook(id) {
    this.archiveEvent.emit(id);
  }
}
