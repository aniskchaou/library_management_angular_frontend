import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { URLLoader } from 'src/app/main/configs/URLLoader';
import BookMessage from 'src/app/main/messages/BookMessage';
import Publisher from 'src/app/main/models/Publisher';
import { HTTPService } from 'src/app/main/services/HTTPService';
import CONFIG from 'src/app/main/urls/urls';
import { ViewPublisherComponent } from '../view-publisher/view-publisher.component';
import { DataService } from 'src/app/main/services/data.service';
import { Observable } from 'rxjs';
import { EditPublisherComponent } from '../edit-publisher/edit-publisher.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-publisher',
  templateUrl: './publisher.component.html',
  styleUrls: ['./publisher.component.css'],
})
export class PublisherComponent extends URLLoader implements OnInit,AfterViewInit {
  publishers$ = [{}];
  id;
  publisherI18n;
  loading = false;


  pieChartData: any[];
  barChartData: any[];
  lineChartData: any[];
  bubbleChartData: any[];
  gaugeChartData: any[];
  areaChartData: any[];
  columns = [
    //{ name: 'ID', prop: 'id', visible: true },
    { name: 'Publisher Name', prop: 'name', visible: true },
    { name: 'Address', prop: 'address', visible: true },
    { name: 'Email', prop: 'email', visible: true },
    { name: 'Phone', prop: 'phone', visible: true },
    { name: 'Country', prop: 'country', visible: true },
    { name: 'Website', prop: 'website', visible: true },
    { name: 'Actions', prop: 'actions', visible: true }
  ];

  //loading: boolean = true;
  reorderable: boolean = true;
  


  view: any[] = [400, 300];  // size of the charts

  // options
  showLegend = false;
  gradient = true;
  showLabels = true;
  isDoughnut = false;

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

 /*  publishers = [
    { name: 'Publisher 1', publications: 100 },
    { name: 'Publisher 2', publications: 75 },
    { name: 'Publisher 3', publications: 50 }
  ]; */

  publicationsByPublisherData: any[];
  publisherByGenreData: any[];
  publicationTrendsByPublisherData: any[];
  topPublishersByBorrowCountData: any[];

/*   genres = [
    { genre: 'Fiction', count: 60 },
    { genre: 'Non-Fiction', count: 40 },
    { genre: 'Science', count: 20 }
  ];

  borrowCounts = [
    { publisher: 'Publisher 1', count: 150 },
    { publisher: 'Publisher 2', count: 80 },
    { publisher: 'Publisher 3', count: 45 }
  ]; */
  markdownContent: any;

  constructor(
    private toastr: ToastrService,
    private httpService: HTTPService,
    private router: Router,
    private messageService: BookMessage,
    private modalService: NgbModal,
    private http:HttpClient,
    private dataService:DataService
  ) {
    super();
   /*  this.pieChartData = [
      { name: 'Published', value: this.publishers.filter(p => p.published).length },
      { name: 'Unpublished', value: this.publishers.filter(p => !p.published).length }
    ]; */

   /*  // Bar Chart Data
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
    this.getNumberOfPublicationsByPublisher().subscribe(
      (data) => {
        this.publicationsByPublisherData = data;
      },
      (err: HttpErrorResponse) => {
        console.error('Error fetching publications by publisher', err.message);
       // this.showError(err);
      }
    );
    
    this.getPublisherDistributionByGenre().subscribe(
      (data) => {
        this.publisherByGenreData = data;
      },
      (err: HttpErrorResponse) => {
        console.error('Error fetching publisher distribution by genre', err.message);
       // this.showError(err);
      }
    );
    
    this.getPublicationTrendsByPublisher().subscribe(
      (data: any[]) => {
        // Assuming the data is an array of publishers with a name and a value property
        this.publicationTrendsByPublisherData = [
          {
            name: 'Publishers',
            series: data.map(publisher => ({
              name: publisher.name,  // Replace 'name' with the correct property from your data
              value: publisher.value  // Replace 'value' with the correct property from your data
            }))
          }
        ];
        console.log(this.areaChartData)
      },
      (err: HttpErrorResponse) => {
        console.error('Error fetching publication trends by publisher', err.message);
        //this.showError(err);
      }
    );
    
    
    this.getTopPublishersByBorrowCount().subscribe(
      (data) => {
        this.topPublishersByBorrowCountData = data;
      },
      (err: HttpErrorResponse) => {
        console.error('Error fetching top publishers by borrow count', err.message);
        //this.showError(err);
      }
    );
    

  }
    
    
    

  edit(id) {
    this.id = id;
  }



  ngAfterViewInit(): void {
    super.enableDataTable()
  }


  ngOnInit(): void {
    this.loadScripts();
    this.getAll();
    this.getPublisherByLang(CONFIG.getInstance().getLang());
    this.fetchMarkdownFile()

    this.dataService.refreshData$.subscribe(() => {
      this.getAll();  // Trigger the getAll() method when notified
    });

   /*   // Number of Publications by Publisher
     this.publicationsByPublisherData = this.publishers.map(publisher => ({
      name: publisher.name,
      value: publisher.publications
    }));

    // Publisher Distribution by Genre
    this.publisherByGenreData = this.genres.map(genre => ({
      name: genre.genre,
      value: genre.count
    })); */

    // Publication Trends by Publisher Over Time
   /*  this.publicationTrendsByPublisherData = [
      {
        name: 'Publisher 1',
        series: [
          { name: '2018', value: 50 },
          { name: '2019', value: 75 },
          { name: '2020', value: 100 },
          { name: '2021', value: 125 }
        ]
      },
      {
        name: 'Publisher 2',
        series: [
          { name: '2018', value: 40 },
          { name: '2019', value: 60 },
          { name: '2020', value: 80 },
          { name: '2021', value: 100 }
        ]
      }
    ]; */

    

    /* // Top Publishers by Borrow Count
    this.topPublishersByBorrowCountData = this.borrowCounts.map(borrow => ({
      name: borrow.publisher,
      value: borrow.count
    })); */
  }

