import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActicleMenagementComponent } from './acticle-menagement.component';

describe('ActicleMenagementComponent', () => {
  let component: ActicleMenagementComponent;
  let fixture: ComponentFixture<ActicleMenagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActicleMenagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActicleMenagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
