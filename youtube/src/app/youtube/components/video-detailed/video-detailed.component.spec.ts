import { ComponentFixture, TestBed } from '@angular/core/testing';

import VideoDetailedComponent from './video-detailed.component';

describe('VideoDetailedComponent', () => {
  let component: VideoDetailedComponent;
  let fixture: ComponentFixture<VideoDetailedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoDetailedComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VideoDetailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
