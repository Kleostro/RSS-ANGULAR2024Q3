import Video from './video.interface';

interface VideoSearchResponce {
  kind: string;
  etag: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: Video[];
}

export default VideoSearchResponce;
