import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { URLLoader } from 'src/app/main/configs/URLLoader';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css'],
})
export class MemberListComponent extends URLLoader implements OnInit {
  @Input() members;
  @Output() editEvent = new EventEmitter<string>();
  @Output() viewEvent = new EventEmitter<string>();
  @Output() deleteEvent = new EventEmitter<string>();

  @Input() memberI18n;
  constructor() {
    super();
  }
  ngOnInit(): void {
    this.loadScripts();
  }

  edit(id) {
    this.editMember(id);
  }

  delete(id) {
    this.deleteEvent.emit(id);
  }

  view(value: string) {
    this.viewEvent.emit(value);
  }

  editMember(value: string) {
    this.editEvent.emit(value);
  }
}
