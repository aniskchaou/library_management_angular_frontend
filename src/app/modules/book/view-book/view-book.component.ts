import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { URLLoader } from 'src/app/main/configs/URLLoader';
import { HTTPService } from 'src/app/main/services/HTTPService';
import CONFIG from 'src/app/main/urls/urls';
import { finalize } from 'rxjs/operators';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-view-book',
  templateUrl: './view-book.component.html',
  styleUrls: ['./view-book.component.css'],
})
export class ViewBookComponent extends URLLoader implements OnInit {
  @Input() id;
  book;
  bookI18n;
  selectedFile: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  imageName: any;
  loadingImage = false;
  constructor(private httpService: HTTPService,private activeModal: NgbActiveModal) {
    super();
  }

  closeModal(): void {
    this.activeModal.dismiss(); // Close the modal using NgbActiveModal
  }


  getImage(image) {
    this.loadingImage = true;
    console.log('${CONFIG.URL_BASE}/book/get/' + image);
    if (image) {
      
      this.httpService
        .getAll('${CONFIG.URL_BASE}/book/get/' + image)
        .pipe(
          finalize(() => {
            this.loadingImage = false;
          })
        )
        .subscribe((res) => {
          this.retrieveResonse = res;
          this.base64Data = this.retrieveResonse.picByte;

          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
        });
    }
  }

  ngOnInit(): void {
    this.viewBook(this.id);
    this.getBookByLang(CONFIG.getInstance().getLang());
    this.getImage(this.book?.photo)
    this.retrievedImage=CONFIG.URL_BASE+'/book/get/'+this.book?.id+'/'+this.book?.photo
  }

  ngOnChanges(changes: any) {
    this.viewBook(this.id);
    this.getBookByLang(CONFIG.getInstance().getLang());
    if (this.book) {
      this.getImage(this.book?.photo);
    }
  }
  AfterViewInit() {}
  viewBook(id: any) {
    if (this.id) {
      this.httpService.getAll(CONFIG.URL_BASE + '/book/' + id).subscribe(
        (data) => {
          this.book = data;
        },
        (err: HttpErrorResponse) => {
          super.show('Error', err.message, 'warning');
        }
      );
    }
  }

  getBookByLang(lang) {
     lang='EN'
    this.httpService.getAll(CONFIG.URL_BASE + '/i18n/book/' + lang).subscribe(
      (data) => {
        this.bookI18n = data;
      },
      (err: HttpErrorResponse) => {
        super.show('Error', err.message, 'warning');
      }
    );
  }
}
