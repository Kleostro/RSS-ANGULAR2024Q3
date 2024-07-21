import { createFeatureSelector, createSelector } from '@ngrx/store';

import YoutubeState from '../interfaces/youtube-state.interface';

export const selectYoutube = createFeatureSelector<YoutubeState>('youtube');
export const selectVideoById = (id: string) => createSelector(selectYoutube, (state: YoutubeState) => state.videos[id]);
export const selectVideos = createSelector(selectYoutube, (state: YoutubeState) => [
  ...state.videoIds.map((id) => state.videos[id]).sort((a, b) => Number(!a.isCustom) - Number(!b.isCustom)),
]);
export const selectFavoriteIds = createSelector(selectYoutube, (state: YoutubeState) => state.favoriteIds);
export const selectFavoriteVideos = createSelector(selectYoutube, (state: YoutubeState) => [
  ...state.favoriteIds.map((id) => state.videos[id]),
]);
