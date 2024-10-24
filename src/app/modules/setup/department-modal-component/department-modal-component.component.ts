import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Department } from 'src/app/main/models/Department';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DepartmentService } from 'src/app/main/services/departement.service';
import { URLLoader } from 'src/app/main/configs/URLLoader';
@Component({
  selector: 'app-department-modal-component',
  templateUrl: './department-modal-component.component.html',
  styleUrls: ['./department-modal-component.component.css']
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
  

  constructor(public activeModal: NgbActiveModal,private departmentService:DepartmentService) {super()}
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

  saveDepartment() {
    console.log(this.department)
      this.departmentService.createDepartment(this.department).subscribe(() => {
        this.activeModal.close(this.department);
      });
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



