import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { URLLoader } from 'src/app/main/configs/URLLoader';
import BookMessage from 'src/app/main/messages/BookMessage';
import BookTestService from 'src/app/main/mocks/BookTestService';
import CatalogItem from 'src/app/main/models/Book';
import { HTTPService } from 'src/app/main/services/HTTPService';
import CONFIG from 'src/app/main/urls/urls';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
})
export class BookComponent extends URLLoader implements OnInit {
  showsummary: boolean = false;
  showgraphic: boolean = false;
  loading = false;
  books$ = [];
  view: any[] = [400, 300];
  id = 0;
  bookI18n;
  single: any[];
  @Output() viewEvent = new EventEmitter<string>();
  gradient: boolean = false; // Define gradient property
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  showXAxisLabel: boolean = true;
  showYAxisLabel: boolean = true;
  xAxisLabel: string = 'X Axis Label';
  yAxisLabel: string = 'Y Axis Label';

  // Define data for bubble chart
  bubbleChartData: any[] = [
    {
      name: 'Bubble Chart',
      series: [
        { name: 'Publisher 1', x: 1, y: 5, r: 10 },
        { name: 'Publisher 2', x: 2, y: 3, r: 15 },
        { name: 'Publisher 3', x: 3, y: 10, r: 20 }
      ]
    }
  ];

  showLegend: boolean = false;
  showXAxisLine: boolean = true;
  showYAxisLine: boolean = true;
  markdownContent: string="";

  showLabels = true;
  isDoughnut = false;

  // Define color scheme


  itemsByCategoryData: any[];
  itemsByMediaTypeData: any[];
  acquisitionTrendsData: any[];
  topBorrowedItemsData: any[];

  categories = [
    { category: 'Fiction', items: 120 },
    { category: 'Non-Fiction', items: 80 },
    { category: 'Reference', items: 50 }
  ];

  mediaTypes = [
    { type: 'Books', count: 150 },
    { type: 'DVDs', count: 40 },
    { type: 'eBooks', count: 60 }
  ];

  borrowCounts = [
    { item: 'Book 1', count: 45 },
    { item: 'Book 2', count: 30 },
    { item: 'DVD 1', count: 20 }
  ];

  // Define onSelect event handler
  onSelect(event: any) {
    // Handle select event
  }




  constructor(
    private bookTestService: BookTestService,
    private messageService: BookMessage,
    private httpService: HTTPService,
    private router: Router
  ) {
    super();
    Object.assign(this, { single });
  }

  edit(id) {
    this.id = id;
  }

  filter(data) {
    console.log(data);
    if (data == null) {
      super.show('Search Result', 'No result !', 'info');
    } else {
      this.books$.length = 0;
      this.books$.push(data);
    }
  }

  delete(id) {
    var r = confirm('Do you want to delete this recording ?');
    if (r) {
      this.httpService.remove(CONFIG.URL_BASE + '/book/delete/' + id);
      super.show(
        'Confirmation',
        this.messageService.confirmationMessages.delete,
        'success'
      );
      this.reloadPage();
    }
  }

