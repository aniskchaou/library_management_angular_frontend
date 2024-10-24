import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';
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

    //if (this.validation.checkValidation()) {
      // this.memberTestService.create(this.memberForm.value);
      this.httpService
        .create(CONFIG.URL_BASE + '/member/create', this.memberForm.value)
        .finally(() => {
          this.reset();
          this.closeModal();
          this.goBack();
          /* super.show(
            'Confirmation',
            this.msg.confirmationMessages.add,
            'success'
          ); */
        });
      //super.show('Confirmation', this.msg.confirmationMessages.add, 'success');
    //}
  }


  //memberForm: FormGroup;
  genderOptions= [];  // Dropdown options for gender
  contactMethodOptions= [];  // Dropdown options for contact methods

  constructor(private fb: FormBuilder, private tooltipConfig: NgbTooltipConfig,private validation: MemberValidation,
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
}
