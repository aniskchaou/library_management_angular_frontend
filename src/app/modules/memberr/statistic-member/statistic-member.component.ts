import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-statistic-member',
    templateUrl: './statistic-member.component.html',
    styleUrls: ['./statistic-member.component.css'],
    standalone: false
})
export class StatisticMemberComponent implements OnInit {

  showsummary: boolean = false
  showgraphic: boolean = false
  constructor() { }

  ngOnInit(): void {
  }

}
