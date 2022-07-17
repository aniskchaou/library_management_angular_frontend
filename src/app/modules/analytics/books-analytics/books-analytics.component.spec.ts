import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksAnalyticsComponent } from './books-analytics.component';

describe('BooksAnalyticsComponent', () => {
  let component: BooksAnalyticsComponent;
  let fixture: ComponentFixture<BooksAnalyticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BooksAnalyticsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BooksAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
