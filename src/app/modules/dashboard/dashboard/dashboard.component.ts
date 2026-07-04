import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { finalize } from 'rxjs/operators';
import { URLLoader } from 'src/app/main/configs/URLLoader';
import BookAnalytics from 'src/app/main/models/BookAnalytics';
import BookCategoryAnalytics from 'src/app/main/models/BookCategoryAnalytics';
import DashboardAnalytics from 'src/app/main/models/DashboardAnalytics';
import { AuthentificationService } from 'src/app/main/security/authentification.service';
import { HTTPService } from 'src/app/main/services/HTTPService';
import CONFIG from 'src/app/main/urls/urls';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
    standalone: false
})
export class DashboardComponent extends URLLoader implements OnInit {
  dashboardI18n;
  dashboardAnalytics;
  bookByAuthors: Object;
  bookByCategories: Object;
  expenses: Object;
  incomes: Object;
  loading = false;

  /** Angular Material palette-based color scheme for all ngx-charts */
  readonly materialColorScheme = {
    domain: ['#3f51b5', '#e91e63', '#009688', '#ff9800', '#2196f3', '#4caf50', '#9c27b0', '#ff5722', '#795548', '#607d8b']
  };

  /** Dashboard widgets — order and visibility persisted in localStorage */
  readonly WIDGET_STORAGE_KEY = 'll-dashboard-widgets';
  chartWidgets: { id: string; label: string; visible: boolean }[] = [
    { id: 'by-category',   label: 'Books by Category',              visible: true },
    { id: 'by-media',      label: 'Media Type Distribution',        visible: true },
    { id: 'members-city',  label: 'Members by City',                visible: true },
    { id: 'gender',        label: 'Gender Distribution',            visible: true },
    { id: 'media-items',   label: 'Media Items by Type',            visible: true },
    { id: 'media-genre',   label: 'Media by Genre',                 visible: true },
    { id: 'publications',  label: 'Publications by Authors',        visible: true },
    { id: 'member-type',   label: 'Circulations by Member Type',    visible: true },
  ];

  showDashboardSettings = false;

  private loadWidgetSettings(): void {
    try {
      const saved = localStorage.getItem(this.WIDGET_STORAGE_KEY);
      if (!saved) return;
      const parsed: { id: string; visible: boolean }[] = JSON.parse(saved);
      // Apply saved order and visibility
      const ordered: typeof this.chartWidgets = [];
      for (const s of parsed) {
        const w = this.chartWidgets.find(x => x.id === s.id);
        if (w) { w.visible = s.visible; ordered.push(w); }
      }
      // Append any new widgets not yet saved
      for (const w of this.chartWidgets) {
        if (!ordered.find(x => x.id === w.id)) ordered.push(w);
      }
      this.chartWidgets = ordered;
    } catch {}
  }

  saveWidgetSettings(): void {
    localStorage.setItem(this.WIDGET_STORAGE_KEY,
      JSON.stringify(this.chartWidgets.map(w => ({ id: w.id, visible: w.visible }))));
  }

  dropWidget(event: CdkDragDrop<typeof this.chartWidgets>): void {
    moveItemInArray(this.chartWidgets, event.previousIndex, event.currentIndex);
    this.saveWidgetSettings();
  }

