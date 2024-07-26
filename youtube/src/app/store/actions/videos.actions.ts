import { createAction, props } from '@ngrx/store';

import CustomCard from '../../youtube/interfaces/custom-card.interface';
import VideoData from '../../youtube/interfaces/video-data.interface';

export const setVideos = createAction('[Youtube] Set Videos', props<{ videos: { [key: string]: VideoData } }>());
export const setCustomVideo = createAction(
  '[Youtube] Set Custom Video',
  props<{ video: { [key: string]: VideoData }; id: string }>(),
);
export const setVideoIds = createAction('[Youtube] Set Video Ids', props<{ ids: string[] | string }>());
export const setCustomCard = createAction('[Youtube] Set Custom Card', props<{ card: CustomCard }>());
export const removeCustomCard = createAction('[Youtube] Remove Custom Card', props<{ id: string }>());
export const addToFavorites = createAction('[Youtube] Add To Favorites', props<{ id: string }>());
export const removeFromFavorites = createAction('[Youtube] Remove From Favorites', props<{ id: string }>());
export const searchVideos = createAction(
  '[Youtube] Search Videos',
  props<{ searchValue: string; pagination?: string }>(),
);
export const savePageTokens = createAction(
  '[Youtube] Save Page Tokens',
  props<{
    tokens: {
      prevPageToken: string | null;
      nextPageToken: string | null;
    };
  }>(),
);
