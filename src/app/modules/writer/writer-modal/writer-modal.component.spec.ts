import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WriterModalComponent } from './writer-modal.component';

describe('WriterModalComponent', () => {
  let component: WriterModalComponent;
  let fixture: ComponentFixture<WriterModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WriterModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WriterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
