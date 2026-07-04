import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
    standalone: false
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

  catalogItem:CatalogItem=new CatalogItem()
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
    private router: Router,
    private http: HttpClient,
    public toastr:ToastrService ,
    private catalogItemService:HTTPService
  ) {
    super();
    Object.assign(this, { single });
  }

  edit(id) {
    this.id = id;
  }

  filter(data) {
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
        this.markdownContent = data;
      });
  }

  isbn: string = '';
  bookData = null;

/*   // Method to handle form submission
  onSubmit() {
    if (this.isbn) {
      // Fetch book information from Google Books API
      this.httpService.getBookByISBN(this.isbn).subscribe(
        (response: any) => {
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

            
          }
        },
        (error) => {
          console.error('Error fetching book data from Google Books API', error);
        }
      );
    }
  } */



  onSubmitOpenLibrary() {
      // Fetch book information from Open Library API
      this.httpService.getBookByISBNOpenLibrary(this.isbn).subscribe(
        (response: any) => {
          if (response.docs && response.docs.length > 0) {
            const bookInfo = response.docs[0];

            // Map the book data to CatalogItem
            
             
            this.catalogItem.isbn= this.isbn,
            this.catalogItem.title= bookInfo.title || '',
            this.catalogItem.subtitle= bookInfo.subtitle || '',
            this.catalogItem.writer=null
            this.catalogItem.edition= bookInfo.edition_name || '',
            this.catalogItem.edition_year= bookInfo.first_publish_year?.toString() || '',
            this.catalogItem.number_of_books= '1',  // Default to 1
            this.catalogItem.photo= bookInfo.cover_i ? `https://covers.openlibrary.org/b/id/${bookInfo.cover_i}-L.jpg` : '',
            this.catalogItem.physical_form= '',  // Set as needed
            this.catalogItem.publisher= null,
            this.catalogItem.series= bookInfo.series || '',
            this.catalogItem.size= '',  // Set as needed
            this.catalogItem.price= '',  // Set as needed
            this.catalogItem.call_no= '',  // Set as needed
            this.catalogItem.location= '',  // Set as needed
            this.catalogItem.clue_page= '',  // Set as needed
            this.catalogItem.editor= '',  // Not available in Open Library API
            this.catalogItem.publishing_year= bookInfo.first_publish_year?.toString() || '',
            this.catalogItem.publication_place= '',  // Set as needed
            this.catalogItem.number_of_pages=bookInfo.number_of_pages_median?.toString() || '',
            this.catalogItem.source_details= '',  // Set as needed
            this.catalogItem.notes= bookInfo.notes || '',
            this.catalogItem.pdf= '',  // Not available in Open Library API
            this.catalogItem.link= `https://openlibrary.org${bookInfo.key}`,
            this.catalogItem.category= null;

            const bookDetails = `
            Title: ${bookInfo.title}
            Subtitle: ${bookInfo.subtitle}
            Author(s): ${bookInfo.writer}
            Publisher: ${bookInfo.publisher}
            Published Year: ${bookInfo.publishedDate}
            ISBN: ${bookInfo.isbn}
            Pages: ${bookInfo.pageCount}
          `;
          
          // Show a confirmation dialog
          const isConfirmed = window.confirm(`Are you sure to import data?\n\n${bookDetails}`);
          
          // Check if user clicked 'OK' (Confirm) or 'Cancel'
          if (isConfirmed) {
            // User clicked 'OK'
            this.catalogItemService.create(CONFIG.URL_BASE + '/book/create', this.catalogItem).then(() => {
             this.toastr.success('Book data imported successfully!', 'Success');
           
           });
          } else {
            // User clicked 'Cancel'
            this.toastr.error('Book data imported successfully!', 'Error');
          }

            // Send the book data to the backend
           /*  this.openLibraryService.sendBookDataToBackend(this.bookData).subscribe(
              (result) => {
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
          if (response.results && response.results.length > 0) {
            const bookInfo = response.results[0];
  
            this.catalogItem.isbn = this.isbn
            this.catalogItem.title= bookInfo.title || ''
            this.catalogItem.subtitle= '',  // No subtitle provided in LOC data
            this.catalogItem.writer=null
            this.catalogItem.edition= '',  // Not available in LOC data
            this.catalogItem.edition_year= bookInfo.date || '',
              this.catalogItem.number_of_books= '1',  // Default to 1
              this.catalogItem.photo= bookInfo.image_url || '',
              this.catalogItem.physical_form= '',  // Set as needed
              this.catalogItem.publisher= null
              this.catalogItem.series= '',  // Not available in LOC data
              this.catalogItem.size= '',  // Set as needed
              this.catalogItem.price= '',  // Set as needed
              this.catalogItem.call_no= bookInfo.call_number || '',
              this.catalogItem.location= bookInfo.location || '',
              this.catalogItem.clue_page= '',  // Not available in LOC data
              this.catalogItem.editor= '',  // Not available in LOC data
              this.catalogItem.publishing_year= bookInfo.date || '',
              this.catalogItem.publication_place= '',  // Set as needed
              this.catalogItem.number_of_pages= '',  // Not available in LOC data
              this.catalogItem.source_details= bookInfo.source || '',
              this.catalogItem.notes= bookInfo.description || '',
              this.catalogItem.pdf= '',  // Not available in LOC data
              this.catalogItem.link= bookInfo.url || '',
              this.catalogItem.category=null
            
              
              const bookDetails = `
              Title: ${bookInfo.title}
              Subtitle: ${bookInfo.subtitle}
              Author(s): ${bookInfo.writer}
              Publisher: ${bookInfo.publisher}
              Published Year: ${bookInfo.publishedDate}
              ISBN: ${bookInfo.isbn}
              Pages: ${bookInfo.pageCount}
            `;
            
            // Show a confirmation dialog
            const isConfirmed = window.confirm(`Are you sure to import data?\n\n${bookDetails}`);
            
            // Check if user clicked 'OK' (Confirm) or 'Cancel'
            if (isConfirmed) {
              // User clicked 'OK'
              this.catalogItemService.create(CONFIG.URL_BASE + '/book/create', this.catalogItem).then(() => {
               this.toastr.success('Book data imported successfully!', 'Success');
             
             });
            } else {
              // User clicked 'Cancel'
              this.toastr.error('Book data imported successfully!', 'Error');
            }
            

            // Send the book data to the backend
            /* this.locLibraryService.sendBookDataToBackend(this.bookData).subscribe(
              (result) => {
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

  
  saveCatalogItem(): void {
  
    
      // Fetch book data from Google Books API using the ISBN
      //const isbn = this.catalogItem.isbn="2-7654-1005-4";
      const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=isbn:${this.isbn}`;
  
      this.http.get(apiUrl).subscribe(
        (response: any) => {
          // Assuming the API response contains valid items, and we are using the first one
          const bookData = response.items ? response.items[0].volumeInfo : null;
  
          if (bookData) {
            // Map the API response data to the CatalogItem fields
            this.catalogItem.isbn=this.isbn
            this.catalogItem.title = bookData.title || '';
            this.catalogItem.subtitle = bookData.subtitle || '';
            this.catalogItem.edition = bookData.printType || ''; // You can use `printType` for edition if needed
            this.catalogItem.edition_year = bookData.publishedDate || '';
            this.catalogItem.number_of_books = '1'; // Default, adjust as necessary
            this.catalogItem.photo = ''; // No image provided in the example data; map if available
            this.catalogItem.physical_form = bookData.printType || ''; // Physical form from `printType`
            this.catalogItem.physical_description = bookData.description || ''; // Assuming description
            this.catalogItem.publisher = null; // Find publisher by name
            this.catalogItem.series = ''; // If available, you can map this
            this.catalogItem.size = ''; // Adjust based on available data
            this.catalogItem.price = '0'; // Default, adjust as necessary
            this.catalogItem.call_no = bookData.industryIdentifiers[1]?.identifier || ''; // ISBN-13
            this.catalogItem.location = ''; // Handle as necessary
            this.catalogItem.clue_page = ''; // Handle if needed
            this.catalogItem.editor = bookData.authors?.join(', ') || ''; // Join authors array
            this.catalogItem.publishing_year = bookData.publishedDate || '';
            this.catalogItem.publication_place = ''; // Handle if needed
            this.catalogItem.number_of_pages = bookData.pageCount?.toString() || '';
            this.catalogItem.source_details = bookData.infoLink || ''; // Link to book info
            this.catalogItem.notes = ''; // If needed
            this.catalogItem.pdf = ''; // If applicable, link to PDF
            this.catalogItem.link = bookData.infoLink || ''; // Info link to book page
  
            // Map other fields like mediaType, departement, etc.
           /*  this.catalogItem.mediaType = this.mediaTypes.find(x => x.id == this.catalogItem.mediaType?.id);
            this.catalogItem.departement = this.departments.find(x => x.id == this.catalogItem.departement.id);
            this.catalogItem.row = this.rows.find(x => x.id == this.catalogItem.row.id);
            this.catalogItem.writer = this.writers.find(x => x.id == this.catalogItem.writer.id);
            this.catalogItem.shelf = this.shelves.find(x => x.id == this.catalogItem.shelf.id);
            this.catalogItem.publisher = this.publishers.find(x => x.id == this.catalogItem.publisher.id);
            this.catalogItem.category = this.categories.find(x => x.id == this.catalogItem.category.id);
   */       

             // Show the imported book data in an alert
             const bookDetails = `
             Title: ${bookData.title}
             Subtitle: ${bookData.subtitle}
             Author(s): ${bookData.authors.join(', ')}
             Publisher: ${bookData.publisher}
             Published Year: ${bookData.publishedDate}
             ISBN: ${bookData.isbn}
             Pages: ${bookData.pageCount}
           `;
           
           // Show a confirmation dialog
           const isConfirmed = window.confirm(`Are you sure to import data?\n\n${bookDetails}`);
           
           // Check if user clicked 'OK' (Confirm) or 'Cancel'
           if (isConfirmed) {
             // User clicked 'OK'
             this.catalogItemService.create(CONFIG.URL_BASE + '/book/create', this.catalogItem).then(() => {
              this.toastr.success('Book data imported successfully!', 'Success');
            
            });
           } else {
             // User clicked 'Cancel'
             this.toastr.error('Book data imported successfully!', 'Error');
           }

            // Save the catalog item after mapping the data
            
          } else {
            console.error('No valid book data found in the API response.');
          }
        },
        (error) => {
          console.error('Error fetching book data:', error);
          // Handle error appropriately (show error message, etc.)
        }
      );
    
  }

  getPercent(value: number, data: any[]): number {
    if (!data?.length) return 0;
    const max = Math.max(...data.map(d => d.value || 0));
    return max > 0 ? Math.round((value / max) * 100) : 0;
  }

  getSeriesPercent(value: number, series: any[]): number {
    if (!series?.length) return 0;
    const max = Math.max(...series.map(p => p.value || 0));
    return max > 0 ? Math.round((value / max) * 100) : 0;
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
