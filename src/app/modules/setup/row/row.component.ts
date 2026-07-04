import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Row } from 'src/app/main/models/Row';
import { Department } from 'src/app/main/models/Department';
import { Shelf } from 'src/app/main/models/Shelf';
import { HTTPService } from 'src/app/main/services/HTTPService';
import { RowModalComponent } from '../row-modal/row-modal.component';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';



@Component({
    selector: 'app-row',
    templateUrl: './row.component.html',
    styleUrls: ['./row.component.css'],
    standalone: false
})
export class RowComponent implements OnInit {

  barChartData = [
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
  ];

  columns = [
    { name: 'Row Name', prop: 'rowName', visible: true },
    { name: 'Position', prop: 'position', visible: true },
   // { name: 'Shelf', prop: 'shelf.shelfName', visible: true },
    //{ name: 'Department', prop: 'department.departmentName', visible: true },
    { name: 'Actions', prop: 'actions', visible: true }
  ];

  rows$: BehaviorSubject<Row[]> = new BehaviorSubject<Row[]>([]);
  rows: Row[] = [];
  temp: Row[] = [];
  selectedRow: Row | null = null;
  departments: Department[] = [];
  shelves: Shelf[] = [];
  loadingIndicator = true;
  reorderable = true;
  markdownContent

  constructor(
    private toastr: ToastrService,
    private rowService: HTTPService,
    private modalService: NgbModal,
    private departmentService: HTTPService,
    private shelfService: HTTPService,
    private http:HttpClient
  ) {
    this.temp = [...this.rows];
    this.loadDepartments();
    this.loadShelves();
  }

  ngOnInit(): void {
    this.fetchMarkdownFile()
    this.loadRows();
  }

  loadRows(): void {
    this.loadingIndicator = true;
    this.rowService.getAllRows().subscribe(data => {
      this.rows = data;
      this.temp = [...data];
      //this.rows$.next(this.rows);
      this.loadingIndicator = false;
    });
  }

  loadDepartments(): void {
    this.departmentService.getAllDepartments().subscribe(data => {
      this.departments = data;
    });
  }

  loadShelves(): void {
    this.shelfService.getAllShelves().subscribe(data => {
      this.shelves = data;
    });
  }

  updateFilter(event: any): void {
    const val = event.target.value.toLowerCase();
    this.rows = this.temp.filter(row => row.rowName.toLowerCase().includes(val));
  }

  onSelect({ selected }: any): void {
  }

  onActivate(event: any): void {
  }

  openAddDialog(): void {
    const modalRef = this.modalService.open(RowModalComponent);
    modalRef.componentInstance.row = {} as Row;
    modalRef.componentInstance.departments = this.departments;
    modalRef.componentInstance.shelves = this.shelves;

    modalRef.result.then(result => {
      if (result) {
        this.rowService.createRow(result).subscribe(() => {
          this.loadRows();
        });
      }
    }).catch(() => {});
  }

  openEditDialog(row: Row): void {
    this.selectedRow = { ...row };
    const modalRef = this.modalService.open(RowModalComponent);
    modalRef.componentInstance.row = this.selectedRow;
    modalRef.componentInstance.departments = this.departments;
    modalRef.componentInstance.shelves = this.shelves;

    modalRef.result.then(result => {
      if (result) {
        this.rowService.updateRow(result.id, result).subscribe(() => {
          this.loadRows();
        });
      }
    }).catch(() => {});
  }

  deleteRow(row: Row): void {
    this.rows = this.rows.filter(r => r !== row);
    this.toastr.success('Item removed successfully!', 'Success');
    this.rowService.deleteRow(row.id).subscribe(() => {
      this.loadRows();
    });
  }

  refreshData(): void {
    this.loadRows();
  }

  toggleColumn(columnName: string): void {
    const column = this.columns.find(col => col.prop === columnName || col.name === columnName);
    if (column) {
      column.visible = !column.visible;
    }
  }

  fetchMarkdownFile(): void {
    this.http.get('assets/documentation/modules/row.html', { responseType: 'text' })
      .subscribe(data => {
        this.markdownContent = data;
      });
  }
}
