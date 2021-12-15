import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookNumberComponent } from './book-number.component';

describe('BookNumberComponent', () => {
  let component: BookNumberComponent;
  let fixture: ComponentFixture<BookNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookNumberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
