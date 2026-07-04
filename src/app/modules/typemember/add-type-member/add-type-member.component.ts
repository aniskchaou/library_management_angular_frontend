import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { URLLoader } from 'src/app/main/configs/URLLoader';
import TypeMemberMessage from 'src/app/main/messages/TypeMemberMessage';
import MemberTypeTestService from 'src/app/main/mocks/MemberTypeTestService';
import { HTTPService } from 'src/app/main/services/HTTPService';
import CONFIG from 'src/app/main/urls/urls';
import TypeMemberValidation from 'src/app/main/validations/TypeMemberValidation';

@Component({
    selector: 'app-add-type-member',
    templateUrl: './add-type-member.component.html',
    styleUrls: ['./add-type-member.component.css'],
    standalone: false
})
export class AddTypeMemberComponent extends URLLoader implements OnInit {
  typeMemberForm: UntypedFormGroup;
  msg: TypeMemberMessage;
  submitted = false;
  @Output() closeModalEvent = new EventEmitter<string>();
  typeMemberI18n;

/*   closeModal() {
    this.closeModalEvent.emit();
  } */

  goBack() {
    this.router
      .navigateByUrl('/dashboard', { skipLocationChange: true })
      .then(() => {
        this.router.navigate(['/type-member']);
      });
  }

  get f() {
    return this.typeMemberForm.controls;
  }

  constructor(
    private toastr: ToastrService,
    private validation: TypeMemberValidation,
    private message: TypeMemberMessage,
    private typeMemberTestService: MemberTypeTestService,
    private router: Router,
    private httpService: HTTPService,
    private activeModal: NgbActiveModal
  ) {
    super();
    this.typeMemberForm = this.validation.formGroupInstance;
    this.msg = this.message;
  }

  ngOnInit(): void {
    this.getTypeMemberByLang(CONFIG.getInstance().getLang());
  }

  reset() {
    this.typeMemberForm.reset();
  }

  add() {
    this.submitted = true;
    if (this.validateTypeMemberForm(this.typeMemberForm.value,this.submitted)) {
      this.httpService
        .create(
          CONFIG.URL_BASE + '/typemember/create',
          this.typeMemberForm.value
        )
        .finally(() => {
          this.reset();
          //this.goBack();
          super.show('Confirmation', this.msg.confirmationMessages.add, 'success');
          this.closeModal();
        });
      
    }
  }

  closeModal(): void {
    this.activeModal.dismiss(); // Close the modal using NgbActiveModal
  }


  getTypeMemberByLang(lang) {
     lang='EN'
    this.httpService
      .getAll(CONFIG.URL_BASE + '/i18n/typemember/' + lang)
      .subscribe(
        (data) => {
          this.typeMemberI18n = data;
        },
        (err: HttpErrorResponse) => {
          super.show('Error', err.message, 'error');
        }
      );
  }

  errors: any;

  

  validateTypeMemberForm(form: any, submitted: boolean): boolean {
    this.errors = {};
  
    // Validate Member Type Name
    if (!form.name || form.name.trim().length < 2) {
      this.errors.name = 'Member type name is required and must be at least 2 characters long.';
      this.toastr.error(this.errors.name, 'Validation Error');
    }
  
    // Validate Category Code
   /*  if (!form.categoryCode || form.categoryCode.trim().length === 0) {
      this.errors.categoryCode = 'Category code is required.';
      this.toastr.error(this.errors.categoryCode, 'Validation Error');
    } */
  
    // Validate Description
    /* if (!form.description) {
      this.errors.description = 'Description is required and must be at least 10 characters long.';
      this.toastr.error(this.errors.description, 'Validation Error');
    } */
  
    // Validate Upper Age Limit
    if (form.upperAgeLimit !== undefined && (form.upperAgeLimit <= 0 || isNaN(form.upperAgeLimit))) {
      this.errors.upperAgeLimit = 'Upper age limit must be a positive number.';
      this.toastr.error(this.errors.upperAgeLimit, 'Validation Error');
    }
  
    // Validate Enrollment Fee
    if (form.enrollmentFee !== undefined && (form.enrollmentFee < 0 || isNaN(form.enrollmentFee))) {
      this.errors.enrollmentFee = 'Enrollment fee must be a positive number.';
      this.toastr.error(this.errors.enrollmentFee, 'Validation Error');
    }
  
    // Validate Enrollment Period
   /*  if (!form.enrollmentPeriod || form.enrollmentPeriod.trim().length === 0) {
      this.errors.enrollmentPeriod = 'Enrollment period selection is required.';
      this.toastr.error(this.errors.enrollmentPeriod, 'Validation Error');
    } */
  
    // Validate Category Type
    /* if (!form.categoryType || form.categoryType.trim().length === 0) {
      this.errors.categoryType = 'Category type selection is required.';
      this.toastr.error(this.errors.categoryType, 'Validation Error');
    } */
  
    // Validate Minimum Password Length
    if (form.minPasswordLength !== undefined && (form.minPasswordLength < 1 || isNaN(form.minPasswordLength))) {
      this.errors.minPasswordLength = 'Minimum password length must be at least 1 character.';
      this.toastr.error(this.errors.minPasswordLength, 'Validation Error');
    }
  
    // All validations complete; return whether the form is valid
    return Object.keys(this.errors).length === 0;
  }
  
}
