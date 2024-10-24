import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTypeMemberComponent } from './view-type-member.component';

describe('ViewTypeMemberComponent', () => {
  let component: ViewTypeMemberComponent;
  let fixture: ComponentFixture<ViewTypeMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewTypeMemberComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewTypeMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
