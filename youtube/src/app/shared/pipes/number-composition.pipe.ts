import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberComposition',
  standalone: true,
})
export default class NumberCompositionPipe implements PipeTransform {
  transform(value: number | string): string {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }
}
