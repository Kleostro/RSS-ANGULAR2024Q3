import { Pipe, PipeTransform } from '@angular/core';

import { Video } from '../models/video-search.model';

@Pipe({
  name: 'filtering',
  standalone: true,
})
export default class FilteringPipe implements PipeTransform {
  transform(value: string, args: Video[]): Video[] {
    return args.filter((video) => {
      const descriptionMatch = video.snippet.description.toLowerCase().includes(value.toLowerCase());
      const titleMatch = video.snippet.title.toLowerCase().includes(value.toLowerCase());
      const tagsMatch = video.snippet.tags.some((tag) => tag.toLowerCase().includes(value.toLowerCase()));
      return descriptionMatch || tagsMatch || titleMatch;
    });
  }
}
