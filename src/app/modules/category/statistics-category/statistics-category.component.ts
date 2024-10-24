import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import CatalogItem from 'src/app/main/models/Book';
import { HTTPService } from 'src/app/main/services/HTTPService';
import CONFIG from 'src/app/main/urls/urls';
import BookFilterValidation from 'src/app/main/validations/BookFilterValidation';
import { AddCategoryComponent } from '../add-category/add-category.component';

@Component({
  selector: 'app-statistics-category',
  templateUrl: './statistics-category.component.html',
  styleUrls: ['./statistics-category.component.css'],
})
export class StatisticsCategoryComponent implements OnInit {
  showsummary: boolean = false;
  showgraphic: boolean = false;
  showfilter: boolean = false;
  filterForm: FormGroup;
  submitted: boolean = false;
  @Output() result = new EventEmitter();
  @Input() categoryI18n;
  single: any[];
  multi: any[];
  data;
  view: any[] = [900, 350];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Categories';
  showYAxisLabel = true;
  yAxisLabel = 'Books';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'],
  };
  status: Object;
  count: Object;

  onSelect(event) {
    console.log(event);
  }
  constructor(
    private router: Router,
    private validation: BookFilterValidation,
    private httpService: HTTPService,
    private modalService: NgbModal
  ) {}

  showChart() {
    this.showsummary = !this.showsummary;
    this.httpService
      .getAll(CONFIG.URL_BASE + '/analytics/bookbycategory/')
      .subscribe(
        (data) => {
          this.data = data;
        },
        (err: HttpErrorResponse) => {}
      );
  }

  ngOnInit(): void {
    this.httpService
      .getAll(CONFIG.URL_BASE + '/analytics/bookbycategory/')
      .subscribe(
        (data) => {
          this.data = data;
        },
        (err: HttpErrorResponse) => {}
      );

    this.httpService
      .getAll(
        CONFIG.URL_BASE + '/i18n/category/EN'
      )
      .subscribe(
        (data) => {
          this.categoryI18n = data;
        },
        (err: HttpErrorResponse) => {}
      );





      this.httpService
      .getAll(CONFIG.URL_BASE + '/category/count')
      .subscribe(
        (data) => {
          this.count = data;
        },
        (err: HttpErrorResponse) => {}
      );


      this.httpService
      .getAll(CONFIG.URL_BASE + '/category/status-count')
      .subscribe(
        (data) => {
          this.status = data;
        },
        (err: HttpErrorResponse) => {}
      );
  }

  reloadPage() {
    this.router
      .navigateByUrl('/dashboard', { skipLocationChange: true })
      .then(() => {
        this.router.navigate(['/category']);
      });
  }

  openAddDialog(): void {
    const modalRef = this.modalService.open(AddCategoryComponent);
    //modalRef.componentInstance.category = { ...category }; // Ensure category is passed properly
  
    //console.log(category); // Ensure category is not undefined here

    modalRef.result.then(result => {
      console.log(result)
       //this.getAll()
      
    }).catch(error => console.log(error));
  }
}
