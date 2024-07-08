import { Pipe, PipeTransform } from '@angular/core';

import Video from '../interfaces/video.interface';

@Pipe({
  name: 'sorting',
  standalone: true,
})
export default class SortingPipe implements PipeTransform {
  private publishedDirection = true;

  private viewCountDirection = true;

  transform(value: string, args: Video[]): Video[] {
    switch (value) {
      case 'publishedAt':
        return this.sortByPublishedAt(args);
      case 'viewCount':
        return this.sortByViewCount(args);
      default:
        return args;
    }
  }

  sortByPublishedAt(videoList: Video[]): Video[] {
    this.publishedDirection = !this.publishedDirection;
    return videoList.sort((a, b) => {
      const direction = this.publishedDirection ? 1 : -1;
      return a.snippet.publishedAt.localeCompare(b.snippet.publishedAt) * direction;
    });
  }

  sortByViewCount(videoList: Video[]): Video[] {
    this.viewCountDirection = !this.viewCountDirection;
    return videoList.sort((a, b) => {
      const direction = this.viewCountDirection ? 1 : -1;
      const viewCountA = parseInt(a.statistics.viewCount, 10);
      const viewCountB = parseInt(b.statistics.viewCount, 10);
      return (viewCountA - viewCountB) * direction;
    });
  }
}
