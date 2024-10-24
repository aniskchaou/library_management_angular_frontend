import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HTTPService } from 'src/app/main/services/HTTPService';
import CONFIG from 'src/app/main/urls/urls';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditPasswordComponent } from 'src/app/modules/shared/edit-password/edit-password.component';
import { UploadProfilePhotoComponent } from '../upload-profile-photo/upload-profile-photo.component';

@Component({
  selector: 'app-view-user-profile',
  templateUrl: './view-user-profile.component.html',
  styleUrls: ['./view-user-profile.component.css']
})
export class ViewUserProfileComponent implements OnInit {
  user;
  retrievedImage:any;

  constructor(private httpService:HTTPService,private modalService: NgbModal) { }

  ngOnInit(): void {
    this.retrievedImage=CONFIG.URL_BASE+'/users/get/' +sessionStorage.getItem('username') +'/'+sessionStorage.getItem('username')+'_profile.png';
    this.httpService
    .getAll(CONFIG.URL_BASE + '/users/username/'+sessionStorage.getItem('username'))
    .subscribe(
      (data) => {
        this.user = data;
      },
      (err: HttpErrorResponse) => {
        console.log(err)
      }
    );
  }

  onChangePassword(){
    const modalRef = this.modalService.open(EditPasswordComponent);
    modalRef.componentInstance.user =  this.user;

    modalRef.result.then(result => {
      if (result) {
       /*  this.departmentService.createDepartment(result).subscribe(() => {
          this.loadDepartments();
        }); */
      }
    }).catch(error => console.log(error));
  }

  onChangeProfilePhoto(){
    const modalRef = this.modalService.open(UploadProfilePhotoComponent);
    modalRef.componentInstance.user =  this.user;

    modalRef.result.then(result => {
      if (result) {
       /*  this.departmentService.createDepartment(result).subscribe(() => {
          this.loadDepartments();
        }); */
      }
    }).catch(error => console.log(error));
  }

 

}
export class User {
  id?: number; // Optional, since it's auto-generated

  username: string; // Required field

  password: string; // Required field

  email: string; // Required field

  firstName: string; // Required field

  lastName: string; // Required field

  roles: string[]; // Array to store user roles

  isActive: boolean; // Optional field

  phoneNumber: string; // Optional field

  address:string

  about:string
}
