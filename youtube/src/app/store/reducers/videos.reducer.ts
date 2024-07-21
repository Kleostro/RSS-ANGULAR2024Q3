import { createReducer, on } from '@ngrx/store';

import * as youtubeActions from '../actions/videos.actions';
import YoutubeState from '../interfaces/youtube-state.interface';
import youtubeInitialState from '../state/videos-state';

const youtubeReducer = createReducer(
  youtubeInitialState,
  on(youtubeActions.removeCustomCard, (state, action): YoutubeState => {
    const videos = { ...state.videos };
    delete videos[action.id];
    return {
      ...state,
      videoIds: state.videoIds.filter((id) => id !== action.id),
      videos,
    };
  }),
  on(
    youtubeActions.addToFavorites,
    (state, action): YoutubeState => ({
      ...state,
      favoriteIds: [...state.favoriteIds, action.id],
    }),
  ),
  on(
    youtubeActions.removeFromFavorites,
    (state, action): YoutubeState => ({
      ...state,
      favoriteIds: state.favoriteIds.filter((id) => id !== action.id),
    }),
  ),
  on(
    youtubeActions.setVideos,
    (state, action): YoutubeState => ({
      ...state,
      videos: { ...state.videos, ...action.videos },
    }),
  ),
  on(
    youtubeActions.setVideoIds,
    (state, action): YoutubeState => ({ ...state, videoIds: [...state.videoIds, ...action.ids] }),
  ),
);

export default youtubeReducer;
