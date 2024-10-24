import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShelfViewerComponent } from './shelf-viewer.component';

describe('ShelfViewerComponent', () => {
  let component: ShelfViewerComponent;
  let fixture: ComponentFixture<ShelfViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShelfViewerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShelfViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
