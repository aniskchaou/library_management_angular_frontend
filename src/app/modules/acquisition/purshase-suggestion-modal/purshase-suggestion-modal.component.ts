import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Fund } from 'src/app/main/models/Fund';
import { MediaType } from 'src/app/main/models/MediaType';
import Publisher from 'src/app/main/models/Publisher';
import { PurchaseSuggestion } from 'src/app/main/models/PurshaseSuggestion';
import Writer from 'src/app/main/models/Writer';
import { HTTPService } from 'src/app/main/services/HTTPService';
import CONFIG from 'src/app/main/urls/urls';

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
    private httpService:HTTPService
  ) {}

  ngOnInit(): void {
     this.loadWriters();
     this.loadPublishers();
     this.loadMediaTypes();
     this.loadFunds();
  }

  onSaveClick(): void {
   console.log(this.purchaseSuggestion)
      this.purchaseSuggestionService.createPurchaseSuggestion(this.purchaseSuggestion).subscribe((newSuggestion) => {
        this.activeModal.close(newSuggestion);
      });
    
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

}
