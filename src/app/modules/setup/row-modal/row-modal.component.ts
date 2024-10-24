import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Department } from 'src/app/main/models/Department';
import { Row } from 'src/app/main/models/Row';
import { Shelf } from 'src/app/main/models/Shelf';
import { HTTPService } from 'src/app/main/services/HTTPService';

@Component({
  selector: 'app-row-modal',
  templateUrl: './row-modal.component.html',
  styleUrls: ['./row-modal.component.css']
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

  constructor(public activeModal: NgbActiveModal,
              private rowService: HTTPService,
              private departmentService: HTTPService,
              private shelfService: HTTPService) {
    this.loadDepartments();
    this.loadShelves();
  }

  ngOnInit(): void {
   // console.log(this.row);
  }

  onSaveClick(): void {
    this.activeModal.close(this.row);
  }

  onCancelClick(): void {
    this.activeModal.dismiss();
  }

  saveRow(): void {
    //console.log(this.row)
    this.row.department = this.departments.find(item => item.id === this.row.department.id);
    this.row.shelf = this.shelves.find(item => item.id === this.row.shelf.id);
      console.log(this.row)
      this.rowService.createRow(this.row).subscribe(() => {
        this.activeModal.close(this.row);
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


}
