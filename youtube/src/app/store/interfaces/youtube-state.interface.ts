import VideoData from '../../youtube/interfaces/video-data.interface';

interface YoutubeState {
  videos: {
    [key: string]: VideoData;
  };
  videoIds: string[] | null;
  favoriteIds: string[];
}

export default YoutubeState;
