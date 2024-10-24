import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingSettingsComponent } from './booking-settings.component';

describe('BookingSettingsComponent', () => {
  let component: BookingSettingsComponent;
  let fixture: ComponentFixture<BookingSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingSettingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
