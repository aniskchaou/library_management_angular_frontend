import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { URLLoader } from 'src/app/main/configs/URLLoader';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css']
})
export class DepartmentListComponent extends URLLoader implements OnInit,AfterViewInit {
  @Input() departments=[]
 

  columns = {
    name: true,
    code: true,
    head: true,
    location: true,
    phone: true,
    email: true,
    employees: true,
    actions: true
  };

  constructor() { super()}

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.initDataTable('dt_dep')
  }

}
