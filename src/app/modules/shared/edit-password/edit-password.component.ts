import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { HTTPService } from 'src/app/main/services/HTTPService';
import CONFIG from 'src/app/main/urls/urls';

@Component({
  selector: 'app-edit-password',
  templateUrl: './edit-password.component.html',
  styleUrls: ['./edit-password.component.css']
})
export class EditPasswordComponent implements OnInit {
   @Input()
   user
  changePasswordForm: FormGroup;
  passwordChangedSuccess = false;

  constructor(private fb: FormBuilder,private httpService:HTTPService,private activeModal: NgbActiveModal,private toastr: ToastrService) {
    this.changePasswordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmNewPassword: ['', [Validators.required]]
    }, { validator: this.passwordsMatch });
  }

  
closeModal(): void {
    this.activeModal.dismiss(); // Close the modal using NgbActiveModal
  }

  ngOnInit(): void {
    //throw new Error('Method not implemented.');
  }

  // Validator to ensure new password and confirm new password match
  passwordsMatch(group: FormGroup) {
    const newPassword = group.get('newPassword')?.value;
    const confirmNewPassword = group.get('confirmNewPassword')?.value;
    return newPassword === confirmNewPassword ? null : { notMatching: true };
  }

  // Submit the form
  onSubmit() {
    if (this.changePasswordForm.valid) {
      const { currentPassword, newPassword } = this.changePasswordForm.value;
      console.log('Current Password:', currentPassword);
      console.log('New Password:', newPassword);

      const requestBody = {
        currentPassword,
        newPassword,
        confirmNewPassword: newPassword, // Optional if the backend requires confirmation
      };
      
      this.httpService.create(CONFIG.URL_BASE+'/users/'+this.user.id+'/change-password',requestBody).then(()=>{
        this.passwordChangedSuccess = true;
        this.toastr.success('Password had been changed successfully.')
      })
      // Call the backend API to change the password
      // Example:
      // this.authService.changePassword(currentPassword, newPassword).subscribe(response => {
      //   this.passwordChangedSuccess = true;
      // }, error => {
      //   console.log('Error changing password', error);
      // });

      // Simulate successful password change
      this.passwordChangedSuccess = true;
      this.changePasswordForm.reset();
    }
  }

}