  reloadPage() {
    this.router
      .navigateByUrl('/dashboard', { skipLocationChange: true })
      .then(() => {
        this.router.navigate(['/book']);
      });
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

  ngOnInit() {
    this.getAll();
    this.getBookByLang(CONFIG.getInstance().getLang());
    this.getMenuByLang(CONFIG.getInstance().getLang());
    this.fetchMarkdownFile()
    this.loadItemsByCategory();
    this.loadItemsByMediaType();
    this.loadAcquisitionTrends();
    this.loadTopBorrowedItems();

     // Number of Items by Category
/*      this.itemsByCategoryData = this.categories.map(category => ({
      name: category.category,
      value: category.items
    }));

    // Items Distribution by Media Type
    this.itemsByMediaTypeData = this.mediaTypes.map(type => ({
      name: type.type,
      value: type.count
    }));

    // Acquisition Trends Over Time
    this.acquisitionTrendsData = [
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

    // Top Borrowed Items
    this.topBorrowedItemsData = this.borrowCounts.map(borrow => ({
      name: borrow.item,
      value: borrow.count
    })); */
  }

  loadItemsByCategory(): void {
    this.httpService.getItemsByCategory().subscribe(data => {
      this.itemsByCategoryData = data;
    });
  }

  loadItemsByMediaType(): void {
    this.httpService.getItemsByMediaType().subscribe(data => {
      this.itemsByMediaTypeData = data;
    });
  }

  loadAcquisitionTrends(): void {
    this.httpService.getItemsByPublishingYear().subscribe(data => {
      this.acquisitionTrendsData = data;
    });
  }

  loadTopBorrowedItems(): void {
    this.httpService.getItemsByStatus().subscribe(data => {
      this.topBorrowedItemsData = data;
    });
  }

  viewCatalog(id) {
    this.id = id;
  }

  getAll() {
    this.loading = true;
    this.httpService
      .getAll(CONFIG.URL_BASE + '/book/all')
      //.pipe(finalize(() => (this.loading = false)))
      .subscribe(
        (data: CatalogItem[]) => {
          this.books$ = data;
          this.loading = false;
        },
        (err: HttpErrorResponse) => {
          super.show('Error', err.message, 'warning');
        }
      );
  }

  getMenuByLang(lang) {
    this.httpService.getAll(CONFIG.URL_BASE + '/i18n/menu/EN').subscribe(
      (data) => {
        console.log(data);
        this.httpService.menuI18n.next(data);
      },
      (err: HttpErrorResponse) => {
        super.show('Error', err.message, 'warning');
        //this.reload = true;
      }
    );
  }

  groupByAuthors() {
    this.loading = true;
    this.httpService
      .getAll(CONFIG.URL_BASE + '/book/groupbyauthors')
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(
        (data: CatalogItem[]) => {
          this.books$ = data;
          this.loading = false;
        },
        (err: HttpErrorResponse) => {
          super.show('Error', err.message, 'warning');
        }
      );
  }

  groupByCategories() {
    this.loading = true;
    this.httpService
      .getAll(CONFIG.URL_BASE + '/book/groupbycategories')
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(
        (data: CatalogItem[]) => {
          this.books$ = data;
          this.loading = false;
        },
        (err: HttpErrorResponse) => {
          super.show('Error', err.message, 'warning');
        }
      );
  }

  groupByEditionYears() {
    this.loading = true;
    this.httpService
      .getAll(CONFIG.URL_BASE + '/book/groupbyeditionyears')
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(
        (data: CatalogItem[]) => {
          this.books$ = data;
          this.loading = false;
        },
        (err: HttpErrorResponse) => {
          super.show('Error', err.message, 'warning');
        }
      );
  }

  groupByPublishers() {
    this.loading = true;
    this.httpService
      .getAll(CONFIG.URL_BASE + '/book/groupbypublishers')
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(
        (data: CatalogItem[]) => {
          this.books$ = data;
          this.loading = false;
        },
        (err: HttpErrorResponse) => {
          super.show('Error', err.message, 'warning');
        }
      );
  }

  filterByYears(year) {
    this.loading = true;
    this.httpService
      .getAll(CONFIG.URL_BASE + '/book/filterbyyears/' + year)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(
        (data: CatalogItem[]) => {
          this.books$ = data;
          this.loading = false;
        },
        (err: HttpErrorResponse) => {
          super.show('Error', err.message, 'warning');
        }
      );
  }
  filterByWriters(writers) {
    this.loading = true;
    this.httpService
      .getAll(CONFIG.URL_BASE + '/book/filterbywriters/' + writers.id)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(
        (data: CatalogItem[]) => {
          this.books$ = data;
          this.loading = false;
        },
        (err: HttpErrorResponse) => {
          super.show('Error', err.message, 'warning');
        }
      );
  }
  filterByCategories(category) {
    this.loading = true;
    this.httpService
      .getAll(CONFIG.URL_BASE + '/book/filterbycategories/' + category)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(
        (data: CatalogItem[]) => {
          this.books$ = data;
          this.loading = false;
        },
        (err: HttpErrorResponse) => {
          super.show('Error', err.message, 'warning');
        }
      );
  }

  destroy(id) {
    this.httpService
      .put(CONFIG.URL_BASE + '/book/destroybook/' + id)
      .subscribe((data) => {
        super.show('Confirmation', 'Book has been destroyed', 'success');
        this.reloadPage();
      });
  }
  archive(id) {
    this.httpService
      .put(CONFIG.URL_BASE + '/book/archivebook/' + id)
      .subscribe((data) => {
        super.show('Confirmation', 'Book has been archived', 'success');
        this.reloadPage();
      });
  }

  fetchMarkdownFile(): void {
    this.httpService.getDocs('assets/documentation/modules/catalog.html')
      .subscribe(data => {
        console.log(data)
        this.markdownContent = data;
      });
  }

  isbn: string = '';
  bookData = null;

  // Method to handle form submission
  onSubmit() {
    if (this.isbn) {
      // Fetch book information from Google Books API
      this.httpService.getBookByISBN(this.isbn).subscribe(
        (response: any) => {
          console.log(response)
          if (response.items && response.items.length > 0) {
            const bookInfo = response.items[0].volumeInfo;

            // Map the book data to CatalogItem
            this.bookData = {
              id: 0,  // Generate this on the backend
              isbn: this.isbn,
              title: bookInfo.title || '',
              subtitle: bookInfo.subtitle || '',
              writer: bookInfo.authors ? bookInfo.authors.join(', ') : '',
              edition: '',  // Set if available
              edition_year: '',  // Set if available
              number_of_books: '1',  // Default to 1
              photo: bookInfo.imageLinks?.thumbnail || '',
              physical_form: '',  // Set as needed
              publisher: bookInfo.publisher || '',
              series: bookInfo.series || '',
              size: bookInfo.dimensions || '',
              price: '',  // Set as needed
              call_no: '',  // Set as needed
              location: '',  // Set as needed
              clue_page: '',  // Set as needed
              editor: bookInfo.editors ? bookInfo.editors.join(', ') : '',
              publishing_year: bookInfo.publishedDate || '',
              publication_place: '',  // Set as needed
              number_of_pages: bookInfo.pageCount?.toString() || '',
              source_details: '',  // Set as needed
              notes: bookInfo.description || '',
              pdf: '',  // Set as needed
              link: bookInfo.previewLink || '',
              category: bookInfo.categories ? bookInfo.categories.join(', ') : '',
              departement:''
            };
            console.log(this.bookData)

            // Send the book data to the backend
            /* this.httpService.create(CONFIG.URL_BASE + '/book/ceate',this.bookData).then(
              (result) => {
                console.log('Book data sent successfully!', result);
              },
              (error) => {
                console.error('Error sending book data to the backend', error);
              }
            ); */
          }
        },
        (error) => {
          console.error('Error fetching book data from Google Books API', error);
        }
      );
    }
  }



  onSubmitOpenLibrary() {
      console.log(this.isbn)
      // Fetch book information from Open Library API
      this.httpService.getBookByISBNOpenLibrary(this.isbn).subscribe(
        (response: any) => {
          console.log(response)
          if (response.docs && response.docs.length > 0) {
            const bookInfo = response.docs[0];

            // Map the book data to CatalogItem
            this.bookData = {
              id: 0,  // Generate this on the backend
              isbn: this.isbn,
              title: bookInfo.title || '',
              subtitle: bookInfo.subtitle || '',
              writer: bookInfo.author_name ? bookInfo.author_name.join(', ') : '',
              edition: bookInfo.edition_name || '',
              edition_year: bookInfo.first_publish_year?.toString() || '',
              number_of_books: '1',  // Default to 1
              photo: bookInfo.cover_i ? `https://covers.openlibrary.org/b/id/${bookInfo.cover_i}-L.jpg` : '',
              physical_form: '',  // Set as needed
              publisher: bookInfo.publisher ? bookInfo.publisher.join(', ') : '',
              series: bookInfo.series || '',
              size: '',  // Set as needed
              price: '',  // Set as needed
              call_no: '',  // Set as needed
              location: '',  // Set as needed
              clue_page: '',  // Set as needed
              editor: '',  // Not available in Open Library API
              publishing_year: bookInfo.first_publish_year?.toString() || '',
              publication_place: '',  // Set as needed
              number_of_pages: bookInfo.number_of_pages_median?.toString() || '',
              source_details: '',  // Set as needed
              notes: bookInfo.notes || '',
              pdf: '',  // Not available in Open Library API
              link: `https://openlibrary.org${bookInfo.key}`,
              category: bookInfo.subject ? bookInfo.subject.join(', ') : '',
            };

            console.log(this.bookData)

            // Send the book data to the backend
           /*  this.openLibraryService.sendBookDataToBackend(this.bookData).subscribe(
              (result) => {
                console.log('Book data sent successfully!', result);
              },
              (error) => {
                console.error('Error sending book data to the backend', error);
              }
            ); */
          }
        },
        (error) => {
          console.error('Error fetching book data from Open Library API', error);
        }
      );
    
  }



  onSubmitCongressLibrary() {
    if (this.isbn) {
      // Fetch book information from Library of Congress API
      this.httpService.getBookByISBNCongressLibrary(this.isbn).subscribe(
        (response: any) => {
          console.log(response)
          if (response.results && response.results.length > 0) {
            const bookInfo = response.results[0];

            // Map the book data to CatalogItem
            this.bookData = {
              id: 0,  // Generate this on the backend
              isbn: this.isbn,
              title: bookInfo.title || '',
              subtitle: '',  // No subtitle provided in LOC data
              writer: bookInfo.contributors ? bookInfo.contributors.map((contributor: any) => contributor.name).join(', ') : '',
              edition: '',  // Not available in LOC data
              edition_year: bookInfo.date || '',
              number_of_books: '1',  // Default to 1
              photo: bookInfo.image_url || '',
              physical_form: '',  // Set as needed
              publisher: bookInfo.publisher || '',
              series: '',  // Not available in LOC data
              size: '',  // Set as needed
              price: '',  // Set as needed
              call_no: bookInfo.call_number || '',
              location: bookInfo.location || '',
              clue_page: '',  // Not available in LOC data
              editor: '',  // Not available in LOC data
              publishing_year: bookInfo.date || '',
              publication_place: '',  // Set as needed
              number_of_pages: '',  // Not available in LOC data
              source_details: bookInfo.source || '',
              notes: bookInfo.description || '',
              pdf: '',  // Not available in LOC data
              link: bookInfo.url || '',
              category: bookInfo.subjects ? bookInfo.subjects.join(', ') : '',
            };

            console.log(this.bookData)

            // Send the book data to the backend
            /* this.locLibraryService.sendBookDataToBackend(this.bookData).subscribe(
              (result) => {
                console.log('Book data sent successfully!', result);
              },
              (error) => {
                console.error('Error sending book data to the backend', error);
              }
            ); */
          }
        },
        (error) => {
          console.error('Error fetching book data from Library of Congress API', error);
        }
      );
    }
  }
}
export var single = [
  {
    "name": "Category 1",
    "value": 120
  },
  {
    "name": "Category 2",
    "value": 200
  },
  {
    "name": "Category 3",
    "value": 150
  },
  {
    "name": "Category 4",
    "value": 180
  },
];
