import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { URLLoader } from 'src/app/main/configs/URLLoader';
import { HTTPService } from 'src/app/main/services/HTTPService';
// removed: datatables.net (using ngx-datatable instead)
import { HttpClient } from '@angular/common/http';
import CONFIG from 'src/app/main/urls/urls';
import { BehaviorSubject } from 'rxjs';
import Category from 'src/app/main/models/Category';
import { ViewCategoryComponent } from '../view-category/view-category.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-category-list',
    templateUrl: './category-list.component.html',
    styleUrls: ['./category-list.component.css'],
    standalone: false
})
export class CategoryListComponent extends URLLoader implements OnInit, AfterViewInit {
  @Input() categories;
  @Input() categoryI18n;
  @Output() editEvent = new EventEmitter<string>();
  @Output() deleteEvent = new EventEmitter<string>();

  markdownContent: string;

  isActive = true;

  @Output() toggled = new EventEmitter<boolean>();

  columns = [
    { name: 'Category Name', prop: 'category_name', visible: true },
    { name: 'Slug', prop: 'slug', visible: true },
    { name: 'Published', prop: 'published', visible: true },
    { name: 'Items', prop: 'items', visible: true },
    { name: 'Actions', prop: 'actions', visible: true }
  ];

  loading = false;
  //markdownContent: string;
  categories$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
 // categories: any[] = [];

 selected = [];
// temp = [];
 
 loadingIndicator = true;
 reorderable = true;

 @Input() categoriesInput;

 constructor(private httpService: HTTPService,private modalService: NgbModal) {
   super();
   //this.temp = [...this.categories];
 }


/*   toggle(id,published) {
    published = !published;
    //this.toggled.emit(this.isActive);
    //this.httpService.update(CONFIG.URL_BASE+'/category/publish',{id:id,published:published})
  } */


   // Toggle published state
   toggle(id: string, published: boolean): void {
    published = !published;
    // Uncomment and implement HTTP update call if necessary
    // this.httpService.update(CONFIG.URL_BASE + '/category/publish', { id, published });
    this.toggled.emit(published);
  }

  // Dynamically toggle column visibility
  toggleColumn(columnName: string): void {
    const column = this.columns.find(col => col.prop === columnName || col.name === columnName);
    if (column) {
      column.visible = !column.visible;
    }
  }

  // Update table rows based on search/filter input
  updateFilter(event): void {
    const val = event.target.value.toLowerCase();
    const temp = this.categories.filter(d => d.category_name.toLowerCase().includes(val));
    this.categories = temp;
  }

  // Row selection
  onSelect({ selected }): void {
    this.selected = [...selected];
  }

  // Row activation event
  onActivate(event): void {
  }

  // Edit row logic
  editRow(row): void {
    this.editCategory(row);
  }

  openViewDialog(category: Category): void {
    const modalRef = this.modalService.open(ViewCategoryComponent, { size: 'xl', centered: true });
    modalRef.componentInstance.category = { ...category };
    modalRef.result.then(() => {}).catch(() => {});
  }

  // Delete row logic
  deleteRow(row): void {
    this.categories = this.categories.filter(r => r !== row);
    this.categories$.next(this.categories); // Update observable
    this.deleteCategory(row);
  }

  // Trigger edit event
  editCategory(value): void {
    this.editEvent.emit(value);
  }

  // Trigger delete event
  deleteCategory(value: string): void {
    this.deleteEvent.emit(value);
  }

  // Refresh categories
/*   refreshData(): void {
    this.loadCategories();
  }
 */
  ngOnInit(): void {
    this.loadScripts();
  }

  ngAfterViewInit(): void {
   // this.initDataTable('dt_cat')
  }

  edit(obj) {
    this.editCategory(obj);
  }

  delete(id) {
    this.deleteCategory(id);
  }

  getRandomColor(): string {
    // const letters = '0123456789ABCDEF';
    // let color = '#';
    // for (let i = 0; i < 6; i++) {
    //   color += letters[Math.floor(Math.random() * 16)];
    // }
    return 'grey';
  }

/*   editCategory(value: string) {
    this.editEvent.emit(value);
  }

  deleteCategory(value) {
    this.deleteEvent.emit(value);
  }
 */


}
