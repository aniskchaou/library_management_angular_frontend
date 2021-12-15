import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsBookComponent } from './statistics-book.component';

describe('StatisticsBookComponent', () => {
  let component: StatisticsBookComponent;
  let fixture: ComponentFixture<StatisticsBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatisticsBookComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticsBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
