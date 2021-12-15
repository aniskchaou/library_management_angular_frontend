import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WriterListComponent } from './writer-list.component';

describe('WriterListComponent', () => {
  let component: WriterListComponent;
  let fixture: ComponentFixture<WriterListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WriterListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WriterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
