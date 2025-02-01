import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { URLLoader } from 'src/app/main/configs/URLLoader';
import MemberMessage from 'src/app/main/messages/MemberMessage';
import MemberTestService from 'src/app/main/mocks/MemberTestService';
import { HTTPService } from 'src/app/main/services/HTTPService';
import CONFIG from 'src/app/main/urls/urls';
import MemberValidation from 'src/app/main/validations/MemberValidation';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.css'],
})
export class AddMemberComponent extends URLLoader implements OnInit {
  memberForm: FormGroup;
  msg: MemberMessage;
  submitted = false;
  @Output() closeModalEvent = new EventEmitter<string>();
  memberI18n;

  closeModal() {
    this.closeModalEvent.emit();
  }

  goBack() {
    /* this.router
      .navigateByUrl('/dashboard', { skipLocationChange: true })
      .then(() => {
        this.router.navigate(['/member']);
      }); */
  }

  get f() {
    return this.memberForm.controls;
  }

  /* constructor(
    private validation: MemberValidation,
    private message: MemberMessage,
    private router: Router,
    private httpService: HTTPService
  ) {
    super();
    this.memberForm = this.validation.formGroupInstance;
    this.msg = this.message;
  } */

  /* ngOnInit(): void {
    this.getMemberByLang(CONFIG.getInstance().getLang());
  } */

  reset() {
    this.memberForm.reset();
  }

  getMemberByLang(lang) {
     lang='EN'
    // this.appointements$ = this.appointmentTestService.getAll()
    this.httpService.getAll(CONFIG.URL_BASE + '/i18n/member/' + lang).subscribe(
      (data) => {
        this.memberI18n = data;
        console.log(this.memberI18n);
        //document.getElementById('table').DataTable().ajax.reload();
      },
      (err: HttpErrorResponse) => {
        super.show('Error', err.message, 'error');
      }
    );
  }

  add() {
    this.submitted = true;

    if (this.validateMemberForm(this.memberForm.value)) {
      // this.memberTestService.create(this.memberForm.value);
      this.httpService
        .create(CONFIG.URL_BASE + '/member/create', this.memberForm.value)
        .finally(() => {
          this.reset();
          this.closeModal();
          this.goBack();
          this.toastr.success('Item added successfully!', 'Success');
          /* super.show(
            'Confirmation',
            this.msg.confirmationMessages.add,
            'success'
          ); */
        });
      //super.show('Confirmation', this.msg.confirmationMessages.add, 'success');
    }
  }


  //memberForm: FormGroup;
  genderOptions= [];  // Dropdown options for gender
  contactMethodOptions= [];  // Dropdown options for contact methods

  constructor(private toastr: ToastrService,private fb: FormBuilder, private tooltipConfig: NgbTooltipConfig,private validation: MemberValidation,
    private message: MemberMessage,
    private router: Router,
    private httpService: HTTPService) {
      super()
    // Configure tooltips globally
    tooltipConfig.placement = 'right';
    tooltipConfig.triggers = 'hover';

    // Initialize the form group and form controls
    this.memberForm = this.fb.group({
      surname: ['', [Validators.required, Validators.maxLength(99)]],
      firstname: ['', [Validators.required, Validators.maxLength(99)]],
      dob: ['', Validators.required],
      age: [{ value: '21 years 4 months', disabled: true }],
      gender: ['', Validators.required],
      street_number: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
      country: ['', Validators.required],
      primary_phone: ['', Validators.required],
      secondary_phone: [''],
      primary_email: ['', [Validators.required, Validators.email]],
      secondary_email: ['', Validators.email],
      fax: [''],
      contact_method: ['', Validators.required],
      headOfDepartment: ['', Validators.required]  // New field for head of department
    });

    // Dropdown options for ng-select
    this.genderOptions = [
      { label: 'Female', value: 'Female' },
      { label: 'Male', value: 'Male' },
      { label: 'Other', value: 'Other' },
      { label: 'None specified', value: 'None specified' }
    ];

    this.contactMethodOptions = [
      { label: 'Phone', value: 'Phone' },
      { label: 'Email', value: 'Email' },
      { label: 'Mail', value: 'Mail' }
    ];
  }

  ngOnInit(): void {
    // Initialization code
  }

