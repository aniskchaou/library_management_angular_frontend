import { Injectable } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
@Injectable({
  providedIn: 'root',
})
export default class PaymentValidation {
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
      amount: new UntypedFormControl('', Validators.required),
      date: new UntypedFormControl('', Validators.required),
      note: new UntypedFormControl(''),
      paymentMethod: new UntypedFormControl('cash', Validators.required),
    });
  }
}
