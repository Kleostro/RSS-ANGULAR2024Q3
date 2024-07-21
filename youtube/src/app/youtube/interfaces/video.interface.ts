import Snippet from './snippet.interface';
import Statistics from './statistics.interface';

interface Video {
  id: string;
  snippet: Snippet;
  statistics: Statistics | null;
}

export default Video;
