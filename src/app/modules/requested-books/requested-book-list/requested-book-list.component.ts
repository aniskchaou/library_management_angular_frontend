import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { URLLoader } from 'src/app/main/configs/URLLoader';
import { HTTPService } from 'src/app/main/services/HTTPService';
import CONFIG from 'src/app/main/urls/urls';

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
  defautstatus = 'Pending';
  constructor(private httpService: HTTPService, private router: Router) {
    super();
  }

  ngOnInit(): void {
    this.loadScripts();
    console.log(this.requiredBook);
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

  resolve(id) {
    this.httpService
      .getAll(CONFIG.URL_BASE + '/requestedbook/resolve/' + id)
      .subscribe((data) => {
        this.reloadPage();
      });
  }

  reject(id) {
    this.httpService
      .getAll(CONFIG.URL_BASE + '/requestedbook/reject/' + id)
      .subscribe((data) => {
        this.reloadPage();
      });
  }

  editCategory(value: string) {
    this.idEvent.emit(value);
  }

  reloadPage() {
    this.router
      .navigateByUrl('/dashboard', { skipLocationChange: true })
      .then(() => {
        this.router.navigate(['/requested-book']);
      });
  }
}
