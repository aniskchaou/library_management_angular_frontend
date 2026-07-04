import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { URLLoader } from 'src/app/main/configs/URLLoader';
import CONFIG from 'src/app/main/urls/urls';

@Component({
    selector: 'app-register-user',
    templateUrl: './register-user.component.html',
    styleUrls: ['./register-user.component.css'],
    standalone: false
})
export class RegisterUserComponent extends URLLoader implements OnInit {

  registerForm: UntypedFormGroup;
  submitted = false;
  hidePassword = true;
  hideConfirm = true;

  constructor(private router:Router,private formBuilder: UntypedFormBuilder, private http: HttpClient,private toastr: ToastrService) {
    super()
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      username: ['', Validators.required], // Add username here
      confirmPassword: ['', [Validators.required]],
      phoneNumber: [''] // Optional field
    }, {
      validator: this.mustMatch('password', 'confirmPassword') // Custom validator for password matching
    });
  }
  ngOnInit(): void {
   // throw new Error('Method not implemented.');
   this.loadScripts()
  }

  // Custom validator to check if password and confirm password fields match
  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: UntypedFormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  // Getter for easy access to form fields in the template
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    // Stop if the form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    // Send form data to the backend
    this.http.post(CONFIG.URL_BASE+'/users/', this.registerForm.value).subscribe({
      next: (response) => {
        //alert('Registration successful');
        // Redirect user to login or any other page
        this.toastr.success('Registration successful')
        this.router.navigate(['/login']);
      },
      error: (error) => {
        alert('Error occurred during registration');
      }
    });
  }

}
