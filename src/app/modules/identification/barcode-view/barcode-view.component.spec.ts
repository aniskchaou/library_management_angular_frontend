import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarcodeViewComponent } from './barcode-view.component';

describe('BarcodeViewComponent', () => {
  let component: BarcodeViewComponent;
  let fixture: ComponentFixture<BarcodeViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarcodeViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarcodeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
