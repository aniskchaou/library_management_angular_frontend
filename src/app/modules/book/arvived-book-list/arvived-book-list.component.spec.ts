import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArvivedBookListComponent } from './arvived-book-list.component';

describe('ArvivedBookListComponent', () => {
  let component: ArvivedBookListComponent;
  let fixture: ComponentFixture<ArvivedBookListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArvivedBookListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArvivedBookListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
