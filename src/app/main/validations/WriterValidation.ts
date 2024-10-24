import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Injectable({
  providedIn: 'root',
})
export default class WriterValidation {
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
      name: new FormControl('', Validators.required),
      note: new FormControl('', Validators.required),
      dob: new FormControl('', Validators.required),
      died: new FormControl('', Validators.required),
      dod: new FormControl('', Validators.nullValidator), // Optional field, can be validated only if died is true
      bio: new FormControl('', Validators.required),
      publications: new FormControl('', Validators.required),
      awards: new FormControl('', Validators.required),
      refrences: new FormControl('', Validators.required)
    });
  }
}

