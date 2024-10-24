import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { URLLoader } from 'src/app/main/configs/URLLoader';
import CategoryMessage from 'src/app/main/messages/CategoryMessage';
import Publisher from 'src/app/main/models/Publisher';
import { HTTPService } from 'src/app/main/services/HTTPService';
import CONFIG from 'src/app/main/urls/urls';

@Component({
  selector: 'app-edit-publisher',
  templateUrl: './edit-publisher.component.html',
  styleUrls: ['./edit-publisher.component.css'],
})
export class EditPublisherComponent  implements OnInit {
  @Input() publisher
  
  countries: string[] = ['USA', 'Canada', 'UK', 'Australia', 'India']; // Example country list

  constructor(public activeModal: NgbActiveModal,
              private publisherService: HTTPService) { }

  ngOnInit(): void {
    // Initialization logic if needed
  }

  onSaveClick(): void {
    this.activeModal.close(this.publisher);
  }

  onCancelClick(): void {
    this.activeModal.dismiss();
  }

  savePublisher(): void {
    this.publisherService.create(CONFIG.URL_BASE + '/publisher/create', this.publisher).then((data)=>{
      console.log(data)
    });
    
  }

  


}
