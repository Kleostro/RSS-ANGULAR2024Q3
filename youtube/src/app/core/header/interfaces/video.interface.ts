import Snippet from './snippet.interface';
import Statistics from './statistics.interface';

interface Video {
  kind: string;
  etag: string;
  id: string;
  snippet: Snippet;
  statistics: Statistics;
}

export default Video;
