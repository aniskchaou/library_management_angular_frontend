import { Injectable } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
@Injectable({
  providedIn: 'root',
})
export default class CirculationValidation {
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
      memberName: new UntypedFormControl('', Validators.required),
      bookName: new UntypedFormControl('', Validators.required),
      writer: new UntypedFormControl('', Validators.required),
      issueDate: new UntypedFormControl('', Validators.required),
      lastDate: new UntypedFormControl('', Validators.required),
      toReturn: new UntypedFormControl('', Validators.required),
      returnDate: new UntypedFormControl('', Validators.required),
      penalty: new UntypedFormControl('', Validators.required),
      returnStatus: new UntypedFormControl('', Validators.required),
    });
  }
}
