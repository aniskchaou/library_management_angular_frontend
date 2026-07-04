import { Injectable } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
@Injectable({
  providedIn: 'root',
})
export default class EBookValidation {
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
      isbn: new UntypedFormControl('', Validators.required),
      name: new UntypedFormControl('', Validators.required),
      edition: new UntypedFormControl('', Validators.required),
      language: new UntypedFormControl('', Validators.required),
      author: new UntypedFormControl('', Validators.required),
    });
  }
}
