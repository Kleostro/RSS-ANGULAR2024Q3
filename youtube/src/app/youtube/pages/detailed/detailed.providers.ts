import { InjectionToken, Provider } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable, switchMap } from 'rxjs';

import VideoData from '../../interfaces/video-data.interface';
import VideoDataService from '../../services/video-data.service';

export const VIDEO_DATA = new InjectionToken<Observable<VideoData>>('A stream with current video card data');

export function videoFactory({ params }: ActivatedRoute, videoDataService: VideoDataService): Observable<VideoData> {
  return params.pipe(
    switchMap((props) => {
      const { id } = props;
      return videoDataService.getVideoById(id);
    }),
  );
}

export const VIDEO_PROVIDERS: Provider[] = [
  {
    provide: VIDEO_DATA,
    deps: [ActivatedRoute, VideoDataService],
    useFactory: videoFactory,
  },
];
