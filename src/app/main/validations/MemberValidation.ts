
import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Injectable({
    providedIn: 'root'
})
export default class MemberValidation {
    formGroup: FormGroup;

    public get formGroupInstance(): FormGroup {
        return this.formGroup;
    }

    constructor() {
        this.formGroup = this.createFormGroup()
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
            user_type: new FormControl('', Validators.required),
            type_id: new FormControl('', Validators.required),
            email: new FormControl('', Validators.required),
            mobile: new FormControl('', Validators.required),
            password: new FormControl('', Validators.required),
            address: new FormControl('', Validators.required),
            status: new FormControl('', Validators.required),

        })
    }
}
