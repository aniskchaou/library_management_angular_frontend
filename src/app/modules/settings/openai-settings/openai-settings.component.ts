import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { HTTPService } from 'src/app/main/services/HTTPService';
import CONFIG from 'src/app/main/urls/urls';

@Component({
    selector: 'app-openai-settings',
    templateUrl: './openai-settings.component.html',
    styleUrls: ['./openai-settings.component.css'],
    standalone: false
})
export class OpenaiSettingsComponent implements OnInit {

  openaiForm: UntypedFormGroup;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private fb: UntypedFormBuilder,
    private openaiService: HTTPService
  ) {
    this.openaiForm = this.fb.group({
      apiKey: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Fetch the OpenAI API key from the backend
    this.openaiService.getAll(CONFIG.URL_BASE+'/api/openai/properties').subscribe(
      (data: OpenAIProperties) => {
        this.openaiForm.patchValue(data);
      },
      (error) => {
        console.error('Error fetching OpenAI properties', error);
        this.errorMessage = 'Failed to load OpenAI properties';
      }
    );
  }

  onSubmit() {
    if (this.openaiForm.valid) {
      // Update OpenAI API key
      this.openaiService.create(CONFIG.URL_BASE+'/api/openai/properties',this.openaiForm.value).then(
        () => {
          this.successMessage = 'OpenAI API key updated successfully';
          this.errorMessage = '';
        },
        (error) => {
          console.error('Error updating OpenAI properties', error);
          this.errorMessage = 'Failed to update OpenAI properties';
          this.successMessage = '';
        }
      );
    }
  }

}


export interface OpenAIProperties {
  apiKey: string;
}