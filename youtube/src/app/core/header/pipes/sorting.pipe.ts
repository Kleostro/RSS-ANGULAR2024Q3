import { Pipe, PipeTransform } from '@angular/core';

import { Video } from '../models/video-search.model';

@Pipe({
  name: 'sorting',
  standalone: true,
})
export default class SortingPipe implements PipeTransform {
  private sortingDirection = true;

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

  toggleSortingDirection() {
    this.sortingDirection = !this.sortingDirection;
  }

  sortByPublishedAt(videoList: Video[]): Video[] {
    this.toggleSortingDirection();
    return videoList.sort((a, b) => {
      const direction = this.sortingDirection ? 1 : -1;
      return a.snippet.publishedAt.localeCompare(b.snippet.publishedAt) * direction;
    });
  }

  sortByViewCount(videoList: Video[]): Video[] {
    this.toggleSortingDirection();
    return videoList.sort((a, b) => {
      const direction = this.sortingDirection ? 1 : -1;
      const viewCountA = parseInt(a.statistics.viewCount, 10);
      const viewCountB = parseInt(b.statistics.viewCount, 10);
      return (viewCountA - viewCountB) * direction;
    });
  }
}
