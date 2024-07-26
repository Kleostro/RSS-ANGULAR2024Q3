import VideoData from '../../youtube/interfaces/video-data.interface';

interface YoutubeState {
  videos: {
    [key: string]: VideoData;
  };
  videoIds: string[] | null;
  favoriteIds: string[];
  pageTokens: {
    prevPageToken: string | null;
    nextPageToken: string | null;
  };
}

export default YoutubeState;
