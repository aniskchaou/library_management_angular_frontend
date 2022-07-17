import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { URLLoader } from 'src/app/main/configs/URLLoader';
import Writer from 'src/app/main/models/Writer';
import { HTTPService } from 'src/app/main/services/HTTPService';
import CONFIG from 'src/app/main/urls/urls';

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
  @Output() contactEvent = new EventEmitter<string>();
  writer: Writer;

  constructor(private httpService: HTTPService, private router: Router) {
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
  contact(email) {
    console.log(email);
    this.contactEvent.emit(email);
  }

  setEvent(value: string) {
    this.editEvent.emit(value);
  }

  return(id) {
    this.httpService
      .getAll(CONFIG.URL_BASE + '/circulation/return/' + id)
      .subscribe((data) => {
        this.router
          .navigateByUrl('/dashboard', { skipLocationChange: true })
          .then(() => {
            this.router.navigate(['/circulation']);
          });
      });
  }
}
