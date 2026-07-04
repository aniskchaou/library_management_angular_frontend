import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Department } from 'src/app/main/models/Department';
import { Row } from 'src/app/main/models/Row';
import { Shelf } from 'src/app/main/models/Shelf';
import { HTTPService } from 'src/app/main/services/HTTPService';

@Component({
    selector: 'app-row-modal',
    templateUrl: './row-modal.component.html',
    styleUrls: ['./row-modal.component.css'],
    standalone: false
})
export class RowModalComponent implements OnInit {

  @Input() row: Row = {
    rowName: '',
    position: 0,
    department: null,
    shelf: null
  };;
  departments: Department[] = [];
  shelves: Shelf[] = [];

  constructor(private toastr: ToastrService,public activeModal: NgbActiveModal,
              private rowService: HTTPService,
              private departmentService: HTTPService,
              private shelfService: HTTPService) {
    this.loadDepartments();
    this.loadShelves();
  }

  ngOnInit(): void {
   //
  }

  onSaveClick(): void {
    this.activeModal.close(this.row);
  }

  onCancelClick(): void {
    this.activeModal.dismiss();
  }

  saveRow(): void {
    if( this.validateRowForm()){
    //
    this.row.department = this.departments.find(item => item.id === this.row.department.id);
    this.row.shelf = this.shelves.find(item => item.id === this.row.shelf.id);
      this.rowService.createRow(this.row).subscribe(() => {
        this.activeModal.close(this.row);
        
 this.toastr.success('Item added successfully!', 'Success');
      });
 
    }
    
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
   errors:any
  validateRowForm() {
    this.errors = {};
  
    // Validate Row Name
    if (!this.row.rowName || this.row.rowName.trim().length < 2) {
      this.errors.rowName = 'Row Name is required and must be at least 2 characters long.';
      this.toastr.error(this.errors.rowName, 'Validation Error');
    }
  
    // Validate Position
    if (!this.row.position || this.row.position <= 0) {
      this.errors.position = 'Position is required and must be a positive number.';
      this.toastr.error(this.errors.position, 'Validation Error');
    }
  
    // Validate Shelf
    if (!this.row.shelf || !this.row.shelf.shelfName) {
      this.errors.shelf = 'Shelf selection is required.';
      this.toastr.error(this.errors.shelf, 'Validation Error');
    }
  
    // Validate Department
    if (!this.row.department || !this.row.department.departmentName) {
      this.errors.department = 'Department selection is required.';
      this.toastr.error(this.errors.department, 'Validation Error');
    }
  
    return Object.keys(this.errors).length === 0;
  }
  


}
