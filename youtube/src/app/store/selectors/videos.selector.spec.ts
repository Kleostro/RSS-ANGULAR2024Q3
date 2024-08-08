import YoutubeState from '../interfaces/youtube-state.interface';
import { selectFavoriteIds, selectPageTokens, selectYoutube } from './videos.selector';

describe('Youtube Selectors', () => {
  const initialState: YoutubeState = {
    videoIds: ['video1', 'video2'],
    videos: {
      video1: {
        video: {
          id: 'video1',
          snippet: {
            publishedAt: '2020-01-01',
            title: 'video1',
            thumbnails: { medium: { url: 'url' } },
            tags: [],
            description: '',
          },
          statistics: null,
        },
        isCustom: true,
      },
      video2: {
        video: {
          id: 'video2',
          snippet: {
            publishedAt: '2020-01-01',
            title: 'video2',
            thumbnails: { medium: { url: 'url' } },
            tags: [],
            description: '',
          },
          statistics: null,
        },
        isCustom: false,
      },
    },
    favoriteIds: ['video1'],
    pageTokens: {
      prevPageToken: 'prevToken',
      nextPageToken: 'nextToken',
    },
  };

  it('should select the youtube state', () => {
    const result = selectYoutube.projector(initialState);
    expect(result).toEqual(initialState);
  });

  it('should select favorite ids', () => {
    const result = selectFavoriteIds.projector(initialState);
    expect(result).toEqual(['video1']);
  });

  it('should select page tokens', () => {
    const result = selectPageTokens.projector(initialState);
    expect(result).toEqual(initialState.pageTokens);
  });
});
