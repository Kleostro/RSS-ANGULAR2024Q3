import { Pipe, PipeTransform } from '@angular/core';

import SORTING_BY from '../constants/sorting';
import Video from '../interfaces/video.interface';

@Pipe({
  name: 'sorting',
  standalone: true,
})
export default class SortingPipe implements PipeTransform {
  private publishedDirection = true;

  private viewCountDirection = true;

  transform(videoList: Video[], sortBy: string): Video[] {
    switch (sortBy) {
      case SORTING_BY.PUBLISHED_AT:
        return this.sortByPublishedAt(videoList);
      case SORTING_BY.VIEW_COUNT:
        return this.sortByViewCount(videoList);
      default:
        return videoList;
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
