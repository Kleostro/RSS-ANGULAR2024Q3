import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import CustomLinkComponent from '../../../shared/components/custom-link/custom-link.component';
import { selectFavoriteVideos } from '../../../store/selectors/videos.selector';
import VideoListComponent from '../../components/video-list/video-list.component';
import FavoriteComponent from './favorite.component';

describe('FavoriteComponent', () => {
  let component: FavoriteComponent;
  let fixture: ComponentFixture<FavoriteComponent>;
  let store: MockStore;
  const initialState = { favoriteIds: ['1', '2'] };
  const mockFavoriteVideos = [
    {
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
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        FavoriteComponent,
        CustomLinkComponent,
        VideoListComponent,
      ],
      providers: [provideMockStore({ initialState }), { provide: ActivatedRoute, useValue: {} }],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    store.overrideSelector(selectFavoriteVideos, mockFavoriteVideos);

    fixture = TestBed.createComponent(FavoriteComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the video list when there are favorite videos', () => {
    const videoList = fixture.debugElement.query(By.css('app-video-list'));
    expect(videoList).toBeTruthy();
    expect(videoList.attributes['ng-reflect-videos']).toBeTruthy();
  });

  it('should display a message when there are no favorite videos', () => {
    store.overrideSelector(selectFavoriteVideos, []);
    store.refreshState();
    fixture.detectChanges();

    const message = fixture.debugElement.query(By.css('.video-list__title')).nativeElement;
    expect(message?.textContent).toContain("You don't have any favorite videos");
  });
});
