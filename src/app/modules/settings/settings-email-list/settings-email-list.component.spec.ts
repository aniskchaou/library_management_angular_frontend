import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsEmailListComponent } from './settings-email-list.component';

describe('SettingsEmailListComponent', () => {
  let component: SettingsEmailListComponent;
  let fixture: ComponentFixture<SettingsEmailListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsEmailListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsEmailListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
