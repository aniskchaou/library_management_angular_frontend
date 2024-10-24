// src/app/services/department.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import CONFIG from '../urls/urls';
import { Department } from '../models/Department';
import { HTTPService } from './HTTPService';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
 
  constructor(private httpService: HTTPService) { }

  getAllDepartments(): Observable<Department[]> {
    return this.httpService.getAllDepartments();
  }

  getDepartmentById(id: number): Observable<Department> {
    return this.httpService.getDepartmentById(id);
  }

  createDepartment(department: Department): Observable<Department> {
    return this.httpService.createDepartment(department);
  }

  updateDepartment(id: number, department: Department): Observable<Department> {
    return this.httpService.updateDepartment(id, department);
  }

  deleteDepartment(id: number): Observable<void> {
    return this.httpService.deleteDepartment(id);
  }
}
