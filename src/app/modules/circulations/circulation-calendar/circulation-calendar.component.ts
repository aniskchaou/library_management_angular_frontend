import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EventData } from 'ngx-event-calendar/lib/interface/event-data';
import { URLLoader } from 'src/app/main/configs/URLLoader';
import Circulation from 'src/app/main/models/Circulation';
import { HTTPService } from 'src/app/main/services/HTTPService';
import CONFIG from 'src/app/main/urls/urls';

@Component({
  selector: 'app-circulation-calendar',
  templateUrl: './circulation-calendar.component.html',
  styleUrls: ['./circulation-calendar.component.css'],
})
export class CirculationCalendarComponent extends URLLoader implements OnInit {
  circulations$: Circulation[];
  menu;
  ngOnInit(): void {
    this.getAll();
    this.httpService.menuI18n$.subscribe((data) => {
      this.menu = data;
    });
  }
  name = 'Angular';
  constructor(private httpService: HTTPService, public datepipe: DatePipe) {
    super();
  }
  dataArray: EventData[] = [];

  selectDay(event) {
    console.log(event);
  }
  addEvent(event) {}

  getAll() {
    // this.loading = true;
    this.httpService.getAll(CONFIG.URL_BASE + '/circulation/all').subscribe(
      (data: Circulation[]) => {
        this.circulations$ = data;
        // this.loading = false;
        console.log(this.circulations$);
        this.setData(this.circulations$);
      },
      (err: HttpErrorResponse) => {
        super.show('Error', err.message, 'error');
      }
    );
  }

  setData(data: Circulation[]) {
    let colors = [
      '#5AA454',
      '#A10A28',
      '#C7B42C',
      '#AAAAAA',
      'orange',
      'green',
      'yellow',
      'blue',
    ];

    data.forEach((e) => {
      let index = Math.floor(Math.random() * (data.length - 1 + 1));
      this.dataArray.push({
        id: e.id,
        title: e.bookName.title,
        desc: e.bookName.subtitle,
        startDate: new Date(
          this.datepipe.transform(new Date(e.issueDate), 'MM/dd/yyyy')
        ),
        endDate: new Date(
          this.datepipe.transform(new Date(e.lastDate), 'MM/dd/yyyy')
        ),
        createdBy: 'Tom',
        createdAt: new Date(e.issueDate),
        type: 2,
        color: colors[index],
      });
    });
  }
}
