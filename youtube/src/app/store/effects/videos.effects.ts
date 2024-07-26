import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { map, switchMap } from 'rxjs/operators';

import VideoData from '../../youtube/interfaces/video-data.interface';
import Video from '../../youtube/interfaces/video.interface';
import VideoDataService from '../../youtube/services/video-data.service';
import * as VideoActions from '../actions/videos.actions';

@Injectable()
export default class VideoEffects {
  actions$ = inject(Actions);

  httpClient = inject(HttpClient);

  store = inject(Store);

  router = inject(Router);

  videoDataService = inject(VideoDataService);

  searchVideos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VideoActions.searchVideos),
      switchMap((requestParams) =>
        this.videoDataService.getVideos(requestParams).pipe(
          switchMap((data) =>
            this.videoDataService.getHTTPVideoById(data.items.map(({ id }) => id.videoId).join(',')).pipe(
              map((items) => ({
                items: items.items,
                tokens: {
                  prevPageToken: data.prevPageToken ?? null,
                  nextPageToken: data.nextPageToken ?? null,
                },
              })),
            ),
          ),
          map((data) => ({
            ids: data.items.map(({ id }) => id),
            videos: this.convertDataToVideos(data.items),
            tokens: data.tokens,
          })),
          switchMap((data) => [
            VideoActions.setVideoIds({ ids: data.ids }),
            VideoActions.setVideos({ videos: data.videos }),
            VideoActions.savePageTokens({ tokens: data.tokens }),
          ]),
        ),
      ),
    ),
  );

  setCustomCard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VideoActions.setCustomCard),
      map(({ card }) => {
        const id = crypto.randomUUID();
        const video = {
          statistics: null,
          id,
          snippet: {
            publishedAt: new Date(card.publishedAt).toISOString(),
            title: card.title,
            description: card.description,
            thumbnails: {
              medium: {
                url: card.cover,
              },
            },
            tags: card.tags.map((tag) => tag.tag ?? ''),
          },
        };

        return { id, video };
      }),
      switchMap(({ id, video }) => [VideoActions.setCustomVideo({ video: { [id]: { video, isCustom: true } }, id })]),
    ),
  );

  convertDataToVideos(data: Video[]) {
    return data
      .map((video) => ({ id: video.id, video }))
      .reduce((acc: { [key: string]: VideoData }, { id, video }) => {
        acc[id] = { video, isCustom: false };
        return acc;
      }, {});
  }
}
