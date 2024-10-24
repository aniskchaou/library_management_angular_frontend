import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewQrcodeComponent } from './view-qrcode.component';

describe('ViewQrcodeComponent', () => {
  let component: ViewQrcodeComponent;
  let fixture: ComponentFixture<ViewQrcodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewQrcodeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewQrcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
