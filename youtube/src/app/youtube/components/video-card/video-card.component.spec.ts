import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { selectFavoriteIds } from '../../../store/selectors/videos.selector';
import VideoDataService from '../../services/video-data.service';
import VideoCardComponent from './video-card.component';

describe('VideoCardComponent', () => {
  let component: VideoCardComponent;
  let fixture: ComponentFixture<VideoCardComponent>;
  let store: MockStore;
  const initialState = { favoriteIds: ['1', '2'] };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, VideoCardComponent],
      providers: [VideoDataService, provideMockStore({ initialState }), { provide: ActivatedRoute, useValue: {} }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(VideoCardComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store) as MockStore;
    store.overrideSelector(selectFavoriteIds, initialState.favoriteIds);
    component.videoData = {
      video: {
        id: '1',
        snippet: {
          title: 'Test Video',
          publishedAt: '',
          description: 'Test description',
          tags: ['test', 'video'],
          thumbnails: {
            medium: {
              url: 'test-url',
            },
          },
        },
        statistics: {
          viewCount: '100',
          likeCount: '10',
          commentCount: '5',
        },
      },
      isCustom: false,
    };
    fixture.detectChanges();
  });

  it('should create the video card', () => {
    expect(component).toBeTruthy();
  });

  it('should display video title', () => {
    const titleElement = fixture.debugElement.query(By.css('.card-title')).nativeElement;
    expect(titleElement.textContent).toContain('Test Video');
  });

  it('should display video statistics', () => {
    const statisticsElements = fixture.debugElement.queryAll(By.css('app-video-statistics'));
    expect(statisticsElements.length).toBe(3);
  });

  it('should show loader when image is loading', () => {
    component.isImageLoading.set(true);
    fixture.detectChanges();
    const loaderElement = fixture.debugElement.query(By.css('app-custom-loader'));
    expect(loaderElement).not.toBeNull();
  });

  it('should handle image load error', () => {
    const imgElement = fixture.debugElement.query(By.css('img')).nativeElement;
    imgElement.dispatchEvent(new Event('error'));
    fixture.detectChanges();
    expect(imgElement.src).toContain('placeholder.png');
  });

  it('should check if video is a favorite', (done) => {
    component.hasFavorite$.subscribe((isFavorite) => {
      expect(isFavorite).toBe(true);
      done();
    });
  });
});
