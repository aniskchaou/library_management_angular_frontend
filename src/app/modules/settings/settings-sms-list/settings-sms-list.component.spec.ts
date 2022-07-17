import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsSmsListComponent } from './settings-sms-list.component';

describe('SettingsSmsListComponent', () => {
  let component: SettingsSmsListComponent;
  let fixture: ComponentFixture<SettingsSmsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsSmsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsSmsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
