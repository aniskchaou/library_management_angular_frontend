import { Injectable } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
@Injectable({
  providedIn: 'root',
})
export default class WriterValidation {
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
      name: new UntypedFormControl('', Validators.required),
      note: new UntypedFormControl('', Validators.required),
      dob: new UntypedFormControl('', Validators.required),
      died: new UntypedFormControl('', Validators.required),
      dod: new UntypedFormControl('', Validators.nullValidator), // Optional field, can be validated only if died is true
      bio: new UntypedFormControl('', Validators.required),
      publications: new UntypedFormControl('', Validators.required),
      awards: new UntypedFormControl('', Validators.required),
      refrences: new UntypedFormControl('', Validators.required)
    });
  }
}

