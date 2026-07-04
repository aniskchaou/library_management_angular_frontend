
import { Injectable } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
@Injectable({
    providedIn: 'root'
})
export default class MemberValidation {
    formGroup: UntypedFormGroup;

    public get formGroupInstance(): UntypedFormGroup {
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
        return new UntypedFormGroup({

            name: new UntypedFormControl('', Validators.required),
            user_type: new UntypedFormControl('', Validators.required),
            type_id: new UntypedFormControl('', Validators.required),
            email: new UntypedFormControl('', Validators.required),
            mobile: new UntypedFormControl('', Validators.required),
            password: new UntypedFormControl('', Validators.required),
            address: new UntypedFormControl('', Validators.required),
            status: new UntypedFormControl('', Validators.required),

        })
    }
}
