import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectMenagementComponent } from './project-menagement.component';

describe('ProjectMenagementComponent', () => {
  let component: ProjectMenagementComponent;
  let fixture: ComponentFixture<ProjectMenagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectMenagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectMenagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
