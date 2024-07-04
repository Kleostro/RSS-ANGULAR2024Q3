import { ComponentFixture, TestBed } from '@angular/core/testing';

import VideoFilteringComponent from './video-filtering.component';

describe('VideoFilteringComponent', () => {
  let component: VideoFilteringComponent;
  let fixture: ComponentFixture<VideoFilteringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoFilteringComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VideoFilteringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
