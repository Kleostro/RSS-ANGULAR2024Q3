import { createReducer, on } from '@ngrx/store';

import VideoData from '../../youtube/interfaces/video-data.interface';
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
      videoIds: state.videoIds ? state.videoIds.filter((id) => id !== action.id) : null,
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
  on(youtubeActions.setVideos, (state, action): YoutubeState => {
    const customVideos: { [key: string]: VideoData } = {};

    state.videoIds?.forEach((id) => {
      if (state.videos[id]) {
        if (state.videos[id].isCustom) {
          customVideos[id] = state.videos[id];
        }
      }
    });

    return {
      ...state,
      videos: { ...customVideos, ...action.videos },
    };
  }),
  on(youtubeActions.setVideoIds, (state, action): YoutubeState => {
    const customVideoIds = Object.keys(state.videos).filter((id) => state.videos[id].isCustom);
    return {
      ...state,
      videoIds: [...customVideoIds, ...action.ids],
    };
  }),
  on(
    youtubeActions.savePageTokens,
    (state, action): YoutubeState => ({
      ...state,
      pageTokens: {
        ...state.pageTokens,
        prevPageToken: action.tokens.prevPageToken,
        nextPageToken: action.tokens.nextPageToken,
      },
    }),
  ),
  on(
    youtubeActions.setCustomVideo,
    (state, action): YoutubeState => ({
      ...state,
      videos: { ...action.video, ...state.videos },
      videoIds: state.videoIds ? [...state.videoIds, action.id] : [action.id],
    }),
  ),
);

export default youtubeReducer;
