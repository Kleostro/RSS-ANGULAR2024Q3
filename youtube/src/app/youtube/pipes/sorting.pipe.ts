import { Pipe, PipeTransform } from '@angular/core';

import SORTING_BY from '../constants/sorting';
import VideoData from '../interfaces/video-data.interface';

@Pipe({
  name: 'sorting',
  standalone: true,
})
export default class SortingPipe implements PipeTransform {
  transform(videoList: VideoData[], sortBy: { sortBy: string; sortByDirection: boolean } | null): VideoData[] {
    switch (sortBy?.sortBy) {
      case SORTING_BY.PUBLISHED_AT:
        return this.sortByPublishedAt(videoList, sortBy.sortByDirection);
      case SORTING_BY.VIEW_COUNT:
        return this.sortByViewCount(videoList, sortBy.sortByDirection);
      default:
        return videoList;
    }
  }

  sortByPublishedAt(videoList: VideoData[], sortByDirection: boolean): VideoData[] {
    return videoList.sort(
      (a, b) => a.video.snippet.publishedAt.localeCompare(b.video.snippet.publishedAt) * (sortByDirection ? 1 : -1),
    );
  }

  sortByViewCount(videoList: VideoData[], sortByDirection: boolean): VideoData[] {
    return videoList.sort(
      (a, b) =>
        (parseInt(a.video.statistics?.viewCount ?? '0', 10) - parseInt(b.video.statistics?.viewCount ?? '0', 10)) *
        (sortByDirection ? 1 : -1),
    );
  }
}
