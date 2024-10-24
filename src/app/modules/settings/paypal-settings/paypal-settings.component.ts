import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HTTPService } from 'src/app/main/services/HTTPService';
import CONFIG from 'src/app/main/urls/urls';

@Component({
  selector: 'app-paypal-settings',
  templateUrl: './paypal-settings.component.html',
  styleUrls: ['./paypal-settings.component.css']
})
export class PaypalSettingsComponent implements OnInit {

  paypalForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private paypalService: HTTPService
  ) {
    this.paypalForm = this.fb.group({
      clientId: ['', Validators.required],
      clientSecret: ['', Validators.required],
      mode: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // Fetch the current PayPal properties from the backend
    this.paypalService.getAll(CONFIG.URL_BASE + '/api/paypal/properties').subscribe(
      (data: PayPalProperties) => {
        this.paypalForm.patchValue(data);
      },
      (error) => {
        console.error('Error fetching PayPal properties', error);
        this.errorMessage = 'Failed to load PayPal properties';
      }
    );
  }

  onSubmit() {
    if (this.paypalForm.valid) {
      // Update PayPal properties
      this.paypalService.create(CONFIG.URL_BASE + '/api/paypal/properties', this.paypalForm.value).then(
        () => {
          this.errorMessage = '';
          this.successMessage = 'PayPal settings updated successfully';
        },
        (error) => {
          console.error('Error updating PayPal properties', error);
          this.errorMessage = 'Failed to update PayPal properties';
          this.successMessage = '';
        }
      );
    }
  }

}

// paypal-properties.ts
export interface PayPalProperties {
  clientId: string;
  clientSecret: string;
  mode: string; // Can be either 'sandbox' or 'live'
}
