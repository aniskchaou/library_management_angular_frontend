import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestedBookListComponent } from './requested-book-list.component';

describe('RequestedBookListComponent', () => {
  let component: RequestedBookListComponent;
  let fixture: ComponentFixture<RequestedBookListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestedBookListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestedBookListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
