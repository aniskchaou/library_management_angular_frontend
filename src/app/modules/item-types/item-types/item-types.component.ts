import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { URLLoader } from 'src/app/main/configs/URLLoader';
import { HTTPService } from 'src/app/main/services/HTTPService';
import CONFIG from 'src/app/main/urls/urls';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddItemTypesComponent } from 'src/app/modules/item-types/add-item-types/add-item-types.component';
import { ViewItemTypesComponent } from '../view-item-types/view-item-types.component';
import { DataService } from 'src/app/main/services/data.service';
import { EditItemTypesComponent } from '../edit-item-types/edit-item-types.component';

@Component({
  selector: 'app-item-types',
  templateUrl: './item-types.component.html',
  styleUrls: ['./item-types.component.css']
})
export class ItemTypesComponent extends URLLoader implements OnInit,AfterViewInit {

  itemList: any[]; // Define itemList to hold your data
  publishers = [
    { name: 'Publisher 1', slug: 'publisher-1', published: true, items: 5 },
    { name: 'Publisher 2', slug: 'publisher-2', published: false, items: 3 },
    { name: 'Publisher 3', slug: 'publisher-3', published: true, items: 10 },
  ];

  itemTypes
  pieChartData: any[];
  barChartData: any[];
  lineChartData: any[];
  bubbleChartData: any[];
  gaugeChartData: any[];
  areaChartData: any[];
  loading=false

  view: any[] = [400, 300];  // size of the charts

  showLegend = false;
  showLabels = true;
  isDoughnut = false;
  gradient = true;

  // Define color scheme
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  mediaItemsByTypeData: any[];
  mediaByGenreData: any[];
  mediaAcquisitionTrendsData: any[];
  topMediaTypesByBorrowCountData: any[];

  markdownContent

  columns = [
    { name: 'Image', prop: 'image', visible: true },
    { name: 'Description', prop: 'description', visible: true },
    { name: 'Code', prop: 'code', visible: true },
    { name: 'Parent Code', prop: 'parentCode', visible: true },
    { name: 'Search Category', prop: 'searchCategory', visible: true },
    { name: 'Not For Loan', prop: 'notForLoan', visible: true },
    { name: 'Rental Charge', prop: 'rentalCharge', visible: true },
    { name: 'Daily Rental Charge', prop: 'dailyRentalCharge', visible: true },
    { name: 'Hourly Rental Charge', prop: 'hourlyRentalCharge', visible: true },
    { name: 'Default Replacement Cost', prop: 'defaultReplacementCost', visible: true },
    { name: 'Processing Fee', prop: 'processingFee', visible: true },
    { name: 'Check-in Message', prop: 'checkinMessage', visible: true },
    { name: 'Library Limitations', prop: 'libraryLimitations', visible: true },
    { name: 'Actions', prop: 'actions', visible: true }
  ];

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

  editRow(writer): void {
    console.log('Editing writer:', writer);
    // Logic to edit writer
  }

  deleteRow(writer): void {
    console.log('Deleting writer:', writer);
    // Logic to delete writer
  }

/*   mediaTypes = [
    { type: 'Book', items: 100 },
    { type: 'DVD', items: 50 },
    { type: 'CD', items: 30 }
  ];

  genres = [
    { genre: 'Fiction', count: 60 },
    { genre: 'Non-Fiction', count: 40 },
    { genre: 'Science', count: 20 }
  ];

  borrowCounts = [
    { type: 'Book', count: 150 },
    { type: 'DVD', count: 80 },
    { type: 'CD', count: 45 }
  ]; */

  euroToDollarRate = 1.1; // Example conversion rate (1 EUR = 1.1 USD)

  convertToDollar(euro: number): number {
    return euro * this.euroToDollarRate;
  }
 

