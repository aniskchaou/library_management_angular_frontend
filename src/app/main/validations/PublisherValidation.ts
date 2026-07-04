import { Injectable } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
@Injectable({
  providedIn: 'root',
})
export default class PublisherValidation {
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
      address: new UntypedFormControl('', Validators.required),
      email: new UntypedFormControl('', [Validators.required, Validators.email]),
      phone: new UntypedFormControl('', Validators.required),
      country: new UntypedFormControl('', Validators.required),
      website: new UntypedFormControl('', [
        Validators.required,
        //Validators.pattern('https?://.+')
      ])
    });
  }
}
