import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Optional, Output } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { URLLoader } from 'src/app/main/configs/URLLoader';
import BookMessage from 'src/app/main/messages/BookMessage';
import PublisherMessage from 'src/app/main/messages/PublisherMessage';
import { DataService } from 'src/app/main/services/data.service';
import { HTTPService } from 'src/app/main/services/HTTPService';
import CONFIG from 'src/app/main/urls/urls';
import PublisherValidation from 'src/app/main/validations/PublisherValidation';
declare var google: any;
@Component({
    selector: 'app-add-publisher',
    templateUrl: './add-publisher.component.html',
    styleUrls: ['./add-publisher.component.css'],
    standalone: false
})
export class AddPublisherComponent extends URLLoader implements OnInit {
  publisherForm: UntypedFormGroup;
  msg: PublisherMessage;
  submitted = false;
  @Output() closeModalEvent = new EventEmitter<string>();
  publisherI18n;
  countries = [];
  addressSuggestions = []; 

  constructor(
    private toastr: ToastrService,
    private validation: PublisherValidation,
    private message: PublisherMessage,
    private httpService: HTTPService,
    private router: Router,
    private dataService:DataService,
    @Optional() private activeModal: NgbActiveModal
  ) {
    super();
    this.publisherForm = this.validation.formGroupInstance;
    this.msg = this.message;
  }

  closeModal() {
    this.closeModalEvent.emit();
    if (this.activeModal) { this.activeModal.dismiss(); }
  }

  goBack() {
    this.router
      .navigateByUrl('/dashboard', { skipLocationChange: true })
      .then(() => {
        this.router.navigate(['/publisher']);
      });
  }

  get f() {
    return this.publisherForm.controls;
  }

  ngOnInit(): void {
    this.getPublisherByLang(CONFIG.getInstance().getLang());
    this.loadCountries();

    const autocomplete = new google.maps.places.Autocomplete(
      document.getElementById('addressInput') as HTMLInputElement,
      { types: ['geocode'] }
    );
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (place && place.formatted_address) {
        
        this.publisherForm.patchValue({
          address: place.formatted_address
        });
      }
    });
  }

  getPublisherByLang(lang) {
     lang='EN'
    this.httpService
      .getAll(CONFIG.URL_BASE + '/i18n/publisher/' + lang)
      .subscribe(
        (data) => {
          this.publisherI18n = data;
        },
        (err: HttpErrorResponse) => {
          super.show('Error', err.message, 'error');
        }
      );
  }

  reset() {
    this.publisherForm.reset();
  }

  add() {
    this.submitted = true;
    if (this.validatePublisherForm(this.publisherForm.value,true)) {
      this.httpService.create(
        CONFIG.URL_BASE + '/publisher/create',
        this.publisherForm.value
      ).finally(()=>{
        this.closeModal();
        this.goBack();
 this.toastr.success('Item added successfully!', 'Success');
        //super.show('Confirmation', this.msg.confirmationMessages.add, 'success');
        this.dataService.triggerRefresh()
      });
     
   }
  }


  // Method to load countries (example static data; you can replace it with an API call)
  loadCountries() {
    this.countries = [
      { code: 'US', name: 'United States' },
      { code: 'GB', name: 'United Kingdom' },
      { code: 'CA', name: 'Canada' },
      // Add more countries as needed
    ];
  }

  // Address input handling to fetch suggestions from the internet
  onAddressInput(value: string) {
    if (value.length > 0) { // Fetch suggestions if input length is 3 or more
      this.fetchAddressSuggestions(value);
    } else {
      this.addressSuggestions = [];
    }
  }

  // Example function to fetch address suggestions
  fetchAddressSuggestions(query: string) {
    // Replace this with an actual API call to fetch address suggestions
    this.httpService.get(`https://api.example.com/address?query=${query}`).subscribe((data: any) => {
      this.addressSuggestions = data.suggestions; // Process the API response
    });
  }

  // Method to select an address from suggestions
  selectAddress(suggestion: string) {
    this.publisherForm.patchValue({ address: suggestion });
    this.addressSuggestions = []; // Clear suggestions after selection
  }

 /*  initAutocomplete() {
    const input = document.getElementById('addressInput') as HTMLInputElement;
    const autocomplete = new google.maps.places.Autocomplete(input, {
      types: ['address']
    });

    // Listen to the place changed event to get address details
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      //window.alert("No details available for input: '" + place.name + "'");
      if (!place.geometry) {
        window.alert("No details available for input: '" + place.name + "'");
        return;
      }

      // Update the form control with the selected address
      this.publisherForm.patchValue({
        address: place.formatted_address
      });
    }); 
  }*/

    errors: any;

validatePublisherForm(form: any, submitted: boolean): boolean {
  this.errors = {};

  // Validate Publisher Name
  if (!form.name || form.name.trim().length < 2) {
    this.errors.name = 'Publisher Name is required and must be at least 2 characters long.';
    this.toastr.error(this.errors.name, 'Validation Error');
  }

  // Validate Address
  if (!form.address || form.address.trim().length < 5) {
    this.errors.address = 'Address is required and must be at least 5 characters long.';
    this.toastr.error(this.errors.address, 'Validation Error');
  }

  // Validate Email
  if (!form.email || !this.isValidEmail(form.email)) {
    this.errors.email = 'A valid email is required.';
    this.toastr.error(this.errors.email, 'Validation Error');
  }

  // Validate Phone
  if (!form.phone || form.phone.trim().length < 10) {
    this.errors.phone = 'Phone number is required and must be at least 10 characters long.';
    this.toastr.error(this.errors.phone, 'Validation Error');
  }

  // Validate Country
  if (!form.country) {
    this.errors.country = 'Country is required.';
    this.toastr.error(this.errors.country, 'Validation Error');
  }

  // Validate Website (Optional but must be a valid URL if provided)
  if (form.website && !this.isValidUrl(form.website)) {
    this.errors.website = 'Please enter a valid URL for the website.';
    this.toastr.error(this.errors.website, 'Validation Error');
  }

  // Return whether the form is valid
  return Object.keys(this.errors).length === 0;
}

isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

isValidUrl(url: string): boolean {
  const urlRegex = /^(https?:\/\/)?([\w\d\-]+\.)+\w{2,}(\/.*)?$/;
  return urlRegex.test(url);
}

}
