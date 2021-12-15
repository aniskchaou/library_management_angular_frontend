import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { URLLoader } from 'src/app/main/configs/URLLoader';

@Component({
  selector: 'app-requested-book-list',
  templateUrl: './requested-book-list.component.html',
  styleUrls: ['./requested-book-list.component.css'],
})
export class RequestedBookListComponent extends URLLoader implements OnInit {
  @Input() requiredBook;
  @Output() idEvent = new EventEmitter<string>();
  @Output() viewEvent = new EventEmitter<string>();
  @Output() deleteEvent = new EventEmitter<string>();
  @Input() requestedBookI18n;

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.loadScripts();
  }

  edit(id) {
    this.editCategory(id);
  }

  view(id) {
    this.viewEvent.emit(id);
  }

  delete(id) {
    this.deleteEvent.emit(id);
  }

  editCategory(value: string) {
    this.idEvent.emit(value);
  }
}
