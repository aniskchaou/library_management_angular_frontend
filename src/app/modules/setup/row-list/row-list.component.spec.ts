import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RowListComponent } from './row-list.component';

describe('RowListComponent', () => {
  let component: RowListComponent;
  let fixture: ComponentFixture<RowListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RowListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RowListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
