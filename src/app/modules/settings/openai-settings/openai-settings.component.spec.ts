import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenaiSettingsComponent } from './openai-settings.component';

describe('OpenaiSettingsComponent', () => {
  let component: OpenaiSettingsComponent;
  let fixture: ComponentFixture<OpenaiSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenaiSettingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpenaiSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
