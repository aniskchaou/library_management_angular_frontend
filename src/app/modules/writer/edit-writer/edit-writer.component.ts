import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { URLLoader } from 'src/app/main/configs/URLLoader';
import CategoryMessage from 'src/app/main/messages/CategoryMessage';
import Writer from 'src/app/main/models/Writer';
import { DataService } from 'src/app/main/services/data.service';
import { HTTPService } from 'src/app/main/services/HTTPService';
import CONFIG from 'src/app/main/urls/urls';

@Component({
  selector: 'app-edit-writer',
  templateUrl: './edit-writer.component.html',
  styleUrls: ['./edit-writer.component.css'],
})
export class EditWriterComponent extends URLLoader implements OnInit {
  @Input() model: Writer;
  @Input() author:Writer
  @Input() id: string;
  @Output() closeModalEvent = new EventEmitter<string>();
  writerI18n;

  

  constructor(
    private toastr: ToastrService,
    private httpService: HTTPService,
    private message: CategoryMessage,
    private router: Router,
    private activeModal: NgbActiveModal,
    private dataService:DataService,  private authorService: HTTPService
  ) {
    super();
    //this.model = this.create();
  }

  create() {
    //return new Writer(0, '', '',null,true,null,'','','','');
  }

  



  edit() {
    this.httpService.create(CONFIG.URL_BASE + '/writer/create', this.author).finally(()=>{
      this.closeModal()
      this.dataService.triggerRefresh()
      this.toastr.success('Item edited successfully!', 'Success');
    });
 
  }

  
closeModal(): void {
    this.activeModal.dismiss(); // Close the modal using NgbActiveModal
  }


  


  ngOnInit(): void {
    // Initialize any necessary properties here
    console.log(this.author)
  }

  onCancelClick(): void {
    this.activeModal.dismiss(); // Dismiss the modal
  }

  onDiedChange(): void {
    if (!this.author.died) {
      this.author.dateOfDeath = null; // Reset date of death if not deceased
    }
  }

  saveAuthor(): void {
    this.edit()
  }
  
}
