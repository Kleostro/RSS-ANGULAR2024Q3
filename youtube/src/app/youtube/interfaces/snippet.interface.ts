import Thumbnails from './thumbnails.interface';

interface Snippet {
  publishedAt: string;
  title: string;
  description: string;
  thumbnails: Thumbnails;
  tags: string[];
}

export default Snippet;
