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
    
    this.httpService.menuI18n$.subscribe((data) => {
      this.menu = data;
    });
  }
  name = 'Angular';
  constructor(private httpService: HTTPService, public datepipe: DatePipe) {
    super();
    this.getAll();
  }
  

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
      console.log(e)
      let index = Math.floor(Math.random() * (data.length - 1 + 1));
      this.dataArray.push({
        id: e.id,
        title: e.catalogItemName.title,
        desc: e.catalogItemName.subtitle,
        startDate: new Date(
          e.issueDate
        ),
        endDate: new Date(
          e.lastDate
        ),
        createdBy: 'Tom',
        createdAt: new Date(e.issueDate),
        type: 2,
        color: colors[index],
      });
    });
  }


  dataArray: any[] = [
    /* {
      id: 1,
      title: 'Meeting with Bob',
      startDate: new Date('2024-08-10T10:00:00'),
      endDate: new Date('2024-08-10T12:00:00'),
      color: '#FF5733' // red color
    },
    {
      id: 2,
      title: 'Dentist Appointment',
      startDate: new Date('2024-08-12T14:00:00'),
      endDate: new Date('2024-08-12T15:00:00'),
      color: '#33C3FF' // blue color
    },
    {
      id: 3,
      title: 'Conference',
      startDate: new Date('2024-08-15T09:00:00'),
      endDate: new Date('2024-08-15T17:00:00'),
      color: '#75FF33' // green color
    },
    {
      id: 4,
      title: 'Dinner with Family',
      startDate: new Date('2024-08-20T19:00:00'),
      endDate: new Date('2024-08-20T21:00:00'),
      color: '#FF33A8' // pink color
    } */
  ];


  selectDay(event: any): void {
    console.log('Selected day:', event);
    // Handle day selection logic here
  }

  addEvent(event: any): void {
    console.log('New event:', event);
    // Handle adding a new event logic here
    this.dataArray.push(event);
  }
}
