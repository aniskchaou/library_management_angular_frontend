import { AfterViewInit, Component, OnInit } from '@angular/core';
import { URLLoader } from 'src/app/main/configs/URLLoader';

@Component({
    selector: 'app-overdue-fines',
    templateUrl: './overdue-fines.component.html',
    styleUrls: ['./overdue-fines.component.css'],
    standalone: false
})
export class OverdueFinesComponent extends URLLoader implements OnInit,AfterViewInit {

  constructor() { super() }
  ngAfterViewInit(): void {
    super.enableDataTable()
  }

  ngOnInit(): void {
    
  }

}
