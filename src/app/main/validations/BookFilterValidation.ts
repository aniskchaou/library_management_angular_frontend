import { Injectable } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
@Injectable({
  providedIn: 'root',
})
export default class BookFilterValidation {
  formGroup: UntypedFormGroup;

  public get formGroupInstance(): UntypedFormGroup {
    return this.formGroup;
  }

  constructor() {
    this.formGroup = this.createFormGroup();
  }

  public checkValidation() {
    if (this.formGroup.invalid) {
      return false;
    }
    return true;
  }
  createFormGroup() {
    return new UntypedFormGroup({
      edition_year: new UntypedFormControl(''),
      publishing_year: new UntypedFormControl(''),
      publishing_place: new UntypedFormControl(''),
      number_of_pages: new UntypedFormControl(''),
      //pdf: new FormControl('', Validators.required),
      // link: new FormControl('', Validators.required),
    });
  }
}