  constructor(private dataService:DataService, 
    private httpService: HTTPService, 
    private modalService: NgbModal,
    private http:HttpClient) { super()

   /*  this.pieChartData = [
      { name: 'Published', value: this.publishers.filter(p => p.published).length },
      { name: 'Unpublished', value: this.publishers.filter(p => !p.published).length }
    ];

    // Bar Chart Data
    this.barChartData = [
      { name: 'Publisher 1', value: 5 },
      { name: 'Publisher 2', value: 3 },
      { name: 'Publisher 3', value: 10 }
    ];

    // Line Chart Data
    this.lineChartData = [
      {
        name: 'Publishers',
        series: [
          { name: 'Publisher 1', value: 5 },
          { name: 'Publisher 2', value: 3 },
          { name: 'Publisher 3', value: 10 }
        ]
      }
    ];

    // Bubble Chart Data
    this.bubbleChartData = [
      {
        name: 'Publishers',
        series: [
          { name: 'Publisher 1', x: 1, y: 5, r: 10 },
          { name: 'Publisher 2', x: 2, y: 3, r: 15 },
          { name: 'Publisher 3', x: 3, y: 10, r: 20 }
        ]
      }
    ];

    // Gauge Chart Data
    this.gaugeChartData = [
      { name: 'Publisher 1', value: 5 },
      { name: 'Publisher 2', value: 3 },
      { name: 'Publisher 3', value: 10 }
    ];

    // Area Chart Data
    this.areaChartData = [
      {
        name: 'Publishers',
        series: [
          { name: 'Publisher 1', value: 5 },
          { name: 'Publisher 2', value: 3 },
          { name: 'Publisher 3', value: 10 }
        ]
      }
    ]; */

    this.fetchMarkdownFile();
  }
  ngAfterViewInit(): void {
    super.enableDataTable()
  }

  ngOnInit(): void {

    this.httpService
  .getAll(CONFIG.URL_BASE + '/mediatype/items-by-type')
  .pipe(finalize(() => (this.loading = false)))
  .subscribe(
    (data: any[]) => {
      this.mediaItemsByTypeData = data;
      this.loading = false;
    },
    (error) => {
      console.error('Error fetching media items by type', error);
      this.loading = false;
    }
  );


  this.httpService
  .getAll(CONFIG.URL_BASE + '/mediatype/distribution-by-genre')
  .pipe(finalize(() => (this.loading = false)))
  .subscribe(
    (data: any[]) => {
      this.mediaByGenreData = data;
      this.loading = false;
    },
    (error) => {
      console.error('Error fetching media distribution by genre', error);
      this.loading = false;
    }
  );
  

  this.httpService
  .getAll(CONFIG.URL_BASE + '/mediatype/acquisition-trends')
  .pipe(finalize(() => (this.loading = false)))
  .subscribe(
    (data: any[]) => {
      this.mediaAcquisitionTrendsData = data;
      this.loading = false;
    },
    (error) => {
      console.error('Error fetching media acquisition trends', error);
      this.loading = false;
    }
  );


  this.httpService
  .getAll(CONFIG.URL_BASE + '/mediatype/top-media-by-borrow')
  .pipe(finalize(() => (this.loading = false)))
  .subscribe(
    (data: any[]) => {
      this.topMediaTypesByBorrowCountData = data;
      this.loading = false;
    },
    (error) => {
      console.error('Error fetching top media by borrow count', error);
      this.loading = false;
    }
  );








    this.dataService.refreshData$.subscribe(() => {
      this.fetchItemList();  // Trigger the getAll() method when notified
    });
    // Fetch your data when the component initializes
    this.fetchItemList();

/*     // Number of Media Items by Type
    this.mediaItemsByTypeData = this.mediaTypes.map(media => ({
      name: media.type,
      value: media.items
    }));

    // Media Distribution by Genre
    this.mediaByGenreData = this.genres.map(genre => ({
      name: genre.genre,
      value: genre.count
    }));

    // Media Acquisition Trends Over Time
    this.mediaAcquisitionTrendsData = [
      {
        name: 'Acquisitions',
        series: [
          { name: '2018', value: 50 },
          { name: '2019', value: 75 },
          { name: '2020', value: 100 },
          { name: '2021', value: 125 }
        ]
      }
    ];

    // Top Media Types by Borrow Count
    this.topMediaTypesByBorrowCountData = this.borrowCounts.map(borrow => ({
      name: borrow.type,
      value: borrow.count
    })); */

    this.getAllData()
  }

