import VideoData from '../../youtube/interfaces/video-data.interface';

interface YoutubeState {
  videos: {
    [key: string]: VideoData;
  };
  videoIds: string[];
  favoriteIds: string[];
}

export default YoutubeState;
