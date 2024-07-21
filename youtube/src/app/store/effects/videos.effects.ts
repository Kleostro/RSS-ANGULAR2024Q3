import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import VideoData from '../../youtube/interfaces/video-data.interface';
import VideoSearchResponce, { VideoResponce } from '../../youtube/interfaces/video-response.interface';
import * as VideoActions from '../actions/videos.actions';

@Injectable()
export default class VideoEffects {
  actions$ = inject(Actions);

  httpClient = inject(HttpClient);

  store = inject(Store);

  router = inject(Router);

  searchVideos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VideoActions.searchVideos),
      switchMap(({ searchValue }) =>
        this.httpClient
          .get<VideoSearchResponce>('search', {
            params: {
              type: 'video',
              maxResults: '20',
              q: searchValue,
            },
          })
          .pipe(
            switchMap((data) => this.getHTTPVideoById(data.items.map(({ id }) => id.videoId).join(','))),
            map((data) => ({
              ids: data.items.map(({ id }) => id),
              videos: data.items
                .map((video) => ({ id: video.id, video }))
                .reduce((acc: { [key: string]: VideoData }, { id, video }) => {
                  acc[id] = { video, isCustom: false };
                  return acc;
                }, {}),
            })),
            switchMap((data) => [
              VideoActions.setVideoIds({ ids: data.ids }),
              VideoActions.setVideos({ videos: data.videos }),
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
      switchMap(({ id, video }) => [
        VideoActions.setVideoIds({ ids: [id] }),
        VideoActions.setVideos({ videos: { [id]: { video, isCustom: true } } }),
      ]),
    ),
  );

  getHTTPVideoById(id: string): Observable<VideoResponce> {
    return this.httpClient.get<VideoResponce>('videos', {
      params: {
        id,
        part: 'snippet,statistics',
      },
    });
  }
}
