import Video from './video.interface';

interface BaseVideoResponce {
  kind: string;
  etag: string;
  nextPageToken: string;
  prevPageToken: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
}

interface VideoSearchResponce extends BaseVideoResponce {
  items: {
    kind: string;
    etag: string;
    id: {
      kind: string;
      videoId: string;
    };
  }[];
}

export interface VideoResponce extends BaseVideoResponce {
  items: Video[];
}

export default VideoSearchResponce;
