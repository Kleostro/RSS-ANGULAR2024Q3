import { InjectionToken, Provider } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable, switchMap } from 'rxjs';

import VideoData from '../../interfaces/video-data.interface';
import VideoDataService from '../../services/video-data.service';

export const VIDEO_TOKEN = new InjectionToken<Observable<VideoData>>('A stream with detailed video card data');

export const videoFactory = ({ params }: ActivatedRoute, videoDataService: VideoDataService): Observable<VideoData> =>
  params.pipe(
    switchMap((props) => {
      const { id } = props;
      return videoDataService.getVideoById(id);
    }),
  );

export const VIDEO_PROVIDERS: Provider[] = [
  {
    provide: VIDEO_TOKEN,
    deps: [ActivatedRoute, VideoDataService],
    useFactory: videoFactory,
  },
];
