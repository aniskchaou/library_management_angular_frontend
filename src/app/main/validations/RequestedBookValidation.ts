import { Injectable } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
@Injectable({
  providedIn: 'root',
})
export default class RequestedBookValidation {
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
      book: new UntypedFormControl('', Validators.required),
      writer: new UntypedFormControl('', Validators.required),
      ctagory: new UntypedFormControl('', Validators.required),
      member: new UntypedFormControl('', Validators.required),
    });
  }
}
