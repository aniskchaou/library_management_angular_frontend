import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Fund } from 'src/app/main/models/Fund';
import { MediaType } from 'src/app/main/models/MediaType';
import Publisher from 'src/app/main/models/Publisher';
import { PurchaseSuggestion } from 'src/app/main/models/PurshaseSuggestion';
import Writer from 'src/app/main/models/Writer';
import { HTTPService } from 'src/app/main/services/HTTPService';
import CONFIG from 'src/app/main/urls/urls';
import { threadId } from 'worker_threads';

@Component({
  selector: 'app-purshase-suggestion-modal',
  templateUrl: './purshase-suggestion-modal.component.html',
  styleUrls: ['./purshase-suggestion-modal.component.css']
})
export class PurshaseSuggestionModalComponent implements OnInit {

  @Input() purchaseSuggestion: PurchaseSuggestion;
  writers: Writer[] = [];
  publishers: Publisher[] = [];
  mediaTypes: MediaType[] = [];
  funds: Fund[] = [];

  constructor(
    public activeModal: NgbActiveModal,
    private purchaseSuggestionService: HTTPService,
    private writerService: HTTPService,
    private publisherService: HTTPService,
    private mediaTypeService: HTTPService,
    private fundService: HTTPService,
    private httpService:HTTPService,
    private toastr:ToastrService
  ) {}

  ngOnInit(): void {
     this.loadWriters();
     this.loadPublishers();
     this.loadMediaTypes();
     this.loadFunds();
  }

  onSaveClick(): void {
   console.log(this.purchaseSuggestion)
   if(this.validatePurchaseSuggestionForm(this.purchaseSuggestion))
   {
    this.purchaseSuggestionService.createPurchaseSuggestion(this.purchaseSuggestion).subscribe((newSuggestion) => {
      this.toastr.success('Item added successfully!', 'Success');
      this.activeModal.close(newSuggestion);
      });
   }
      
    
  }

  onCancelClick(): void {
    this.activeModal.dismiss();
  }

   loadWriters(): void {
    this.httpService.getAll(CONFIG.URL_BASE + '/writer/all').subscribe((data: Writer[]) => {
      this.writers = data;
    });
  }

  loadPublishers(): void {
    this.httpService.getAll(CONFIG.URL_BASE + '/publisher/all').subscribe((data: Publisher[]) => {
      this.publishers = data;
    });
  }

  loadMediaTypes(): void {
    this.httpService.getAll(CONFIG.URL_BASE + '/mediatype/all').subscribe((data: MediaType[]) => {
      this.mediaTypes = data;
    });
  }

  loadFunds(): void {
    this.httpService.getAllFunds().subscribe((data: Fund[]) => {
      this.funds = data;
    });
  } 

  validatePurchaseSuggestionForm(purchaseSuggestion: any): boolean {
    const errors: any = {};
  
    // Validate Title
    if (!purchaseSuggestion.title || purchaseSuggestion.title.trim().length < 3) {
      errors.title = 'Title is required and must be at least 3 characters long.';
    }
  
    // Validate Author
    if (!purchaseSuggestion.author || typeof purchaseSuggestion.author !== 'object' || !purchaseSuggestion.author.name) {
      errors.author = 'Author selection is required.';
    }
  
    // Validate Copyright Date
    if (!purchaseSuggestion.copyrightDate || isNaN(Date.parse(purchaseSuggestion.copyrightDate))) {
      errors.copyrightDate = 'Copyright Date is required and must be a valid date.';
    }
  
    // Validate ISBN/ISSN/Other Standard Number
    if (!purchaseSuggestion.isbnIssnOtherStandardNumber || purchaseSuggestion.isbnIssnOtherStandardNumber.trim().length < 5) {
      errors.isbnIssnOtherStandardNumber = 'ISBN/ISSN/Other Standard Number is required and must be at least 5 characters long.';
    }
  
    // Validate Publisher
    if (!purchaseSuggestion.publisher || typeof purchaseSuggestion.publisher !== 'object' || !purchaseSuggestion.publisher.name) {
      errors.publisher = 'Publisher selection is required.';
    }
  
    // Validate Publication Place
    if (!purchaseSuggestion.publicationPlace || purchaseSuggestion.publicationPlace.trim().length < 3) {
      errors.publicationPlace = 'Publication Place is required and must be at least 3 characters long.';
    }
  
    // Validate Collection Title (Optional but must be meaningful if provided)
    if (purchaseSuggestion.collectionTitle && purchaseSuggestion.collectionTitle.trim().length < 3) {
      errors.collectionTitle = 'Collection Title must be at least 3 characters long if provided.';
    }
  
    // Validate Media Type
    if (!purchaseSuggestion.mediaType || typeof purchaseSuggestion.mediaType !== 'object' || !purchaseSuggestion.mediaType.name) {
      errors.mediaType = 'Media Type selection is required.';
    }
  
    // Validate Reason for Suggestion
    if (!purchaseSuggestion.reasonForSuggestion || purchaseSuggestion.reasonForSuggestion.trim().length < 5) {
      errors.reasonForSuggestion = 'Reason for Suggestion is required and must be at least 5 characters long.';
    }
  
    // Validate Notes (Optional but must be meaningful if provided)
    if (purchaseSuggestion.notes && purchaseSuggestion.notes.trim().length < 5) {
      errors.notes = 'Notes must be at least 5 characters long if provided.';
    }
  
    // Validate Fund
    if (!purchaseSuggestion.fund || typeof purchaseSuggestion.fund !== 'object' || !purchaseSuggestion.fund.fundName) {
      errors.fund = 'Fund selection is required.';
    }
  
    // Validate Copies
    if (!purchaseSuggestion.copies || purchaseSuggestion.copies <= 0) {
      errors.copies = 'Copies is required and must be greater than 0.';
    }
  
    // Validate Currency
    if (!purchaseSuggestion.currency || purchaseSuggestion.currency.trim().length < 3) {
      errors.currency = 'Currency is required and must be a valid currency code (e.g., USD).';
    }
  
    // Validate Price
    if (!purchaseSuggestion.price || purchaseSuggestion.price <= 0) {
      errors.price = 'Price is required and must be greater than 0.';
    }
  
    // Validate Total
    if (!purchaseSuggestion.total || purchaseSuggestion.total <= 0) {
      errors.total = 'Total is required and must be greater than 0.';
    }
  
    // Validate Show Inactive (No specific validation needed for a checkbox)
  
    // Display errors using Toastr or console
    Object.entries(errors).forEach(([field, message]) => {
      console.error(`${field}: ${message}`);
      this.toastr.error(message + '', 'Validation Error');
    });
  
    // Return true if no errors, false otherwise
    return Object.keys(errors).length === 0;
  }
  

}
