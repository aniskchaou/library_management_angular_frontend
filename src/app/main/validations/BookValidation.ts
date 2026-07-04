import { Injectable } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
@Injectable({
  providedIn: 'root',
})
export default class BookValidation {
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
      title: new UntypedFormControl('', Validators.required),
      writer: new UntypedFormControl('', Validators.required),
      edition: new UntypedFormControl('', Validators.required),
      edition_year: new UntypedFormControl('', Validators.required),
      publisher: new UntypedFormControl('', Validators.required),
      publishing_year: new UntypedFormControl('', Validators.required),
      publication_place: new UntypedFormControl('', Validators.required),
      number_of_pages: new UntypedFormControl('', Validators.required),
      notes: new UntypedFormControl('', Validators.required),
      category: new UntypedFormControl('', Validators.required),
      //pdf: new FormControl('', Validators.required),
      // link: new FormControl('', Validators.required),
    });
  }
}
