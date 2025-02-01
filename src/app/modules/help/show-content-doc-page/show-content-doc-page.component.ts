import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-show-content-doc-page',
  templateUrl: './show-content-doc-page.component.html',
  styleUrls: ['./show-content-doc-page.component.css']
})
export class ShowContentDocPageComponent implements OnInit {

  markdownContent: string
  @Input() file:string
  constructor(private http:HttpClient,public activeModal: NgbActiveModal) { 
   
  }

  ngOnInit(): void {
    this.http.get('assets/documentation/modules/'+this.file+'.html', { responseType: 'text' })
    .subscribe(data => {
      console.log(data)
      this.markdownContent = data;
    });
  }

  onCancelClick(): void {
    this.activeModal.dismiss();
  }


  

}