  onSubmit(): void {
    const formData = this.memberForm.value; // Get the form data
      console.log('Form Submitted', formData);
    //if (this.memberForm.valid) {
      const formDataa = this.memberForm.value; // Get the form data
      console.log('Form Submitted', formData);
      this.add()
      // You can send the form data to the server or handle it accordingly here
    //} else {
    //  console.log('Form is invalid');
    //}
  }

  onCancel(){}

  // Optionally, you can add a method to reset the form
  resetForm(): void {
    this.memberForm.reset({
      surname: '',
      firstname: '',
      dob: '',
      age: '21 years 4 months',
      gender: '',
      street_number: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      country: '',
      primary_phone: '',
      secondary_phone: '',
      primary_email: '',
      secondary_email: '',
      fax: '',
      contact_method: '',
      headOfDepartment: ''  // Reset head of department
    });
  }

  errors:any
  validateMemberForm(form: any): boolean {
    this.errors = {};
    this.submitted = true;

    // Validate Surname
    if (!form.surname || form.surname.trim().length < 2) {
      this.errors.surname = 'Surname is required and must be at least 2 characters long.';
      this.toastr.error(this.errors.surname, 'Validation Error');
    }

    // Validate First Name
    if (!form.firstname || form.firstname.trim().length < 2) {
      this.errors.firstname = 'First Name is required and must be at least 2 characters long.';
      this.toastr.error(this.errors.firstname, 'Validation Error');
    }

    // Validate Date of Birth
    if (!form.dob) {
      this.errors.dob = 'Date of Birth is required.';
      this.toastr.error(this.errors.dob, 'Validation Error');
    }

    // Validate Gender
    if (!form.gender) {
      this.errors.gender = 'Gender is required.';
      this.toastr.error(this.errors.gender, 'Validation Error');
    }

    // Validate Street Number
    if (!form.street_number || form.street_number.trim().length < 1) {
      this.errors.street_number = 'Street Number is required.';
      this.toastr.error(this.errors.street_number, 'Validation Error');
    }

    // Validate Address
    if (!form.address || form.address.trim().length < 5) {
      this.errors.address = 'Address is required and must be at least 5 characters long.';
      this.toastr.error(this.errors.address, 'Validation Error');
    }

    // Validate City
    if (!form.city || form.city.trim().length < 2) {
      this.errors.city = 'City is required and must be at least 2 characters long.';
      this.toastr.error(this.errors.city, 'Validation Error');
    }

    // Validate State
    if (!form.state || form.state.trim().length < 2) {
      this.errors.state = 'State is required and must be at least 2 characters long.';
      this.toastr.error(this.errors.state, 'Validation Error');
    }

    // Validate ZIP/Postal Code
    if (!form.zip || form.zip.trim().length < 5) {
      this.errors.zip = 'ZIP/Postal Code is required and must be at least 5 characters long.';
      this.toastr.error(this.errors.zip, 'Validation Error');
    }

    // Validate Country
    if (!form.country || form.country.trim().length < 2) {
      this.errors.country = 'Country is required and must be at least 2 characters long.';
      this.toastr.error(this.errors.country, 'Validation Error');
    }

    // Validate Primary Phone
    if (!form.primary_phone || form.primary_phone.trim().length < 10) {
      this.errors.primary_phone = 'Primary Phone is required and must be at least 10 characters long.';
      this.toastr.error(this.errors.primary_phone, 'Validation Error');
    }

    // Validate Primary Email
    if (!form.primary_email || !this.validateEmail(form.primary_email)) {
      this.errors.primary_email = 'A valid Primary Email is required.';
      this.toastr.error(this.errors.primary_email, 'Validation Error');
    }

    // Validate Salutation
   /*  if (!form.salutation) {
      this.errors.salutation = 'Salutation is required.';
      this.toastr.error(this.errors.salutation, 'Validation Error');
    } */

    // Validate Booking Quota
    if (form.bookingQuota === null || form.bookingQuota < 1) {
      this.errors.bookingQuota = 'Booking Quota is required and must be at least 1.';
      this.toastr.error(this.errors.bookingQuota, 'Validation Error');
    }

    return Object.keys(this.errors).length === 0;
  }

  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
