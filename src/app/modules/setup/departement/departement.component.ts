import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Department } from 'src/app/main/models/Department';
import { DepartmentService } from 'src/app/main/services/departement.service';
import { DepartmentModalComponentComponent } from '../department-modal-component/department-modal-component.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { URLLoader } from 'src/app/main/configs/URLLoader';
import { finalize } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-departement',
  templateUrl: './departement.component.html',
  styleUrls: ['./departement.component.css']
})
export class DepartementComponent extends URLLoader implements OnInit {



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
    { name: 'Department Name', prop: 'departmentName', visible: true },
    { name: 'Department Code', prop: 'departmentCode', visible: true },
    { name: 'Head of Department', prop: 'headOfDepartment', visible: true },
    { name: 'Location', prop: 'location', visible: true },
    { name: 'Phone', prop: 'phone', visible: true },
    { name: 'Email', prop: 'email', visible: true },
    { name: 'Number of Employees', prop: 'numberOfEmployees', visible: true },
    { name: 'Actions', prop: 'actions', visible: true }
  ];

  loading=false

  toggleColumn(columnName: string): void {
    const column = this.columns.find(col => col.prop === columnName || col.name === columnName);
    if (column) {
      column.visible = !column.visible;
    }
  }

  
  departments$: BehaviorSubject<Department[]> = new BehaviorSubject<Department[]>([]);
  markdownContent: string
  departments: Department[]=[];

  constructor(private toastr: ToastrService,private departmentService: DepartmentService, private modalService: NgbModal,private http:HttpClient) {super()
    this.temp = [...this.departments];
  }

    selected = [];
    temp = [];
  
    loadingIndicator = true;
    reorderable = true;

    updateFilter(event) {
      const val = event.target.value.toLowerCase();
      
      // Filter based on departmentName or any other relevant property
      const temp = this.temp.filter(d => d.departmentName.toLowerCase().includes(val));
    
      // Update the rows
      this.departments = temp;
    }
  
    onSelect({ selected }) {
      console.log('Selected row:', selected);
      this.selected = [...selected];
    }
  
    onActivate(event) {
      console.log('Activate Event:', event);
    }
  
    editRow(row: Department): void {
      // Logic to edit the row
      console.log('Edit row:', row);
      // Implement your edit logic here
      this.openEditDialog(row)
    }
    
    deleteRow(row: Department): void {
      // Logic to delete the row
      console.log('Delete row:', row);
      this.departments = this.departments.filter(r => r !== row);
      // If using departments$ as an observable, you should update it as well
      this.departments$.next(this.departments);
      this.deleteDepartment(row.id)
      this.toastr.success('Item removed successfully!', 'Success');

    }
    

  ngOnInit(): void {
   // setTimeout(() => { this.loadingIndicator = false; }, 1000);
    
    this.loadDepartments();
       // Fetch departments if not already loaded
      
    
    console.log(this.columns)
    this.fetchMarkdownFile()
  }

  
  refreshData(){
    this.loadDepartments()
  }
    loadDepartments(): void {
      this.loadingIndicator = true;
      this.departmentService.getAllDepartments().subscribe(data => {
        this.departments = data.reverse();
        this.temp = [...data.reverse()]; // Backup data for filtering
        this.loadingIndicator = false;
      });
    }

    fetchMarkdownFile(): void {
      this.http.get('assets/documentation/modules/departement.html', { responseType: 'text' })
        .subscribe(data => {
          console.log(data)
          this.markdownContent = data;
        });
    }  


  openAddDialog(): void {
    const modalRef = this.modalService.open(DepartmentModalComponentComponent);
    modalRef.componentInstance.department = {} as Department;

    modalRef.result.then(result => {

          this.loadDepartments();


    }).catch(error => console.log(error));
  }

  openEditDialog(department: Department): void {
    const modalRef = this.modalService.open(DepartmentModalComponentComponent);
    modalRef.componentInstance.department = { ...department };

    modalRef.result.then(result => {
  

          this.loadDepartments();


    }).catch(error => console.log(error));
  }

  deleteDepartment(id: number): void {
    this.departmentService.deleteDepartment(id).subscribe(() => {
      this.loadDepartments();
    });
    this.departments.filter(item=>item.id!==id)
  }

}