  view1: any[] = [500, 380];
  view3: any[] = [500, 320];
  gradient: boolean = true;
  showLegend: boolean = false;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: string = 'below';
  view2: any[] = [1000, 400];
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Authors';
  xAxisLabelExpenses: string = 'Expenses';
  xAxisLabelIncomes: string = 'Incomes';
  yAxisLabelExpensesIncomes: string = 'Total ($)';
  showYAxisLabel: boolean = true;
  yAxisLabel: string = 'Books';
  legendTitle: string = 'Years';
   colorScheme = "'cool'"
  colorSchemeExpenses = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'],
  };
  colorSchemeIncomes = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'],
  };

  categories: Category[] = [];
  genderDistributionData;
  membersByCityData;
  mediaItemsByTypeData;
  mediaByGenreData;
  memberTypeData
  topBookSeries: any[];
  topCirculatingBooks: any[];
  mostPopularGenres: any[];
  topPublications: any[];
  topAuthors: any[];
    /*  = [
    { category: 'Fiction', items: 120 },
    { category: 'Non-Fiction', items: 80 },
    { category: 'Reference', items: 50 }
  ];   */
  constructor(
    private httpService: HTTPService,
    private router: Router,
    private authService: AuthentificationService
  ) {
    super();
    this.getCategories()
    this.getMediaTypes()
  }

    // Define custom view sizes for each chart
    viewCategory: any[] = [500, 380];
    viewMediaType: any[] = [500, 380];
    viewTrends: any[] = [500, 380];
    viewBorrowed: any[] = [500, 380];
    viewGauge: any[] = [500, 380]; // New gauge chart size
    viewSize: any[] = [500, 380];  // Gender distribution chart
  
   
    itemsByCategoryData: any[];
    itemsByMediaTypeData: any[];
    acquisitionTrendsData: any[];
    topBorrowedItemsData: any[];
    gaugeChartData: any[];
  
    // Define chart labels
    xAxisLabelCategory = 'Category';
    yAxisLabelCategory = 'Number of Items';
    xAxisLabelMediaType = 'Media Type';
    yAxisLabelMediaType = 'Count';
    xAxisLabelYear = 'Year';
    yAxisLabelItems = 'Number of Items';
    xAxisLabelBorrowCount = 'Borrow Count';
    yAxisLabelItem = 'Item';
  
    
  
    mediaTypes /* = [
      { type: 'Books', count: 150 },
      { type: 'DVDs', count: 40 },
      { type: 'eBooks', count: 60 }
    ]; */
  
    borrowCounts = [
      { item: 'Book 1', count: 45 },
      { item: 'Book 2', count: 30 },
      { item: 'DVD 1', count: 20 }
    ];
  
    gaugeData = [
      { name: 'Utilization', value: 75 }
    ];

    publicationsByPublisherData: any[];
    publisherByGenreData: any[];


    publishers = [
      { name: 'Publisher 1', publications: 1 },
      { name: 'Publisher 2', publications: 2 },
      { name: 'Publisher 3', publications: 5 }
    ];

    publicationTrendsByPublisherData: any[];
    topPublishersByBorrowCountData: any[];
  
    genres = [
      { genre: 'Fiction', count: 2 },
      { genre: 'Non-Fiction', count: 3 },
      { genre: 'Science', count: 4 }
    ];

    publicationsByAuthorsData;
    publicationsByGenreData: any[];
    publicationTrendsData: any[];
    topAuthorsByBorrowCountData: any[];
  
    authors = [
      { name: 'Author 1', publications: 10 },
      { name: 'Author 2', publications: 15 },
      { name: 'Author 3', publications: 8 }
    ];



  ngOnInit(): void {
    super.loadScripts();
    this.loadWidgetSettings();
    this.httpService.dashboardI18n$.subscribe((data) => {
      this.dashboardI18n = data;
    });

    this.getGenderData()
    this.getCityData()

    this.getBooksByAuthors();
    this.getBooksByCategories();
    this.getExpenses();
    this.getIncomes();
    this.getAnalyticsNumbers();

     // Fetch top authors
     this.httpService.getTopAuthors().subscribe((data: any[]) => {
      this.topAuthors = data.slice(0, 5);
    });
    
    // Fetch top publications
    this.httpService.getTopPublications().subscribe((data: any[]) => {
      this.topPublications = data.slice(0, 5);
    });
    
    // Fetch most popular genres
    this.httpService.getMostPopularGenres().subscribe((data: any[]) => {
      this.mostPopularGenres = data.slice(0, 5);
    });
    
    // Fetch top circulating books
    this.httpService.getTopCirculatingBooks().subscribe((data: any[]) => {
      this.topCirculatingBooks = data.slice(0, 5);
    });
    
    // Fetch top book series
    this.httpService.getTopBookSeries().subscribe((data: any[]) => {
      this.topBookSeries = data.slice(0, 5);
    });
    







    this.httpService.getCirculationsByMemberType().subscribe((data) => {
      this.memberTypeData = data;
    });

    this.httpService.getAll(CONFIG.URL_BASE + '/book/publications-by-authors').subscribe(
      (data: any[]) => {
        this.publicationsByAuthorsData = data;
      },
      (err: HttpErrorResponse) => {
        super.show('Error', err.message, 'warning');
      }
    );

    this.httpService.getAll(CONFIG.URL_BASE + '/book/publication-distribution-by-genre').subscribe(
      (data: any[]) => {
        this.publicationsByGenreData = data;
      },
      (err: HttpErrorResponse) => {
        super.show('Error', err.message, 'warning');
      }
    );

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
    this.getDashboardByLang(
      CONFIG.getInstance().getLang(),
      localStorage.getItem('username'),
      localStorage.getItem('password')
    );
    this.getMenuByLang(
      CONFIG.getInstance().getLang(),
      localStorage.getItem('username'),
      localStorage.getItem('password')
    );

    this.publicationsByPublisherData = this.publishers.map(publisher => ({
      name: publisher.name,
      value: publisher.publications
    }));

    // Publisher Distribution by Genre
    this.publisherByGenreData = this.genres.map(genre => ({
      name: genre.genre,
      value: genre.count
    }));

    this.publicationsByAuthorsData = this.authors.map(author => ({
      name: author.name,
      value: author.publications
    }));

    // Publication Distribution by Genre
    this.publicationsByGenreData = this.genres.map(genre => ({
      name: genre.genre,
      value: genre.count
    }));

    

      
  
      // Items Distribution by Media Type
     
  
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
      }));
  
      // Gauge Chart Data
      this.gaugeChartData = this.gaugeData.map(gauge => ({
        name: gauge.name,
        value: gauge.value
      }));
  }

  getGenderData(): void {
    this.httpService.getMembersByGender().subscribe(
      (data) => {
        this.genderDistributionData =data
      },
      (error) => {
        console.error('Error fetching gender data:', error);
      }
    );
  }

  getCityData(): void {
    this.httpService.getMembersByCity().subscribe(
      (data) => {
        this.membersByCityData = data
      },
      (error) => {
        console.error('Error fetching city data:', error);
      }
    );
  }

  getAnalyticsNumbers() {
    this.loading = true;
    this.httpService
      .getAll(CONFIG.URL_BASE + '/analytics/shortanalytics/')
      .subscribe(
        (data) => {
          this.dashboardAnalytics = data;
          this.loading = false;
        },
        (err: HttpErrorResponse) => {}
      );
  }
  getExpenses() {
    this.loading = true;
    this.httpService.getAll(CONFIG.URL_BASE + '/analytics/expenses/').subscribe(
      (data) => {
        this.expenses = data;
        this.loading = false;
      },
      (err: HttpErrorResponse) => {}
    );
  }

  getIncomes() {
    this.loading = true;
    this.httpService.getAll(CONFIG.URL_BASE + '/analytics/incomes/').subscribe(
      (data) => {
        this.incomes = data;
        this.loading = false;
      },
      (err: HttpErrorResponse) => {}
    );
  }

  getBooksByCategories() {
    this.loading = true;
    this.httpService
      .getAll(CONFIG.URL_BASE + '/analytics/bookbycategory/')
      .subscribe(
        (data) => {
          this.bookByCategories = data;
          this.loading = false;
        },
        (err: HttpErrorResponse) => {}
      );
  }

  getBooksByAuthors() {
    this.loading = true;
    this.httpService
      .getAll(CONFIG.URL_BASE + '/analytics/bookbyauthor/')
      .subscribe(
        (data) => {
          this.bookByAuthors = data;
          this.loading = false;
        },
        (err: HttpErrorResponse) => {}
      );
  }

  onSelect(data): void {

  }

  onActivate(data): void {

  }

  onDeactivate(data): void {

  }

  selectDay(event) {
  }
  addEvent(event) {}

  getDashboardByLang(lang, username, password) {
     lang='EN'
    this.httpService
      .getAllLang(
        CONFIG.URL_BASE + '/i18n/dashboard/' + lang,
        username,
        password
      )
      .subscribe(
        (data) => {
          this.httpService.dashboardI18n.next(data);
        },
        (err: HttpErrorResponse) => {
          super.show('Error', err.message, 'warning');
          //this.reload = true;
        }
      );
  }

  getMenuByLang(lang, username, password) {
     lang='EN'
    this.httpService
      .getAllLang(CONFIG.URL_BASE + '/i18n/menu/EN' , username, password)
      .subscribe(
        (data) => {
          this.httpService.menuI18n.next(data);
        },
        (err: HttpErrorResponse) => {
          super.show('Error', err.message, 'warning');
          //this.reload = true;
        }
      );
  }

  getCategories() {
    this.loading = true;
    this.httpService
      .getAll(CONFIG.URL_BASE + '/book/categories')  // Set the expected type here
      .subscribe(
        (data: Category[]) => {
          this.categories = data;  // Assign to this.categories which should be of type Category[]
          // Number of Items by Category
      this.itemsByCategoryData = this.categories.map(category => ({
        name: category.category,
        value: category.items
      }));
          this.loading = false;
        },
        (err: HttpErrorResponse) => {
          this.loading = false;
        }
      );
  }

  getMediaTypes() {
    this.loading = true;
    this.httpService
      .getAll(CONFIG.URL_BASE + '/book/types')  // Set the expected type here
      .subscribe(
        (data: MediaType[]) => {
          this.mediaTypes = data;  // Assign to this.mediaTypes which should be of type MediaType[]
          this.itemsByMediaTypeData = this.mediaTypes.map(type => ({
            name: type.type,
            value: type.count
          }));
          this.loading = false;
        },
        (err: HttpErrorResponse) => {
          this.loading = false;
        }
      );
  }
}

export interface Category {
  category: string;
  items: number;
}

export interface MediaType {
  type: string;
  count: number;
}
