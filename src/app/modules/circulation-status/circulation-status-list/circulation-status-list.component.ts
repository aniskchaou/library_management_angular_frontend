import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { URLLoader } from 'src/app/main/configs/URLLoader';

@Component({
  selector: 'app-circulation-status-list',
  templateUrl: './circulation-status-list.component.html',
  styleUrls: ['./circulation-status-list.component.css'],
})
export class CirculationStatusListComponent
  extends URLLoader
  implements OnInit
{
  @Input() circulationStatus;
  @Input() circulationStatusI18n;
  @Output() idEvent = new EventEmitter<string>();

  constructor() {
    super();
  }
  ngOnInit(): void {
    this.loadScripts();
  }

  edit(id) {
    //this.setId(id);
    //this.httpService.ID.next(id.toString());
    this.editCategory(id);
  }

  editCategory(value: string) {
    this.idEvent.emit(value);
  }
}
