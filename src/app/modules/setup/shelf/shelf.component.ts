import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Department } from 'src/app/main/models/Department';
import { Shelf } from 'src/app/main/models/Shelf';
import { HTTPService } from 'src/app/main/services/HTTPService';
import { ShelfModalComponent } from '../shelf-modal/shelf-modal.component';
import { URLLoader } from 'src/app/main/configs/URLLoader';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';


@Component({
    selector: 'app-shelf',
    templateUrl: './shelf.component.html',
    styleUrls: ['./shelf.component.css'] // Adjust path as necessary
    ,
    standalone: false
})
export class ShelfComponent implements OnInit {

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
    { name: 'Shelf Name', prop: 'shelfName', visible: true },
    { name: 'Shelf Code', prop: 'shelfCode', visible: true },
    { name: 'Location', prop: 'location', visible: true },
    { name: 'Capacity', prop: 'capacity', visible: true },
    { name: 'Material', prop: 'material', visible: true },
    { name: 'Color', prop: 'color', visible: true },
    { name: 'Department', prop: 'department.departmentName', visible: true },
    { name: 'Actions', prop: 'actions', visible: true }
  ];

  loadingIndicator = true;
  shelves$: BehaviorSubject<Shelf[]> = new BehaviorSubject<Shelf[]>([]);
  shelves: Shelf[] = [];
  temp: Shelf[] = [];
  selected = [];
  markdownContent: string;
  departments: Department[] = [];
  errors: {};

  constructor(private toastr: ToastrService,private shelfService: HTTPService, private modalService: NgbModal,private http: HttpClient) {
    this.temp = [...this.shelves];
  }

  ngOnInit(): void {
    this.loadShelves();
    this.fetchMarkdownFile()
  }

  updateFilter(event: any) {
    const val = event.target.value.toLowerCase();
    this.shelves = this.temp.filter(shelf => shelf.shelfName.toLowerCase().includes(val));
  }

  onSelect({ selected }: any) {
    this.selected = [...selected];
  }

  onActivate(event: any) {
  }

  editRow(row: Shelf): void {
    this.openEditDialog(row);
  }

  deleteRow(row: Shelf): void {
    this.shelves = this.shelves.filter(r => r !== row);
    this.shelves$.next(this.shelves);
    this.deleteShelf(row.id);
    this.toastr.success('Item removed successfully!', 'Success');
  }

  refreshData(): void {
    this.loadShelves();
  }

  loadShelves(): void {
    this.loadingIndicator = true;
    this.shelfService.getAllShelves().subscribe(data => {
      this.shelves = data;
      this.temp = [...data];
      this.loadingIndicator = false;
    });
  }

  openAddDialog(): void {
    const modalRef = this.modalService.open(ShelfModalComponent);
    modalRef.componentInstance.shelf = {} as Shelf;

    modalRef.result.then(result => {
      if (result) {
        //this.shelfService.createShelf(result).subscribe(() => {
          this.loadShelves();
        //});
      }
    }).catch(() => {});
  }

  openEditDialog(shelf: Shelf): void {
    const modalRef = this.modalService.open(ShelfModalComponent);
    modalRef.componentInstance.shelf = { ...shelf };

    modalRef.result.then(result => {
      if (result) {
        //this.shelfService.updateShelf(result.id, result).subscribe(() => {
          this.loadShelves();
        //});
      }
    }).catch(() => {});
  }

  deleteShelf(id: number): void {
    this.shelfService.deleteShelf(id).subscribe(() => {
      this.loadShelves();
    });
  }

  toggleColumn(columnName: string): void {
    const column = this.columns.find(col => col.prop === columnName || col.name === columnName);
    if (column) {
      column.visible = !column.visible;
    }
  }

  fetchMarkdownFile(): void {
    this.http.get('assets/documentation/modules/shelf.html', { responseType: 'text' })
      .subscribe(data => {
        this.markdownContent = data;
      });
  }

  
}
