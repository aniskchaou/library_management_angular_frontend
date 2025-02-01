import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Department } from 'src/app/main/models/Department';
import { Shelf } from 'src/app/main/models/Shelf';
import { DepartmentService } from 'src/app/main/services/departement.service';
import { HTTPService } from 'src/app/main/services/HTTPService';
import { ShelfService } from 'src/app/main/services/shelf.service';

@Component({
  selector: 'app-shelf-modal',
  templateUrl: './shelf-modal.component.html',
  styleUrls: ['./shelf-modal.component.css']
})
export class ShelfModalComponent implements OnInit {

  @Input() shelf: Shelf;

  departments: Department[] = [];

  constructor(private toastr: ToastrService,public activeModal: NgbActiveModal,
    private shelfService:HTTPService, 
    private departmentService: HTTPService,) {
      this.loadDepartments()
    }
  ngOnInit(): void {
    console.log(this.shelf)
    
    
  }

  materials = [
    { name: 'Wood', value: 'wood' },
    { name: 'Metal', value: 'metal' },
    { name: 'Plastic', value: 'plastic' }
  ];

  colors = [
    { name: 'Brown', value: 'brown' },
    { name: 'White', value: 'white' },
    { name: 'Black', value: 'black' },
    { name: 'Gray', value: 'gray' }
  ];

  onSaveClick(): void {
    this.activeModal.close(this.shelf);
  }

  onCancelClick(): void {
    this.activeModal.dismiss();
  }

  saveShelf() {
    
    
    console.log(this.shelf)
    if(this.validateShelfForm())
    {this.shelf.department = this.departments.find(item => item.id === this.shelf.department.id);
      this.shelfService.createShelf(this.shelf).subscribe(() => {
        this.activeModal.close(this.shelf);
        this.toastr.success('Item added successfully!', 'Success');
      });
    }
      
    
  }


  loadDepartments(): void {
    
    this.departmentService.getAllDepartments().subscribe((data: Department[]) => {
      this.departments = data;
    });
  }
  errors: any = {};


   
  
  validateShelfForm() {
    this.errors = {};
  
    // Validate Shelf Name
    if (!this.shelf.shelfName || this.shelf.shelfName.trim().length < 2) {
      this.errors.shelfName = 'Shelf Name is required and must be at least 2 characters.';
      this.toastr.error(this.errors.shelfName, 'Validation Error');
    }
  
    // Validate Shelf Code
    const shelfCodePattern = /^[A-Za-z0-9]{2,}$/;
    if (!this.shelf.shelfCode || !shelfCodePattern.test(this.shelf.shelfCode)) {
      this.errors.shelfCode = 'Shelf Code is required and must contain only letters and numbers.';
      this.toastr.error(this.errors.shelfCode, 'Validation Error');
    }
  
    // Validate Location
    if (!this.shelf.location || this.shelf.location.trim().length < 5) {
      this.errors.location = 'Location is required and must be at least 5 characters.';
      this.toastr.error(this.errors.location, 'Validation Error');
    }
  
    // Validate Capacity
    if (!this.shelf.capacity || this.shelf.capacity <= 0) {
      //this.errors.capacity = 'Capacity is required and must be a positive number.';
      this.toastr.error( 'Capacity is required and must be a positive number.', 'Validation Error');
    }
  
    // Validate Material
    if (!this.shelf.material || this.shelf.material.trim().length < 3) {
      this.errors.material = 'Material is required and must be at least 3 characters.';
      this.toastr.error(this.errors.material, 'Validation Error');
    }
  
    // Validate Color
    if (!this.shelf.color || this.shelf.color.trim().length < 3) {
      this.errors.color = 'Color is required and must be at least 3 characters.';
      this.toastr.error(this.errors.color, 'Validation Error');
    }
  
    // Validate Department
    /*  if (!this.shelf.department || !this.shelf.department.departmentName) {
      //this.errors.department.departmentName = 'Department selection is required.';
      this.toastr.error('Department selection is required.', 'Validation Error');
    } */
   
    return Object.keys(this.errors).length === 0;
  }

}
