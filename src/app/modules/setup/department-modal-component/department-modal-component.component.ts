import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Department } from 'src/app/main/models/Department';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DepartmentService } from 'src/app/main/services/departement.service';
import { URLLoader } from 'src/app/main/configs/URLLoader';
import { ToastrService } from 'ngx-toastr';
@Component({
    selector: 'app-department-modal-component',
    templateUrl: './department-modal-component.component.html',
    styleUrls: ['./department-modal-component.component.css'],
    standalone: false
})
export class DepartmentModalComponentComponent extends URLLoader implements OnInit,AfterViewInit {


  @Input() department: Department;
  countries = [];
   buildings = [
    { code: 'BLD_A', name: 'Building A' },
    { code: 'BLD_B', name: 'Building B' },
    { code: 'BLD_C', name: 'Building C' },
    { code: 'BLD_D', name: 'Building D' },
    { code: 'BLD_E', name: 'Building E' },
  ];
  
  

  constructor(private toastr: ToastrService,public activeModal: NgbActiveModal,private departmentService:DepartmentService) {super()}
  ngOnInit(): void {
    this.countries=this.getCountries()
    
  }
  ngAfterViewInit() {
    // Initialize Bootstrap tooltips
   
  }

  onSaveClick(): void {
    this.activeModal.close(this.department);
  }

  onCancelClick(): void {
    this.activeModal.dismiss();
  }

  errors: any = {};

  validateForm() {
    this.errors = {};

    // Validate Department Name
    if (!this.department.departmentName || this.department.departmentName.length < 2) {
      this.errors.departmentName = 'Department Name is required and must be at least 2 characters.';
      this.toastr.error(this.errors.departmentName, 'Validation Error');
    }

    // Validate Department Code
    const departmentCodePattern = /^[A-Za-z]{2,}[0-9]{1,}$/;
    if (!this.department.departmentCode || !departmentCodePattern.test(this.department.departmentCode)) {
      this.errors.departmentCode = 'Department Code is required and must follow the pattern (e.g., HR001, IT002).';
      this.toastr.error(this.errors.departmentCode, 'Validation Error');
    }

    // Validate Head of Department
    if (!this.department.headOfDepartment) {
      this.errors.headOfDepartment = 'Head of Department is required.';
      this.toastr.error(this.errors.headOfDepartment, 'Validation Error');
    }

    // Validate Phone
   /*  const phonePattern = /^\(\d{3}\) \d{3}-\d{4}$/;
    if (!this.department.phone || !phonePattern.test(this.department.phone)) {
      this.errors.phone = 'Phone number is required and must follow the format (123) 456-7890.';
      this.toastr.error(this.errors.phone, 'Validation Error');
    } */

    // Validate Email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!this.department.email || !emailPattern.test(this.department.email)) {
      this.errors.email = 'Email is required and must be a valid email address.';
      this.toastr.error(this.errors.email, 'Validation Error');
    }

    // Validate Number of Employees
    if (!this.department.numberOfEmployees || this.department.numberOfEmployees <= 0) {
      this.errors.numberOfEmployees = 'Number of Employees is required and must be greater than 0.';
      this.toastr.error(this.errors.numberOfEmployees, 'Validation Error');
    }

    return Object.keys(this.errors).length === 0;
  }


  saveDepartment() {
    if (this.validateForm()) {
      this.departmentService.createDepartment(this.department).subscribe(() => {
        this.activeModal.close(this.department);
        this.toastr.success('Item added successfully!', 'Success');
      });
    } else {
    }
      
    //this.onSaveClick()
  }


  getCountries() {
    return COUNTRY_DATA;
  }


  searchTerm: string = '';
  filteredDepartments: any[] = [];
  departments: any[] = [
    { id: 1, departmentName: 'HR', departmentCode: 'HR001', headOfDepartment: 'John Doe', location: 'New York', phone: '(123) 456-7890', countryCode: 'US', email: 'hr@example.com', numberOfEmployees: 50 },
    { id: 2, departmentName: 'IT', departmentCode: 'IT002', headOfDepartment: 'Jane Smith', location: 'London', phone: '(987) 654-3210', countryCode: 'GB', email: 'it@example.com', numberOfEmployees: 100 }
    // Add more departments as needed
  ];

  showSuggestions: boolean = false;
  //filteredDepartments: any[] = [];

  toggleSuggestions() {
    this.showSuggestions = !this.showSuggestions;
    if (this.showSuggestions) {
      this.generateSuggestions();
    }
  }

  generateSuggestions() {
    // Example logic for generating suggestions
    this.filteredDepartments = this.departments; // Just an example; adjust as needed
  }

  onSuggestionClick(suggestion: any) {
    // Fill the form with the selected suggestion's details
    this.department = { ...suggestion };
    this.showSuggestions = false; // Hide suggestions after selection
  }

}

export const COUNTRY_DATA = [
  { code: 'US', name: 'United States', flag: '🇺🇸', callingCode: '+1' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', callingCode: '+44' },
  { code: 'FR', name: 'France', flag: '🇫🇷', callingCode: '+33' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪', callingCode: '+49' },
  // Add more countries as needed
];



