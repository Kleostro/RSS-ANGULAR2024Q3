import { Pipe, PipeTransform } from '@angular/core';

import VideoData from '../interfaces/video-data.interface';

@Pipe({
  name: 'filtering',
  standalone: true,
})
export default class FilteringPipe implements PipeTransform {
  transform(videoList: VideoData[] | null, filterValue: string | null): VideoData[] {
    return videoList
      ? videoList.filter((video) => {
          if (!filterValue) return true;
          const descriptionMatch = video.video.snippet.description.toLowerCase().includes(filterValue.toLowerCase());
          const titleMatch = video.video.snippet.title.toLowerCase().includes(filterValue.toLowerCase());
          return descriptionMatch || titleMatch;
        })
      : [];
  }
}
