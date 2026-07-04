import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import CONFIG from 'src/app/main/urls/urls';

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.css'],
    standalone: false
})
export class ResetPasswordComponent implements OnInit {

  resetPasswordForm: UntypedFormGroup;
    submitted = false;
    hideNew = true;
    hideConfirm = true;

    constructor(
        private formBuilder: UntypedFormBuilder,
        private http: HttpClient,
        private router: Router,
        private route: ActivatedRoute // Inject ActivatedRoute to access URL parameters
    ) {}

    ngOnInit(): void {
        // Initialize the reset password form with token field
        this.resetPasswordForm = this.formBuilder.group({
            token: ['', Validators.required], // Add token field
            newPassword: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', Validators.required]
        }, {
            validator: this.mustMatch('newPassword', 'confirmPassword')
        });
    }

    // Custom validator to check if new password and confirm password match
    mustMatch(controlName: string, matchingControlName: string) {
        return (formGroup: UntypedFormGroup) => {
            const control = formGroup.controls[controlName];
            const matchingControl = formGroup.controls[matchingControlName];

            if (matchingControl.errors && !matchingControl.errors.mustMatch) {
                return;
            }

            if (control.value !== matchingControl.value) {
                matchingControl.setErrors({ mustMatch: true });
            } else {
                matchingControl.setErrors(null);
            }
        };
    }

    // Getter for easy access to form fields
    get f() { return this.resetPasswordForm.controls; }

    onSubmit(): void {
        this.submitted = true;

        // Stop if the form is invalid
        if (this.resetPasswordForm.invalid) {
            return;
        }

        // Prepare the data to be sent to the backend
        const resetData = {
            token: this.resetPasswordForm.value.token, // Include the token from form
            newPassword: this.resetPasswordForm.value.newPassword
        };

        // Send the new password and token to the backend
        this.http.post('/api/reset-password', resetData).subscribe({
            next: (response) => {
                alert('Password reset successful!');
                this.router.navigate(['/login']);
            },
            error: (err) => {
                alert('An error occurred during password reset: ' + err.message);
            }
        });
    }
}
