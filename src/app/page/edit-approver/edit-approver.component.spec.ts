import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditApproverComponent } from './edit-approver.component';

describe('EditApproverComponent', () => {
  let component: EditApproverComponent;
  let fixture: ComponentFixture<EditApproverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditApproverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditApproverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
