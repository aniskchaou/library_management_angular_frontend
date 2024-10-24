import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewWriterComponent } from './view-writer.component';

describe('ViewWriterComponent', () => {
  let component: ViewWriterComponent;
  let fixture: ComponentFixture<ViewWriterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewWriterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewWriterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
