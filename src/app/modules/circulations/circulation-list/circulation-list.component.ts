import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { URLLoader } from 'src/app/main/configs/URLLoader';
import Writer from 'src/app/main/models/Writer';

@Component({
  selector: 'app-circulation-list',
  templateUrl: './circulation-list.component.html',
  styleUrls: ['./circulation-list.component.css'],
})
export class CirculationListComponent extends URLLoader implements OnInit {
  @Input() circulations;
  @Input() circulationI18n;
  @Output() editEvent = new EventEmitter<string>();
  @Output() viewEvent = new EventEmitter<string>();
  @Output() deleteEvent = new EventEmitter<string>();
  writer: Writer;

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.loadScripts();
    console.log(this.circulations);
  }

  toObject(str) {
    return JSON.parse(str);
  }
  edit(id) {
    this.editEvent.emit(id);
  }

  view(id) {
    this.viewEvent.emit(id);
  }

  delete(id) {
    this.deleteEvent.emit(id);
  }

  setEvent(value: string) {
    this.editEvent.emit(value);
  }
}
