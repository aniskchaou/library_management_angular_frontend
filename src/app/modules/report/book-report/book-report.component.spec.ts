import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookReportComponent } from './book-report.component';

describe('BookReportComponent', () => {
  let component: BookReportComponent;
  let fixture: ComponentFixture<BookReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
