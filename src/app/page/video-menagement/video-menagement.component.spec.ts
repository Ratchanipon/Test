import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoMenagementComponent } from './video-menagement.component';

describe('VideoMenagementComponent', () => {
  let component: VideoMenagementComponent;
  let fixture: ComponentFixture<VideoMenagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoMenagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoMenagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