  fetchItemList() {
    // Logic to fetch your item list data from your service or API
    // Example:
/*     this.itemList = [
      { image: 'image-url', description: 'Description', code: 'Code', parentCode: 'Parent Code', 
        searchCategory: 'Search Category', notForLoan: 'Not for Loan', rentalCharge: 'Rental Charge', 
        dailyRentalCharge: 'Daily Rental Charge', hourlyRentalCharge: 'Hourly Rental Charge', 
        defaultReplacementCost: 'Default Replacement Cost', processingFee: 'Processing Fee', 
        checkinMessage: 'Checkin Message', libraryLimitations: 'Library Limitations' },
    ]; */

    this.loading = true;
    this.httpService
      .getAll(CONFIG.URL_BASE + '/mediatype/all')
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(
        (data:any[]) => {
          this.itemTypes= data;
          this.loading = false;
        },
        (err: HttpErrorResponse) => {
          super.show('Error', err.message, 'warning');
        }
      );
  }


  getAllData() {
    this.loading = true;
    // Fetch Number of Media Items by Type
  /*   this.httpService
      .getAll(CONFIG.URL_BASE + '/book/media-items-by-type')
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(
        (data: any[]) => {
          this.mediaItemsByTypeData = data;
        },
        (err: HttpErrorResponse) => {
          super.show('Error', err.message, 'warning');
        }
      );
  
    // Fetch Media Distribution by Genre
    this.httpService
      .getAll(CONFIG.URL_BASE + '/book/media-distribution-by-genre')
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(
        (data: any[]) => {
          this.mediaByGenreData = data;
        },
        (err: HttpErrorResponse) => {
          super.show('Error', err.message, 'warning');
        }
      );
  
    // Fetch Media Acquisition Trends Over Time
    this.httpService
      .getAll(CONFIG.URL_BASE + '/book/media-acquisition-trends')
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(
        (data: any[]) => {
          this.mediaAcquisitionTrendsData = data;
        },
        (err: HttpErrorResponse) => {
          super.show('Error', err.message, 'warning');
        }
      );
  
    // Fetch Top Media Types by Borrow Count
    this.httpService
      .getAll(CONFIG.URL_BASE + '/book/top-media-types-by-borrow-count')
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(
        (data: any[]) => {
          this.topMediaTypesByBorrowCountData = data;
        },
        (err: HttpErrorResponse) => {
          super.show('Error', err.message, 'warning');
        }
      ); */
  }
  

  showModal: boolean = false;
  formData: any = {
    name: '',
    slug: '',
    published: false
  };



  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  submitForm() {
    // Handle form submission here
    console.log('Form Data:', this.formData);
    // After form submission, close the modal
    this.closeModal();
  }

  openAddDialog(): void {
    const modalRef = this.modalService.open(AddItemTypesComponent,{size: 'xl', // Set the modal size to extra-large
      centered: true,});
    modalRef.componentInstance.category = { }; // Ensure category is passed properly
  
    //console.log(category); // Ensure category is not undefined here

    modalRef.result.then(result => {
      console.log(result)
       this.fetchItemList()
      
    }).catch(error => console.log(error));
  }

  openViewDialog(item): void {
    const modalRef = this.modalService.open(ViewItemTypesComponent,{size: 'xl', // Set the modal size to extra-large
      centered: true,});
    modalRef.componentInstance.selectedItem = item; // Ensure category is passed properly
  
    console.log(item); // Ensure category is not undefined here

    modalRef.result.then(result => {
      console.log(result)
       this.fetchItemList()
      
    }).catch(error => console.log(error));
  }

  fetchMarkdownFile(): void {
    this.http.get('assets/documentation/modules/media-type.html', { responseType: 'text' })
      .subscribe(data => {
        console.log(data)
        this.markdownContent = data;
      });
  }

  reloadPage(){
    this.fetchItemList()
  }

  

  //deleteRow(row){}

  openEditDialog(row): void {
    const modalRef = this.modalService.open(EditItemTypesComponent);
    modalRef.componentInstance.mediaType = row;

    modalRef.result.then(result => {
      if (result) {
     
      }
    }).catch(error => console.log(error));
  }

}
