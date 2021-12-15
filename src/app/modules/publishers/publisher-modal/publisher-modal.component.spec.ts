import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublisherModalComponent } from './publisher-modal.component';

describe('PublisherModalComponent', () => {
  let component: PublisherModalComponent;
  let fixture: ComponentFixture<PublisherModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublisherModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublisherModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
