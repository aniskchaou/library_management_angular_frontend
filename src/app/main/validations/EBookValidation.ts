import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Injectable({
  providedIn: 'root',
})
export default class EBookValidation {
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
      isbn: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      edition: new FormControl('', Validators.required),
      language: new FormControl('', Validators.required),
      author: new FormControl('', Validators.required),
    });
  }
}
