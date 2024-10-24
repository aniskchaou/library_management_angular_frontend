import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { URLLoader } from 'src/app/main/configs/URLLoader';
import BookMessage from 'src/app/main/messages/BookMessage';
import BookTestService from 'src/app/main/mocks/BookTestService';
import CatalogItem from 'src/app/main/models/Book';
import Category from 'src/app/main/models/Category';
import { Department } from 'src/app/main/models/Department';
import { MediaType } from 'src/app/main/models/MediaType';
import Publisher from 'src/app/main/models/Publisher';
import { Row } from 'src/app/main/models/Row';
import { Shelf } from 'src/app/main/models/Shelf';
import Writer from 'src/app/main/models/Writer';
import { HTTPService } from 'src/app/main/services/HTTPService';
import CONFIG from 'src/app/main/urls/urls';
import BookValidation from 'src/app/main/validations/BookValidation';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css'],
})
export class AddBookComponent  implements OnInit {
  /* bookForm: FormGroup;
  msg: BookMessage;
  submitted = false;
  writers$ = [];
  publishers$ = [];

  @Output() closeModalEvent = new EventEmitter<string>();
  bookI18n;
  categories$ = [];

  closeModal() {
    this.closeModalEvent.emit();
  }

  goBack() {
    this.router
      .navigateByUrl('/dashboard', { skipLocationChange: true })
      .then(() => {
        this.router.navigate(['/book']);
      });
  }

  get f() {
    return this.bookForm.controls;
  }

  constructor(
    private validation: BookValidation,
    private message: BookMessage,
    //private bookTestService: BookTestService,
    private httpService: HTTPService,
    private router: Router
  ) {
    super();
    this.bookForm = this.validation.formGroupInstance;
    this.msg = this.message;
    //console.log(this.msg.validationMessage.isbn);
  }

  ngOnInit(): void {
    this.getcategories();
    this.getWriters();
    this.getPublishers();
    this.getBookByLang(CONFIG.getInstance().getLang());
  }

  getcategories() {
    this.httpService.getAll(CONFIG.URL_BASE + '/category/all').subscribe(
      (data: Category[]) => {
        this.categories$ = data;
      },
      (err: HttpErrorResponse) => {
        super.show('Error', err.message, 'warning');
      }
    );
  }

  reset() {
    this.bookForm.reset();
  }

  getWriters() {
    this.httpService.getAll(CONFIG.URL_BASE + '/writer/all').subscribe(
      (data: Writer[]) => {
        this.writers$ = data;
        console.log(this.writers$);
      },
      (err: HttpErrorResponse) => {
        super.show('Error', err.message, 'error');
      }
    );
  }

  getPublishers() {
    this.httpService.getAll(CONFIG.URL_BASE + '/publisher/all').subscribe(
      (data: Publisher[]) => {
        this.publishers$ = data;
        //console.log(this.publishers$);
      },
      (err: HttpErrorResponse) => {
        super.show('Error', err.message, 'error');
      }
    );
  }

  add() {
    this.submitted = true;
    this.bookForm.value.publisher = this.publishers$.filter(
      (x) => x.id == parseInt(this.bookForm.value.publisher)
    )[0];
    this.bookForm.value.writer = this.writers$.filter(
      (x) => x.id == parseInt(this.bookForm.value.writer)
    )[0];
    this.bookForm.value.category = this.categories$.filter(
      (x) => x.id == parseInt(this.bookForm.value.category)
    )[0];

    if (this.validation.checkValidation()) {
      console.log(this.bookForm.value);
      this.httpService
        .create(CONFIG.URL_BASE + '/book/create', this.bookForm.value)
        .then(() => {
          this.reset();
          this.closeModal();
          this.goBack();
          super.show(
            'Confirmation',
            this.msg.confirmationMessages.add,
            'success'
          );
        });
    }
  }

  getBookByLang(lang) {
     lang='EN'
    this.httpService.getAll(CONFIG.URL_BASE + '/i18n/book/' + lang).subscribe(
      (data) => {
        this.bookI18n = data;
      },
      (err: HttpErrorResponse) => {
        super.show('Error', err.message, 'error');
      }
    );
  } */


