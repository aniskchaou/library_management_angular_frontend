import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
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

  constructor(public activeModal: NgbActiveModal,
    private shelfService:HTTPService, 
    private departmentService: HTTPService,) {
      this.loadDepartments()
    }
  ngOnInit(): void {
    console.log(this.shelf)
    
    
  }

  onSaveClick(): void {
    this.activeModal.close(this.shelf);
  }

  onCancelClick(): void {
    this.activeModal.dismiss();
  }

  saveShelf() {
    
    this.shelf.department = this.departments.find(item => item.id === this.shelf.department.id);
    console.log(this.shelf)
  
      this.shelfService.createShelf(this.shelf).subscribe(() => {
        this.activeModal.close(this.shelf);
      });
    
  }


  loadDepartments(): void {
    this.departmentService.getAllDepartments().subscribe((data: Department[]) => {
      this.departments = data;
    });
  }

}
