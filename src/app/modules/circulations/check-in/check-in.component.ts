import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';
import { URLLoader } from 'src/app/main/configs/URLLoader';
import { DataService } from 'src/app/main/services/data.service';
import { HTTPService } from 'src/app/main/services/HTTPService';
import CONFIG from 'src/app/main/urls/urls';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.css']
})
export class CheckInComponent  implements OnInit {

  circulationForm: FormGroup;
  loading = false;
  submitted = false;
  members$;
  books$;
  returnStatus$;
  writers$;

  constructor(private toastr: ToastrService,private dataService:DataService,private fb: FormBuilder, private httpService: HTTPService,private activeModal: NgbActiveModal) {}

  ngOnInit() {
    this.circulationForm = this.fb.group({
      memberName: ['', Validators.required],
      catalogItemName: ['', Validators.required],
      //returnStatus: ['', Validators.required],
      //writer: ['', Validators.required],
      returnDueDate: ['', Validators.required],
      rememberReturnDate: [false]
    });

    this.getAll();
  }

  getAll() {
    this.loading = true;

    forkJoin({
      books: this.httpService.getAll(CONFIG.URL_BASE + '/book/all'),
      members: this.httpService.getAll(CONFIG.URL_BASE + '/member/all'),
      returnStatus: this.httpService.getAll(CONFIG.URL_BASE + '/circulationstatus/all'),
      writers: this.httpService.getAll(CONFIG.URL_BASE + '/writer/all')
    }).subscribe(
      ({ books, members, returnStatus, writers }) => {
        this.books$ = books;
        this.members$ = members;
        this.returnStatus$ = returnStatus;
        this.writers$ = writers;
        this.loading = false;
      },
      (err: HttpErrorResponse) => {
        this.loading = false;
        //super.show('Error', err.message, 'warning');
      }
    );
  }

  add() {
    this.submitted = true;
    
    /* if (this.circulationForm.invalid) {
      return; // form is not valid, stop the process
    } */

    // Fetch and set the member, book, return status, and writer by ID
    const selectedMember = this.members$.find(x => x.id == parseInt(this.circulationForm.value.memberName));
    const selectedBook = this.books$.find(x => x.id == parseInt(this.circulationForm.value.catalogItemName));
    const selectedReturnStatus = this.returnStatus$.find(x => x.name==='CheckIn');
    const selectedWriter = this.writers$.find(x => x.id == parseInt(this.circulationForm.value.writer));

    console.log(selectedBook)
    let body={
      memberName: selectedMember,
      catalogItemName: selectedBook,
      issueDate:new Date().toDateString(),
      returnStatus: selectedReturnStatus,
      writer: selectedWriter,
      returnDate:this.circulationForm.value.returnDueDate,
      toReturn:this.circulationForm.value.returnDueDate
    };

    if (this.validateCirculationForm()) {
      console.log(this.circulationForm.value);
 
      this.httpService
        .create(CONFIG.URL_BASE + '/circulation/create', body)
        .then(() => {
          this.dataService.triggerRefresh()
          console.log(this.circulationForm.value);
          this.toastr.success('Circulation status updated successfully.')
          this.addNotification(selectedMember.firstname,selectedBook.title)
          this.closeModal()
        });

      //super.show('Confirmation', this.msg.confirmationMessages.add, 'success');
    }
  }

  addNotification(name,title): void {
    const newNotification={
      content: name+' has checked in '+title,
      date: new Date(),
      type: 'info',
    };

    this.httpService.create(CONFIG.URL_BASE+'/notification/',newNotification).then(
      (notification) => {
        console.log('Notification created:', notification);
        // Optionally reset the form
        // this.content = '';
        // this.type = 'info';
        // this.date = new Date().toISOString();
      },
      (error) => {
        console.error('Error creating notification', error);
      }
    );
  }


  
closeModal(): void {
    this.activeModal.dismiss(); // Close the modal using NgbActiveModal
  }

  validateCirculationForm(): boolean {
    if (!this.circulationForm) {
      this.toastr.error('Form is not initialized.');
      return false;
    }
  
    const formValue = this.circulationForm.value;
  
    // Validate Member Selection
    if (!formValue.memberName) {
      this.toastr.error('Please select a member.');
      return false;
    }
  
    // Validate Item Barcode / Book Selection
    if (!formValue.catalogItemName) {
      this.toastr.error('Please select an item.');
      return false;
    }
  
    // Validate Return Due Date
    if (!formValue.returnDueDate) {
      this.toastr.error('Please select a return due date.');
      return false;
    }
  
    const dueDate = new Date(formValue.returnDueDate);
    const today = new Date();
  
    // Ensure the due date is not in the past
    if (dueDate < today) {
      this.toastr.error('Return due date cannot be in the past.');
      return false;
    }
  
    return true;
  }
  

}
