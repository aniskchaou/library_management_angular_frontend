import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { URLLoader } from 'src/app/main/configs/URLLoader';
import { HTTPService } from 'src/app/main/services/HTTPService';

@Component({
  selector: 'app-income-list',
  templateUrl: './income-list.component.html',
  styleUrls: ['./income-list.component.css'],
})
export class IncomeListComponent extends URLLoader implements OnInit {
  @Input() incomes;
  @Input() incomeI18n;
  @Output() editEvent = new EventEmitter<string>();
  @Output() deleteEvent = new EventEmitter<string>();

  constructor(private httpService: HTTPService) {
    super();
  }

  ngOnInit(): void {
    this.loadScripts();
  }

  edit(id) {
    this.editCategory(id);
  }

  delete(id) {
    this.deleteCategory(id);
  }

  editCategory(value: string) {
    this.editEvent.emit(value);
  }

  deleteCategory(value) {
    this.deleteEvent.emit(value);
  }
}
