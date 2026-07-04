import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import CONFIG from 'src/app/main/urls/urls';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.css'],
    standalone: false
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm: UntypedFormGroup;
  submitted = false;
  retrievedImage: string;

  constructor(private formBuilder: UntypedFormBuilder, private http: HttpClient, private router: Router,
    private toastr: ToastrService) {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get f() { return this.forgotPasswordForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.forgotPasswordForm.invalid) {
      return;
    }

    const email = this.forgotPasswordForm.value.email;

    // Send password reset request to backend
    this.http.post(CONFIG.URL_BASE+'/users/forgot-password', { email:email }).subscribe({
      next: () => {
        this.toastr.success('Password reset link has been sent to your email')
        //alert('Password reset link has been sent to your email');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.toastr.error('An error occurred while sending the password reset link')
        //alert('An error occurred while sending the password reset link');
      }
    });
  }

  ngOnInit(): void {
    this.retrievedImage=CONFIG.URL_BASE+'/version/get/logo';
  }

}
