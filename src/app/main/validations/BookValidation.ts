import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Injectable({
  providedIn: 'root',
})
export default class BookValidation {
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
      title: new FormControl('', Validators.required),
      writer: new FormControl('', Validators.required),
      edition: new FormControl('', Validators.required),
      edition_year: new FormControl('', Validators.required),
      publisher: new FormControl('', Validators.required),
      publishing_year: new FormControl('', Validators.required),
      publication_place: new FormControl('', Validators.required),
      number_of_pages: new FormControl('', Validators.required),
      notes: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      //pdf: new FormControl('', Validators.required),
      // link: new FormControl('', Validators.required),
    });
  }
}
