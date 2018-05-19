import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileApproverComponent } from './profile-approver.component';

describe('ProfileApproverComponent', () => {
  let component: ProfileApproverComponent;
  let fixture: ComponentFixture<ProfileApproverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileApproverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileApproverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
