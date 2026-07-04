import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { HTTPService } from 'src/app/main/services/HTTPService';
import CONFIG from 'src/app/main/urls/urls';

@Component({
    selector: 'app-renew',
    templateUrl: './renew.component.html',
    styleUrls: ['./renew.component.css'],
    standalone: false
})
export class RenewComponent implements OnInit {

  
  renewalForm: UntypedFormGroup;
  members$: any[] = [];
  books$: any[] = [];
  loading = false;
  submitted = false;

  constructor(private toastr: ToastrService,private fb: UntypedFormBuilder, private httpService: HTTPService,private activeModal: NgbActiveModal) {}

  
closeModal(): void {
    this.activeModal.dismiss(); // Close the modal using NgbActiveModal
  }
  ngOnInit() {
    this.renewalForm = this.fb.group({
      member: ['', Validators.required],
      itemBarcode: ['', Validators.required],
      renewalDueDate: ['', Validators.required],
      forgiveFines: ['', Validators.required],
    });

    this.getMembers();
    this.getBooks();
  }

  // Fetch members for the ng-select dropdown
  getMembers() {
    this.loading = true;
    this.httpService.getAll(CONFIG.URL_BASE +'/member/all').subscribe(
      (data: any[]) => {
        this.members$ = data;
        this.loading = false;
      },
      (err: HttpErrorResponse) => {
        this.loading = false;
        console.error('Error fetching members:', err.message);
      }
    );
  }

  // Fetch books for the ng-select dropdown
  getBooks() {
    this.loading = true;
    this.httpService.getAll(CONFIG.URL_BASE +'/book/all').subscribe(
      (data: any[]) => {
        this.books$ = data;
        this.loading = false;
      },
      (err: HttpErrorResponse) => {
        this.loading = false;
        console.error('Error fetching books:', err.message);
      }
    );
  }

  // Form submission for renewing an item
  renew() {
    this.submitted = true;

   /*  if (this.renewalForm.invalid) {
      return;  // If form is invalid, stop the process
    }
 */
    const formValue = this.renewalForm.value;

    // Get the selected member and book
    const selectedMember = this.members$.find(member => member.id == formValue.member);
    const selectedBook = this.books$.find(book => book.id == formValue.itemBarcode);

    const payload = {
      member: selectedMember,
      book: selectedBook,
      renewalDueDate: formValue.renewalDueDate,
      forgiveFines: formValue.forgiveFines === 'yes',
    };
    this.catalogItemId=formValue.itemBarcode
    this.memberId=formValue.member
    this.statusName="Renew"
    if(this.validateRenewalForm())
    {
      this.updateStatus()
    }
    

   /*  // Submit the renewal data to the backend
    this.httpService.create('/renewal/create', payload).then(
      () => {
        // Optionally reset form or provide feedback to the user
      },
      (err: HttpErrorResponse) => {
        console.error('Renewal failed:', err.message);
      }
    ); */
  }


  catalogItemId: string = '';
  memberId: string = '';
  statusName: string = '';
  responseMessage: string = '';

  //constructor(private circulationService: CirculationService) {}

  updateStatus() {
    if (this.catalogItemId && this.memberId && this.statusName) {
      this.httpService
        .updateCirculationStatus(this.catalogItemId, this.memberId, this.statusName)
        .subscribe(
          (response) => {
            this.responseMessage = 'Circulation status updated successfully.';
            this.toastr.success('Circulation status updated successfully.')
            this.closeModal()
          },
          (error) => {
            this.responseMessage = 'Failed to update circulation status.';
          }
        );
    } else {
      this.responseMessage = 'Please fill out all fields.';
    }
  }

  validateRenewalForm(): boolean {
    if (!this.renewalForm) {
      this.toastr.error('Form is not initialized.');
      return false;
    }
  
    const formValue = this.renewalForm.value;
  
    // Validate Member Selection
    if (!formValue.member) {
      this.toastr.error('Please select a member.');
      return false;
    }
  
    // Validate Item Barcode
    if (!formValue.itemBarcode) {
      this.toastr.error('Please select an item barcode.');
      return false;
    }
  
    // Validate Renewal Due Date
    if (!formValue.renewalDueDate) {
      this.toastr.error('Please select a renewal due date.');
      return false;
    }
  
    const renewalDueDate = new Date(formValue.renewalDueDate);
    const today = new Date();
  
    // Ensure the renewal due date is not in the past
    if (renewalDueDate < today) {
      this.toastr.error('Renewal due date cannot be in the past.');
      return false;
    }
  
    // Validate Forgive Fines
    if (!['yes', 'no'].includes(formValue.forgiveFines)) {
      this.toastr.error('Please select a valid option for forgiving fines.');
      return false;
    }
  
    return true;
  }
  
}
