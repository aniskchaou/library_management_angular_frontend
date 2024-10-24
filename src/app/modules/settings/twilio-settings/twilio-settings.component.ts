// twilio-settings.component.ts
import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HTTPService } from 'src/app/main/services/HTTPService';
import CONFIG from 'src/app/main/urls/urls';

@Component({
  selector: 'app-twilio-settings',
  templateUrl: './twilio-settings.component.html',
  styleUrls: ['./twilio-settings.component.css']
})
export class TwilioSettingsComponent implements OnInit {
  twilioForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private twilioService: HTTPService
  ) {
    this.twilioForm = this.fb.group({
      accountSid: ['', Validators.required],
      authToken: ['', Validators.required],
      phoneNumber: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // Fetch the current Twilio properties from the backend
    this.twilioService.getAll(CONFIG.URL_BASE+'/api/twilio/properties').subscribe(
      (data: TwilioProperties) => {
        this.twilioForm.patchValue(data);
      },
      (error) => {
        console.error('Error fetching Twilio properties', error);
        this.errorMessage = 'Failed to load Twilio properties';
      }
    );
  }

  onSubmit() {
    if (this.twilioForm.valid) {
      // Update Twilio properties
      this.twilioService.create(CONFIG.URL_BASE+'/api/twilio/properties',this.twilioForm.value).then(
        () => {
          //this.successMessage = response;
          this.errorMessage = '';
        },
        (error) => {
          console.error('Error updating Twilio properties', error);
          this.errorMessage = 'Failed to update Twilio properties';
          this.successMessage = '';
        }
      );
    }
  }
}

// twilio-properties.ts
export interface TwilioProperties {
  accountSid: string;
  authToken: string;
  phoneNumber: string;
}
