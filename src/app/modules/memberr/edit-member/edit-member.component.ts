import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { URLLoader } from 'src/app/main/configs/URLLoader';
import MemberMessage from 'src/app/main/messages/MemberMessage';
import MemberTestService from 'src/app/main/mocks/MemberTestService';

import Member from 'src/app/main/models/Member';
import { HTTPService } from 'src/app/main/services/HTTPService';
import CONFIG from 'src/app/main/urls/urls';

@Component({
    selector: 'app-edit-member',
    templateUrl: './edit-member.component.html',
    styleUrls: ['./edit-member.component.css'],
    standalone: false
})
export class EditMemberComponent  implements OnInit {
 /*  model: Member = new Member(0, '', '', '', '', '', '', '', '',new Date(),'','');
  @Input() id: string;
  @Output() closeModalEvent = new EventEmitter<string>();
  memberI18n;

  closeModal() {
    this.closeModalEvent.emit();
  }

  constructor(
    private memberTestService: MemberTestService,
    private message: MemberMessage,
    private httpService: HTTPService,
    private router: Router
  ) {
    super();
    this.model = new Member(0, '', '', '', '', '', '', '', '',new Date(),'','');
  } */

 /*  ngOnInit(): void {
     this.memberTestService.ID.subscribe((idd) => {
      this.model = this.memberTestService.get(idd);
      if (this.model == undefined) {
        this.model = new Member(0, '', '', '', '', '', '', '', '');
      }
    });
    this.getMemberByLang(CONFIG.getInstance().getLang());
  }

  getMemberByLang(lang) {
    // this.appointements$ = this.appointmentTestService.getAll()
    this.httpService.getAll(CONFIG.URL_BASE + '/i18n/member/' + lang).subscribe(
      (data) => {
        this.memberI18n = data;
        //document.getElementById('table').DataTable().ajax.reload();
      },
      (err: HttpErrorResponse) => {
        super.show('Error', err.message, 'error');
      }
    );
  }

  ngOnChanges(changes: any) {
    this.httpService
      .get(CONFIG.URL_BASE + '/member/' + this.id)
      .subscribe((data: Member) => {
        this.model = data;
      });
  }

  edit() {
  

    this.httpService.create(CONFIG.URL_BASE + '/member/create', this.model);
    super.show(
      'Confirmation',
      this.message.confirmationMessages.edit,
      'success'
    );
    this.reloadPage();
    this.closeModal();
  }
  reloadPage() {
    this.router
      .navigateByUrl('/dashboard', { skipLocationChange: true })
      .then(() => {
        this.router.navigate(['/member']);
      });
  } */

      memberForm: UntypedFormGroup;
      member: Member;
    
      constructor(
        private toastr: ToastrService,
        private fb: UntypedFormBuilder,
        private route: ActivatedRoute,
        private memberService: HTTPService,
        private router: Router,
        private activeModal: NgbActiveModal
      ) {}
    
      ngOnInit(): void {
        //this.memberId = +this.route.snapshot.paramMap.get('id');
    
        this.memberForm = this.fb.group({
          surname: ['', Validators.required],
          firstname: ['', Validators.required],
          dob: ['', Validators.required],
          age: [{ value: '', disabled: true }],  // Auto-calculated, disabled in form
          gender: ['', Validators.required],
          street_number: [''],
          address: [''],
          city: [''],
          state: [''],
          zip: [''],
          country: [''],
          primary_phone: ['', Validators.required],
          secondary_phone: [''],
          primary_email: ['', [Validators.required, Validators.email]],
          secondary_email: ['', Validators.email],
          headOfDepartment: [''],
          salutation: ['Mr', Validators.required],
          bookingQuota: [0, Validators.required]
        });
    
        this.memberService.getAll(CONFIG.URL_BASE+'/member/'+this.member.id).subscribe((memberData:Member) => {
          //this.router.navigate(['/members']);
          this.memberForm.patchValue(memberData);
          this.calculateAge(memberData.dob.toDateString());
        });
      }
    
      // Method to calculate age and update the form control
      calculateAge(dob: string) {
        const today = new Date();
        const birthDate = new Date(dob);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        this.memberForm.get('age').setValue(`${age} years`);
      }
    
      // Form submit handler that constructs the member object and sends it
      onSubmit() {
        //if (this.memberForm.valid) {
          const member = this.buildMemberObject();
          // Submit the member object via service
          this.memberService.create(CONFIG.URL_BASE+'/member/create',member).then(() => {
            this.toastr.success('Item edited successfully!', 'Success');
            //this.router.navigate(['/members']);
            this.closeModal()
          });
        //}
      }
    

      
closeModal(): void {
    this.activeModal.dismiss(); // Close the modal using NgbActiveModal
  }

      // Construct the member object from the form values
      buildMemberObject() {
        const formValues = this.memberForm.getRawValue();  // Use getRawValue() to include disabled fields (like age)
        
        // Construct the member object from form values
        const member = {
          id:this.member.id,
          surname: formValues.surname,
          firstname: formValues.firstname,
          dob: formValues.dob,
          age: formValues.age,  // Optional field, since age is calculated
          gender: formValues.gender,
          street_number: formValues.street_number,
          address: formValues.address,
          city: formValues.city,
          state: formValues.state,
          zip: formValues.zip,
          country: formValues.country,
          primary_phone: formValues.primary_phone,
          secondary_phone: formValues.secondary_phone || null,  // Handle optional field
          primary_email: formValues.primary_email,
          secondary_email: formValues.secondary_email || null,  // Handle optional field
          headOfDepartment: formValues.headOfDepartment,
          salutation: formValues.salutation,
          bookingQuota: formValues.bookingQuota
        };
    
        return member;
      }
    
      onCancel() {
        this.closeModal()
      }
}
