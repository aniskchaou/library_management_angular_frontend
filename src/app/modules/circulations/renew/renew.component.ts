import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { HTTPService } from 'src/app/main/services/HTTPService';
import CONFIG from 'src/app/main/urls/urls';

@Component({
  selector: 'app-renew',
  templateUrl: './renew.component.html',
  styleUrls: ['./renew.component.css']
})
export class RenewComponent implements OnInit {

  
  renewalForm: FormGroup;
  members$: any[] = [];
  books$: any[] = [];
  loading = false;
  submitted = false;

  constructor(private toastr: ToastrService,private fb: FormBuilder, private httpService: HTTPService,private activeModal: NgbActiveModal) {}

  
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

    if (this.renewalForm.invalid) {
      return;  // If form is invalid, stop the process
    }

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
    console.log(payload)
    this.catalogItemId=formValue.itemBarcode
    this.memberId=formValue.member
    this.statusName="Renew"
    this.updateStatus()

   /*  // Submit the renewal data to the backend
    this.httpService.create('/renewal/create', payload).then(
      () => {
        console.log('Renewal successfully processed.');
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


}
