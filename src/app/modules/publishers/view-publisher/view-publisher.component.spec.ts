import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPublisherComponent } from './view-publisher.component';

describe('ViewPublisherComponent', () => {
  let component: ViewPublisherComponent;
  let fixture: ComponentFixture<ViewPublisherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPublisherComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewPublisherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
