import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactMemberComponent } from './contact-member.component';

describe('ContactMemberComponent', () => {
  let component: ContactMemberComponent;
  let fixture: ComponentFixture<ContactMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactMemberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
