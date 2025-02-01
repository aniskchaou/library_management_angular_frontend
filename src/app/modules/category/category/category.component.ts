import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { URLLoader } from 'src/app/main/configs/URLLoader';
import CategoryMessage from 'src/app/main/messages/CategoryMessage';
import Category from 'src/app/main/models/Category';
import { HTTPService } from 'src/app/main/services/HTTPService';
import CONFIG from 'src/app/main/urls/urls';
import { EditCategoryComponent } from '../edit-category/edit-category.component';
import { DataService } from 'src/app/main/services/data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent extends URLLoader implements OnInit {
  categorys$ = [];
  categoryI18n;
  id = 0;
  loading = false;
  addButton: string;
  listTitle: any;
   
  barChartData: ChartData[] = [];
  pieChartData: ChartData[] = [];
  lineChartData: LineChartData[] = [];
  doughnutChartData: ChartData[] = [];


  // Sample data for different charts
 /*  barChartData = [
    { "name": "Fiction", "value": 120 },
    { "name": "Non-fiction", "value": 150 },
    { "name": "Science", "value": 80 },
    { "name": "History", "value": 60 },
    { "name": "Biography", "value": 90 },
    { "name": "Fantasy", "value": 110 }
  ];

  pieChartData = [
    { "name": "Fiction", "value": 120 },
    { "name": "Non-fiction", "value": 150 },
    { "name": "Science", "value": 80 },
    { "name": "History", "value": 60 },
    { "name": "Biography", "value": 90 },
    { "name": "Fantasy", "value": 110 }
  ];

  lineChartData = [
    { 
      "name": "Borrow Rate",
      "series": [
        { "name": "Fiction", "value": 10 },
        { "name": "Non-fiction", "value": 15 },
        { "name": "Science", "value": 8 },
        { "name": "History", "value": 6 },
        { "name": "Biography", "value": 9 },
        { "name": "Fantasy", "value": 11 }
      ]
    }
  ];

  doughnutChartData = [
    { "name": "Fiction", "value": 5 },
    { "name": "Non-fiction", "value": 7 },
    { "name": "Science", "value": 4 },
    { "name": "History", "value": 3 },
    { "name": "Biography", "value": 4 },
    { "name": "Fantasy", "value": 6 }
  ]; */
  markdownContent: string



  constructor(
    private toastr: ToastrService,
    private messageService: CategoryMessage,
    private httpService: HTTPService,
    private router: Router,
    private http: HttpClient,
    private modalService: NgbModal,
    private dataService: DataService
  ) {
    super();
    this.fetchAllChartData()
  }


  edit(obj) {
    //console.log(id)
   // this.id = id;
    this.openEditDialog(obj)
  }

  delete(id) {
    console.log(id)
    var r = confirm('Do you want to delete this recording ?');
    if (r) {
      this.httpService.remove(CONFIG.URL_BASE + '/category/delete/' + id).then(()=>{
        this.toastr.success('Item removed successfully!', 'Success');
        this.reloadPage();

      });
      
    }
  }

  ngOnInit() {
    this.getAll();
    this.fetchMarkdownFile();
    
    this.httpService
      .getAll(CONFIG.URL_BASE + '/i18n/category/EN' )
      .subscribe(
        (data) => {
          this.categoryI18n = data;
        },
        (err: HttpErrorResponse) => {
          super.show('Error', err.message, 'warning');
        }
      );

      this.dataService.refreshData$.subscribe(() => {
        this.getAll();  // Trigger the getAll() method when notified
      });
      
  }

  getAll() {
    this.loading = true;
    this.httpService
      .getAll(CONFIG.URL_BASE + '/category/all')
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(
        (data: Category[]) => {
          this.categorys$ = data;
          this.loading = false;
        },
        (err: HttpErrorResponse) => {
          super.show('Error', err.message, 'warning');
        }
      );
  }

  reloadPage() {
    this.router
      .navigateByUrl('/dashboard', { skipLocationChange: true })
      .then(() => {
        this.router.navigate(['/category']);
      });
  }

  fetchMarkdownFile(): void {
    this.http.get('assets/documentation/modules/category.html', { responseType: 'text' })
      .subscribe(data => {
        console.log(data)
        this.markdownContent = data;
      });
  }

  openEditDialog(category: Category): void {
    const modalRef = this.modalService.open(EditCategoryComponent);
    modalRef.componentInstance.category = { ...category }; // Ensure category is passed properly
  
    console.log(category); // Ensure category is not undefined here

    modalRef.result.then(result => {
      console.log(result)
       this.getAll()
      
    }).catch(error => console.log(error));
  }

 




  fetchAllChartData(): void {
    this.httpService.getBarChartData().subscribe(
      data => {this.barChartData = data 
        console.log(data)},
      error => console.error('Error fetching bar chart data', error)
    );
    this.httpService.getPieChartData().subscribe(
      data => this.pieChartData = data,
      error => console.error('Error fetching pie chart data', error)
    );
    this.httpService.getLineChartData().subscribe(
      data => this.lineChartData = data,
      error => console.error('Error fetching line chart data', error)
    );
    this.httpService.getDoughnutChartData().subscribe(
      data => this.doughnutChartData = data,
      error => console.error('Error fetching doughnut chart data', error)
    );
  }
}

export interface ChartData {
  name: string;
  value: number;
}

export interface LineChartData {
  name: string;
  series: { name: string; value: number }[];
}



