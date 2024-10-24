import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwilioSettingsComponent } from './twilio-settings.component';

describe('TwilioSettingsComponent', () => {
  let component: TwilioSettingsComponent;
  let fixture: ComponentFixture<TwilioSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TwilioSettingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TwilioSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
