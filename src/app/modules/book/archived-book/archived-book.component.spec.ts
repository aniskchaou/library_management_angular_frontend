import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivedBookComponent } from './archived-book.component';

describe('ArchivedBookComponent', () => {
  let component: ArchivedBookComponent;
  let fixture: ComponentFixture<ArchivedBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchivedBookComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivedBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
