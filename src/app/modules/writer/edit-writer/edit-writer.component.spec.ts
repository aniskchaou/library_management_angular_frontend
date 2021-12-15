import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWriterComponent } from './edit-writer.component';

describe('EditWriterComponent', () => {
  let component: EditWriterComponent;
  let fixture: ComponentFixture<EditWriterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditWriterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditWriterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