  reloadPage() {
    this.router
      .navigateByUrl('/dashboard', { skipLocationChange: true })
      .then(() => {
        this.router.navigate(['/publisher']);
      });
  }

  getPublisherByLang(lang) {
     lang='EN'
    this.httpService
      .getAll(CONFIG.URL_BASE + '/i18n/publisher/' + lang)
      .subscribe(
        (data) => {
          this.publisherI18n = data;
        },
        (err: HttpErrorResponse) => {
          super.show('Error', err.message, 'error');
        }
      );
  }

  delete(id) {
    var r = confirm('Do you want to delete this recording ?');
    if (r) {
      this.httpService.remove(CONFIG.URL_BASE + '/publisher/delete/' + id).then(()=>{
        this.toastr.success('Item removed successfully!', 'Success');

      this.reloadPage();
      });
      
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

  
  deleteRow(row){}

  getAll() {
    this.loading = true;
    this.httpService.getAll(CONFIG.URL_BASE + '/publisher/all').subscribe(
      (data: Publisher[]) => {
        this.publishers$ = data;
        this.loading = false;
      },
      (err: HttpErrorResponse) => {
        super.show('Error', err.message, 'warning');
      }
    );
  }

  getNumberOfPublicationsByPublisher(): Observable<any> {
    return this.httpService.getAll(CONFIG.URL_BASE + '/book/publications-by-publisher');
  }

  // 2. Get Publisher Distribution by Genre
  getPublisherDistributionByGenre(): Observable<any> {
    return this.httpService.getAll(CONFIG.URL_BASE + '/book/distribution-by-genre');
  }

  // 3. Get Publication Trends by Publisher Over Time
  getPublicationTrendsByPublisher(): Observable<any> {
    return this.httpService.getAll(CONFIG.URL_BASE + '/book/publication-trends-by-publisher');
  }

  // 4. Get Top Publishers by Borrow Count
  getTopPublishersByBorrowCount(): Observable<any> {
    return this.httpService.getAll(CONFIG.URL_BASE + '/book/top-publishers-by-borrow-count');
  }

  openViewDialog(item): void {
    const modalRef = this.modalService.open(ViewPublisherComponent,{size: 'xl', 
      centered: true,});
    modalRef.componentInstance.selectedPublisher = item; // Ensure category is passed properly
  
    //console.log(category); // Ensure category is not undefined here

    modalRef.result.then(result => {
      console.log(result)
       //this.fetchItemList()
      
    }).catch(error => console.log(error));
  }


  fetchMarkdownFile(): void {
    this.http.get('assets/documentation/modules/publisher.html', { responseType: 'text' })
      .subscribe(data => {
        console.log(data)
        this.markdownContent = data;
      });
  }

  onSelect(selected) {
    console.log('Selected row:', selected);
  }

  onActivate(event) {
    console.log('Activate Event:', event);
  }


  openEditDialog(row): void {
    const modalRef = this.modalService.open(EditPublisherComponent);
    modalRef.componentInstance.publisher = row;

    modalRef.result.then(result => {
      if (result) {
      
      }
    }).catch(error => console.log(error));
  }
}
