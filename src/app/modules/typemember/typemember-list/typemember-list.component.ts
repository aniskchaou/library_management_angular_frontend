import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { URLLoader } from 'src/app/main/configs/URLLoader';

@Component({
  selector: 'app-typemember-list',
  templateUrl: './typemember-list.component.html',
  styleUrls: ['./typemember-list.component.css'],
})
export class TypememberListComponent extends URLLoader implements OnInit {
  @Input() typeMembers;
  @Output() editEvent = new EventEmitter<string>();
  @Output() deleteEvent = new EventEmitter<string>();
  @Input() typeMemberI18n;

  constructor() {
    super();
  }
  ngOnInit(): void {
    this.loadScripts();
  }

  edit(id) {
    this.editCategory(id);
  }

  delete(id) {
    this.deleteEvent.emit(id);
  }

  editCategory(value: string) {
    this.editEvent.emit(value);
  }
}
