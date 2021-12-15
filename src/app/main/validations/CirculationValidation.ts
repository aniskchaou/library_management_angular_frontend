import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Injectable({
  providedIn: 'root',
})
export default class CirculationValidation {
  formGroup: FormGroup;

  public get formGroupInstance(): FormGroup {
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
    return new FormGroup({
      memberName: new FormControl('', Validators.required),
      bookName: new FormControl('', Validators.required),
      writer: new FormControl('', Validators.required),
      issueDate: new FormControl('', Validators.required),
      lastDate: new FormControl('', Validators.required),
      toReturn: new FormControl('', Validators.required),
      returnDate: new FormControl('', Validators.required),
      penalty: new FormControl('', Validators.required),
      returnStatus: new FormControl('', Validators.required),
    });
  }
}
