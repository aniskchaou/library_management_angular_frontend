import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { URLLoader } from 'src/app/main/configs/URLLoader';
import { HTTPService } from 'src/app/main/services/HTTPService';
import CONFIG from 'src/app/main/urls/urls';

@Component({
    selector: 'app-check-out',
    templateUrl: './check-out.component.html',
    styleUrls: ['./check-out.component.css'],
    standalone: false
})
export class CheckOutComponent  implements OnInit {

  checkoutForm: UntypedFormGroup;
  members$: any[] = [];
  books$: any[] = [];
  loading = false;
  submitted = false;

  constructor(private toastr: ToastrService,private fb: UntypedFormBuilder, private httpService: HTTPService,private activeModal: NgbActiveModal) {}

  
closeModal(): void {
    this.activeModal.dismiss(); // Close the modal using NgbActiveModal
  }


  ngOnInit() {
    this.checkoutForm = this.fb.group({
      member: ['', Validators.required],
      itemBarcode: ['', Validators.required],
      dueDate: ['', Validators.required],
      automaticRenewal: ['', Validators.required],
    });

    this.getMembers();
    this.getBooks();
  }

  // Fetch members for the ng-select
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

  // Fetch books for the ng-select
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

  // Form submission method
  add() {
    this.submitted = true;

   /*  if (this.checkoutForm.invalid) {
      return;  // If form is invalid, stop the process
    } */

    const formValue = this.checkoutForm.value;

    // Fetch the selected member and book
    const selectedMember = this.members$.find(member => member.id == formValue.member);
    const selectedBook = this.books$.find(book => book.id == formValue.itemBarcode);

    const payload = {
      member: selectedMember,
      book: selectedBook,
      dueDate: formValue.dueDate,
      automaticRenewal: formValue.automaticRenewal === 'yes',
    };
    this.catalogItemId=formValue.itemBarcode
    this.memberId=formValue.member
    this.statusName="CheckOut"
    if(this.validateCheckoutForm()){
      this.updateStatus()
    }
    

    // Submit form data to backend
   /*  this.httpService.create('/checkout/create', payload).then(
      () => {
        // Optionally, you can reset the form or navigate back.
      },
      (err: HttpErrorResponse) => {
        console.error('Checkout failed:', err.message);
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

          {
            next: (response) => {
              this.responseMessage = 'Circulation status updated successfully.';
             this.toastr.success('Circulation status updated successfully.')
            this.closeModal()
            },
            error: (error) => {
              console.error('Error:', error);
            }
          }
          );
    } else {
      this.responseMessage = 'Please fill out all fields.';
    }
  }

  validateCheckoutForm(): boolean {
    if (!this.checkoutForm) {
      this.toastr.error('Form is not initialized.');
      return false;
    }
  
    const formValue = this.checkoutForm.value;
  
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
  
    // Validate Due Date
    if (!formValue.dueDate) {
      this.toastr.error('Please select a due date.');
      return false;
    }
  
    const dueDate = new Date(formValue.dueDate);
    const today = new Date();
  
    // Ensure the due date is not in the past
    if (dueDate < today) {
      this.toastr.error('Due date cannot be in the past.');
      return false;
    }
  
    // Validate Automatic Renewal
    if (!['yes', 'no'].includes(formValue.automaticRenewal)) {
      this.toastr.error('Please select a valid option for automatic renewal.');
      return false;
    }
  
    return true;
  }
  

}
