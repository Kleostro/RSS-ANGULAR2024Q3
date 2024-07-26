import YoutubeState from '../interfaces/youtube-state.interface';

const youtubeInitialState: YoutubeState = {
  videos: {},
  videoIds: null,
  favoriteIds: [],
  pageTokens: {
    prevPageToken: null,
    nextPageToken: null,
  },
};

export default youtubeInitialState;
