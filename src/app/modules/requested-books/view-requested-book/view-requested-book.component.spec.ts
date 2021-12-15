import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRequestedBookComponent } from './view-requested-book.component';

describe('ViewRequestedBookComponent', () => {
  let component: ViewRequestedBookComponent;
  let fixture: ComponentFixture<ViewRequestedBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewRequestedBookComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewRequestedBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
