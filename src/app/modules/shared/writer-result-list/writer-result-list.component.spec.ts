import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WriterResultListComponent } from './writer-result-list.component';

describe('WriterResultListComponent', () => {
  let component: WriterResultListComponent;
  let fixture: ComponentFixture<WriterResultListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WriterResultListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WriterResultListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
