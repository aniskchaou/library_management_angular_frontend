import { Component, OnInit } from '@angular/core';
import { ShowContentDocPageComponent } from '../show-content-doc-page/show-content-doc-page.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-documentation',
  templateUrl: './documentation.component.html',
  styleUrls: ['./documentation.component.css']
})
export class DocumentationComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  openDialog(file): void {
    console.log(file)
    const modalRef = this.modalService.open(ShowContentDocPageComponent, {
      size: 'xl', // Set the modal size to extra-large
      backdrop: 'static', // Optional: prevent closing the modal by clicking outside
      keyboard: false     // Optional: prevent closing the modal with the Escape key
    });
    modalRef.componentInstance.file = file; // Ensure category is passed properly
  
   
    modalRef.result.then(result => {
      console.log(result)
      
    }).catch(error => console.log(error));
  }

}
