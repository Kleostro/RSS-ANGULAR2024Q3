import { ComponentFixture, TestBed } from '@angular/core/testing';

import VideoSearchingComponent from './video-searching.component';

describe('VideoSearchingComponent', () => {
  let component: VideoSearchingComponent;
  let fixture: ComponentFixture<VideoSearchingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoSearchingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VideoSearchingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