    @Input() catalogItem:CatalogItem;
    writers: any[] = [];
    publishers: any[] = [];
    departments: any[] = [];
    shelves: any[] = [];
    rows: any[] = [];
    mediaTypes: any[] = [];
    physicalDescriptions: any[] = [];
  bookStatuses: any[];
  categories: any[];

    constructor(public activeModal: NgbActiveModal, private catalogItemService: HTTPService) { }
  
    ngOnInit(): void {
      this.loadInitialData();
      console.log(this.catalogItem)
    }
  
    loadInitialData(): void {
      // Load writers, publishers, departments, shelves, rows, and mediaTypes from services
       // Fetch writers
    this.catalogItemService.getWriters().subscribe(
      (writers: Writer[]) => {
        this.writers = writers; // Assign the data to the writers array
      },
      error => {
        console.error('Error fetching writers:', error); // Handle error
      }
    );

    // Fetch publishers
    this.catalogItemService.getPublishers().subscribe(
      (publishers: Publisher[]) => {
        this.publishers = publishers; // Assign the data to the publishers array
      },
      error => {
        console.error('Error fetching publishers:', error); // Handle error
      }
    );

    // Fetch departments
    this.catalogItemService.getDepartments().subscribe(
      (departments: Department[]) => {
        this.departments = departments; // Assign the data to the departments array
        console.log(departments)
      },
      error => {
        console.error('Error fetching departments:', error); // Handle error
      }
    );

    // Fetch shelves
    this.catalogItemService.getShelves().subscribe(
      (shelves: Shelf[]) => {
        this.shelves = shelves; // Assign the data to the shelves array
      },
      error => {
        console.error('Error fetching shelves:', error); // Handle error
      }
    );

    // Fetch rows
    this.catalogItemService.getRows().subscribe(
      (rows: Row[]) => {
        this.rows = rows; // Assign the data to the rows array
      },
      error => {
        console.error('Error fetching rows:', error); // Handle error
      }
    );

    // Fetch media types
    this.catalogItemService.getMediaTypes().subscribe(
      (mediaTypes: any[]) => {
        this.mediaTypes = mediaTypes; // Assign the data to the mediaTypes array
      },
      error => {
        console.error('Error fetching media types:', error); // Handle error
      }
    );

    this.catalogItemService.getPhysicalDescriptions().subscribe(
      (physicalDescriptions: any[]) => {
        this.physicalDescriptions = physicalDescriptions; // Assign the data to the mediaTypes array
      },
      error => {
        console.error('Error fetching media types:', error); // Handle error
      }
    );

    /* this.catalogItemService.getBookStatuses().subscribe(
      (bookStatuses: any[]) => {
        this.bookStatuses = bookStatuses; // Assign the data to the mediaTypes array
      },
      error => {
        console.error('Error fetching media types:', error); // Handle error
      }
    ); */

    this.catalogItemService.getCategories().subscribe(
      (categories: any[]) => {
        this.categories = categories; // Assign the data to the mediaTypes array
      },
      error => {
        console.error('Error fetching media types:', error); // Handle error
      }
    );



    }
  
    onSaveClick(): void {
      this.activeModal.close(this.catalogItem);
    }
  
    onCancelClick(): void {
      this.activeModal.dismiss();
    }
  
    saveCatalogItem(): void {
      console.log(this.catalogItem)
      this.catalogItem.mediaType = this.mediaTypes.find(x => x.id == this.catalogItem.mediaType.id);
      this.catalogItem.departement = this.departments.find(x => x.id ==this.catalogItem.departement.id);
  this.catalogItem.row = this.rows.find(x => x.id == this.catalogItem.row.id);
  this.catalogItem.writer = this.writers.find(x => x.id == this.catalogItem.writer.id);
  this.catalogItem.shelf = this.shelves.find(x => x.id == this.catalogItem.shelf.id);
  this.catalogItem.publisher = this.publishers.find(x => x.id == this.catalogItem.publisher.id);

  this.catalogItem.category = this.categories.find(x => x.id == this.catalogItem.category.id);
  //this.catalogItem.bookStatus = this.bookStatuses.find(x => x.id == parseInt(this.catalogItem.bookStatus));

      
        this.catalogItemService.create(CONFIG.URL_BASE+'/book/create',this.catalogItem).then(() => {
         
          this.activeModal.close(this.catalogItem);
        });
      
    }
}
