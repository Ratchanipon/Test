import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovePersonalComponent } from './approve-personal.component';

describe('ApprovePersonalComponent', () => {
  let component: ApprovePersonalComponent;
  let fixture: ComponentFixture<ApprovePersonalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovePersonalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovePersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
