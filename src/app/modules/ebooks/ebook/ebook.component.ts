import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { URLLoader } from 'src/app/main/configs/URLLoader';
import EBook from 'src/app/main/models/EBook';
import { HTTPService } from 'src/app/main/services/HTTPService';
import CONFIG from 'src/app/main/urls/urls';
import * as pdfjsLib from 'pdfjs-dist';
import pdf2json from 'pdf2json';
import * as html2canvas from 'html2canvas';
@Component({
    selector: 'app-ebook',
    templateUrl: './ebook.component.html',
    styleUrls: ['./ebook.component.css'],
    standalone: false
})
export class EbookComponent extends URLLoader implements OnInit {
  ebooks$ = [{}];

  constructor(private httpService: HTTPService,private http: HttpClient) {
    super();
  }



  pages: string[] = []; // Array to hold image URLs of book pages


  ngAfterViewInit() {
    // turn.js (jQuery-based book flip) removed. Re-implement with a Material/CSS solution if needed.
  }

  @ViewChild('book') bookElement: ElementRef;
  pdfUrl: string = 'http://www.ecam.fr/wp-content/uploads/2016/06/Exemple-fichier-PDF-1.pdf';

  //constructor() { }


  ngOnInit(): void {
    this.loadPdf();
  }

  

  loadPdf(): void {
    this.http.get(this.pdfUrl, { responseType: 'arraybuffer' }).subscribe((data: ArrayBuffer) => {
      const uint8Array = new Uint8Array(data);
     // this.renderPdf(uint8Array);
    });
  }

  /* renderPdf(uint8Array: Uint8Array): void {
    pdfjsLib.getDocument({ data: uint8Array }).promise.then((pdf: any) => {
      const pagesPromises = [];

      for (let i = 1; i <= pdf.numPages; i++) {
        pagesPromises.push(pdf.getPage(i));
      }

      Promise.all(pagesPromises).then((pages: any[]) => {
        pages.forEach((page: any) => {
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');

          const viewport = page.getViewport({ scale: 1 });
          canvas.height = viewport.height;
          canvas.width = viewport.width;

          const renderContext = {
            canvasContext: context,
            viewport: viewport
          };

          page.render(renderContext).promise.then(() => {
            this.bookElement.nativeElement.appendChild(canvas);
          }).catch((error: any) => {
            console.error('Error rendering page', error);
          });
        });
      }).catch((error: any) => {
        console.error('Error loading pages', error);
      });
    }).catch((error: any) => {
      console.error('Error loading PDF document', error);
    });
  } */

  getAll() {
    // this.appointements$ = this.appointmentTestService.getAll()
    this.httpService.getAll(CONFIG.URL_BASE + '/book/all').subscribe(
      (data: EBook[]) => {
        this.ebooks$ = data;
        //
      },
      (err: HttpErrorResponse) => {
        super.show('Error', err.message, 'error');
      }
    );
  }
}
