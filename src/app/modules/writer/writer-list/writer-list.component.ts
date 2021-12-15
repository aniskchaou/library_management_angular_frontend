import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { URLLoader } from 'src/app/main/configs/URLLoader';

@Component({
  selector: 'app-writer-list',
  templateUrl: './writer-list.component.html',
  styleUrls: ['./writer-list.component.css'],
})
export class WriterListComponent extends URLLoader implements OnInit {
  @Input() writers;
  @Input() writerI18n;
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
