import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { HTTPService } from 'src/app/main/services/HTTPService';
import CONFIG from 'src/app/main/urls/urls';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-hold',
    templateUrl: './hold.component.html',
    standalone: false
})
export class HoldComponent implements OnInit {
  holdForm: UntypedFormGroup;
  members$: any[] = [];
  books$: any[] = [];
  loading = false;
  submitted = false;

  constructor(private toastr: ToastrService,private activeModal: NgbActiveModal,private fb: UntypedFormBuilder, private httpService: HTTPService) {}

  ngOnInit() {
    this.holdForm = this.fb.group({
      memberName: ['', Validators.required],
      itemBarcode: ['', Validators.required]
    });

    this.getMembers();
    this.getBooks();
  }
  
closeModal(): void {
    this.activeModal.dismiss(); // Close the modal using NgbActiveModal
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

  // Fetch books for the select dropdown
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

  catalogItemId: string = '';
  memberId: string = '';
  statusName: string = '';
  responseMessage: string = '';

  // Form submission for holding an item
  hold() {
    this.submitted = true;

    /* if (this.holdForm.invalid) {
      return;  // If form is invalid, stop the process
    } */

    const formValue = this.holdForm.value;

    // Get the selected member and book
    const selectedMember = this.members$.find(member => member.id == formValue.memberName);
    const selectedBook = this.books$.find(book => book.id == formValue.itemBarcode);

    const payload = {
      member: selectedMember,
      book: selectedBook,
    };
    this.catalogItemId=formValue.itemBarcode
    this.memberId=formValue.memberName
    this.statusName="On Hold"
    if(this.validateHoldForm()){
      this.updateStatus()
    }
    

   /*  // Submit the hold data to the backend
    this.httpService.create('/hold/create', payload).then(
      () => {
        // Optionally reset form or provide feedback to the user
      },
      (err: HttpErrorResponse) => {
        console.error('Hold request failed:', err.message);
      }
    ); */
  }



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

  validateHoldForm(): boolean {
    if (!this.holdForm) {
      this.toastr.error('Form is not initialized.');
      return false;
    }
  
    const formValue = this.holdForm.value;
  
    // Validate Item Barcode
    if (!formValue.itemBarcode) {
      this.toastr.error('Please select an item barcode.');
      return false;
    }
  
    // Validate Member Name
    if (!formValue.memberName) {
      this.toastr.error('Please select a member name.');
      return false;
    }
  
    return true;
  }
  
  
}
