import VideoData from '../../youtube/interfaces/video-data.interface';
import * as youtubeActions from '../actions/videos.actions';
import youtubeInitialState from '../state/videos-state';
import youtubeReducer from './videos.reducer';

describe('youtubeReducer', () => {
  it('should return the initial state', () => {
    const action = { type: 'Unknown' };
    const state = youtubeReducer(undefined, action);
    expect(state).toEqual(youtubeInitialState);
  });

  it('should handle removeCustomCard', () => {
    const action = youtubeActions.removeCustomCard({ id: 'video1' });
    const initialState = {
      ...youtubeInitialState,
      videoIds: ['video1', 'video2'],
      videos: {
        video1: { video: { id: 'video1' }, isCustom: true } as VideoData,
        video2: { video: { id: 'video2' }, isCustom: false } as VideoData,
      },
    };
    const expectedState = {
      ...youtubeInitialState,
      videoIds: ['video2'],
      videos: {
        video2: { video: { id: 'video2' }, isCustom: false } as VideoData,
      },
    };
    const state = youtubeReducer(initialState, action);
    expect(state).toEqual(expectedState);
  });

  it('should handle addToFavorites', () => {
    const action = youtubeActions.addToFavorites({ id: 'video1' });
    const initialState = {
      ...youtubeInitialState,
      favoriteIds: [],
    };
    const expectedState = {
      ...youtubeInitialState,
      favoriteIds: ['video1'],
    };
    const state = youtubeReducer(initialState, action);
    expect(state).toEqual(expectedState);
  });

  it('should handle removeFromFavorites', () => {
    const action = youtubeActions.removeFromFavorites({ id: 'video1' });
    const initialState = {
      ...youtubeInitialState,
      favoriteIds: ['video1', 'video2'],
    };
    const expectedState = {
      ...youtubeInitialState,
      favoriteIds: ['video2'],
    };
    const state = youtubeReducer(initialState, action);
    expect(state).toEqual(expectedState);
  });

  it('should handle setVideos', () => {
    const action = youtubeActions.setVideos({
      videos: { video3: { video: { id: 'video3' }, isCustom: false } as VideoData },
    });
    const initialState = {
      ...youtubeInitialState,
      videoIds: ['video1'],
      videos: {
        video1: { video: { id: 'video1' }, isCustom: true } as VideoData,
      },
    };
    const expectedState = {
      ...youtubeInitialState,
      videoIds: ['video1'],
      videos: {
        video1: { video: { id: 'video1' }, isCustom: true } as VideoData,
        video3: { video: { id: 'video3' }, isCustom: false } as VideoData,
      },
    };
    const state = youtubeReducer(initialState, action);
    expect(state).toEqual(expectedState);
  });

  it('should handle setVideoIds', () => {
    const action = youtubeActions.setVideoIds({ ids: ['video3'] });
    const initialState = {
      ...youtubeInitialState,
      videos: {
        video1: { video: { id: 'video1' }, isCustom: true } as VideoData,
      },
    };
    const expectedState = {
      ...youtubeInitialState,
      videoIds: ['video1', 'video3'],
      videos: {
        video1: { video: { id: 'video1' }, isCustom: true } as VideoData,
      },
    };
    const state = youtubeReducer(initialState, action);
    expect(state).toEqual(expectedState);
  });

  it('should handle savePageTokens', () => {
    const action = youtubeActions.savePageTokens({ tokens: { prevPageToken: 'prev', nextPageToken: 'next' } });
    const initialState = {
      ...youtubeInitialState,
      pageTokens: {
        prevPageToken: 'prev',
        nextPageToken: 'next',
      },
    };
    const expectedState = {
      ...youtubeInitialState,
      pageTokens: {
        prevPageToken: 'prev',
        nextPageToken: 'next',
      },
    };
    const state = youtubeReducer(initialState, action);
    expect(state).toEqual(expectedState);
  });

  it('should handle searchVideos', () => {
    const action = youtubeActions.searchVideos({ searchValue: 'test', pagination: 'page1' });
    const initialState = {
      ...youtubeInitialState,
      searchValue: 'test',
      pagination: 'page1',
    };
    const expectedState = {
      ...youtubeInitialState,
      searchValue: 'test',
      pagination: 'page1',
    };
    const state = youtubeReducer(initialState, action);
    expect(state).toEqual(expectedState);
  });
});
