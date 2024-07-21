import { ComponentFixture, TestBed } from '@angular/core/testing';

import VideoSortingComponent from './video-sorting.component';

describe('VideoSortingComponent', () => {
  let component: VideoSortingComponent;
  let fixture: ComponentFixture<VideoSortingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoSortingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VideoSortingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
