import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { URLLoader } from 'src/app/main/configs/URLLoader';
import BookMessage from 'src/app/main/messages/BookMessage';
import Writer from 'src/app/main/models/Writer';
import { HTTPService } from 'src/app/main/services/HTTPService';
import CONFIG from 'src/app/main/urls/urls';
import { ViewWriterComponent } from '../view-writer/view-writer.component';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddWriterComponent } from '../add-writer/add-writer.component';
import { DataService } from 'src/app/main/services/data.service';

@Component({
  selector: 'app-writer',
  templateUrl: './writer.component.html',
  styleUrls: ['./writer.component.css'],
})
export class WriterComponent extends URLLoader implements OnInit {
  writers$ = [{}];
  id;
  writerI18n;
  loading = false;

  publishers = [
    { name: 'Publisher 1', slug: 'publisher-1', published: true, items: 5 },
    { name: 'Publisher 2', slug: 'publisher-2', published: false, items: 3 },
    { name: 'Publisher 3', slug: 'publisher-3', published: true, items: 10 },
  ];

  pieChartData: any[];
  barChartData: any[];
  lineChartData: any[];
  bubbleChartData: any[];
  gaugeChartData: any[];
  areaChartData: any[];

  view: any[] = [400, 300];  // size of the charts

  // options
  showLegend = false;
  gradient = true;
  showLabels = true;
  isDoughnut = false;

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };



  publicationsByAuthorsData: any[];
  publicationsByGenreData: any[];
  publicationTrendsData: any[];
  topAuthorsByBorrowCountData: any[];
/* 
  authors = [
    { name: 'Author 1', publications: 10 },
    { name: 'Author 2', publications: 15 },
    { name: 'Author 3', publications: 8 }
  ];

  genres = [
    { genre: 'Fiction', count: 20 },
    { genre: 'Non-Fiction', count: 15 },
    { genre: 'Science', count: 10 }
  ];

  borrowCounts = [
    { author: 'Author 1', count: 50 },
    { author: 'Author 2', count: 30 },
    { author: 'Author 3', count: 40 }
  ]; */
  markdownContent: Object;

  constructor(
    private httpService: HTTPService,
    private messageService: BookMessage,
    private router: Router,
    private modalService: NgbModal,
    private dataService:DataService,
    private http:HttpClient,
    
   
  ) {
    super();
 /*    this.pieChartData = [
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



      // Get publications by authors data
  this.httpService.getAll(CONFIG.URL_BASE + '/book/publications-by-authors').subscribe(
    (data: any[]) => {
      this.publicationsByAuthorsData = data;
    },
    (err: HttpErrorResponse) => {
      super.show('Error', err.message, 'warning');
    }
  );

  // Get publication distribution by genre
  this.httpService.getAll(CONFIG.URL_BASE + '/book/publication-distribution-by-genre').subscribe(
    (data: any[]) => {
      this.publicationsByGenreData = data;
    },
    (err: HttpErrorResponse) => {
      super.show('Error', err.message, 'warning');
    }
  );

  // Get publication trends over time
  this.httpService.getAll(CONFIG.URL_BASE + '/book/publication-trends-over-time').subscribe(
    (data: any[]) => {
      this.publicationTrendsData = data;
    },
    (err: HttpErrorResponse) => {
      super.show('Error', err.message, 'warning');
    }
  );

  // Get top authors by borrow count
  this.httpService.getAll(CONFIG.URL_BASE + '/book/top-authors-by-borrow-count').subscribe(
    (data: any[]) => {
      this.topAuthorsByBorrowCountData = data;
      this.loading = false; // Set loading to false after all requests are complete
    },
    (err: HttpErrorResponse) => {
      super.show('Error', err.message, 'warning');
      this.loading = false; // Ensure loading is stopped even if there's an error
    }
  );
  }

  
  

  ngOnInit(): void {
    this.getAll();
    this.getWriterByLang(CONFIG.getInstance().getLang());
      // Number of Publications by Authors
     /*  this.publicationsByAuthorsData = this.authors.map(author => ({
        name: author.name,
        value: author.publications
      })); */
  
      // Publication Distribution by Genre
     /*  this.publicationsByGenreData = this.genres.map(genre => ({
        name: genre.genre,
        value: genre.count
      }));
 */
      this.dataService.refreshData$.subscribe(() => {
        this.getAll();  // Trigger the getAll() method when notified
      });
  
      // Publication Trends Over Time
      this.publicationTrendsData = [
        {
          name: 'Publications',
          series: [
            { name: '2018', value: 20 },
            { name: '2019', value: 25 },
            { name: '2020', value: 30 },
            { name: '2021', value: 35 }
          ]
        }
      ];
  
      // Top Authors by Borrow Count
      /* this.topAuthorsByBorrowCountData = this.borrowCounts.map(borrow => ({
        name: borrow.author,
        value: borrow.count
      })); */
      this.fetchMarkdownFile()
      this.dataService.refreshData$.subscribe(() => {
        this.getAll();  // Trigger the getAll() method when notified
      });
  }

  fetchMarkdownFile(): void {
    this.http.get('assets/documentation/modules/author.html', { responseType: 'text' })
      .subscribe(data => {
        console.log(data)
        this.markdownContent = data;
      });
  }

  getAll() {
    this.loading = true;
    this.httpService.getAll(CONFIG.URL_BASE + '/writer/all').subscribe(
      (data: Writer[]) => {
        this.writers$ = data;
        this.loading = false;
      },
      (err: HttpErrorResponse) => {
        super.show('Error', err.message, 'error');
      }
    );
  }
  openAddDialog(): void {
    const modalRef = this.modalService.open(AddWriterComponent,{size: 'xl', 
      centered: true,});
    modalRef.componentInstance.department = {};

    modalRef.result.then(result => {
      //if (result) {
        
          this.getAll()
      
      //}
    }).catch(error => console.log(error));
  }


  edit(id) {
    this.id = id;
  }

  getWriterByLang(lang) {
    this.httpService.getAll(CONFIG.URL_BASE + '/i18n/writer/EN').subscribe(
      (data) => {
        this.writerI18n = data;
      },
      (err: HttpErrorResponse) => {
        super.show('Error', err.message, 'error');
      }
    );
  }

  delete(id) {
    var r = confirm('Voulez-vous supprimer cet enregistrement ?');
    if (r) {
      this.httpService.remove(CONFIG.URL_BASE + '/writer/delete/' + id).then(()=>{
          super.show(
        'Confirmation',
        this.messageService.confirmationMessages.delete,
        'success'
      );
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

  reloadPage() {
    this.router
      .navigateByUrl('/dashboard', { skipLocationChange: true })
      .then(() => {
        this.router.navigate(['/typemember']);
      });
  }




}
