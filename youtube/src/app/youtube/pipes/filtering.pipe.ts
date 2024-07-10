import { Pipe, PipeTransform } from '@angular/core';

import Video from '../interfaces/video.interface';

@Pipe({
  name: 'filtering',
  standalone: true,
})
export default class FilteringPipe implements PipeTransform {
  transform(value: string, args: Video[]): Video[] {
    return args.filter((video) => {
      const descriptionMatch = video.snippet.description.toLowerCase().includes(value.toLowerCase());
      const titleMatch = video.snippet.title.toLowerCase().includes(value.toLowerCase());
      return descriptionMatch || titleMatch;
    });
  }
}
