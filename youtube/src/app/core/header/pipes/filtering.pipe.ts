import { Pipe, PipeTransform } from '@angular/core';

import { Video } from '../models/video-search.model';

@Pipe({
  name: 'filtering',
  standalone: true,
})
export class FilteringPipe implements PipeTransform {
  transform(value: string, args: Video[]): Video[] {
    return [...args].filter((video) => video.snippet.tags.some((tag) => tag.includes(value.toLowerCase())));
  }
}
