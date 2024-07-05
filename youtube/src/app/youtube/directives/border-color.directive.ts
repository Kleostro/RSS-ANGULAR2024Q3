import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appBorderColor]',
  standalone: true,
})
export default class BorderColorDirective {
  @Input() publishedAt = '';

  @HostBinding('style.borderColor') get borderColor() {
    return this.publishedAt ? this.getColorByDate(this.publishedAt) : '';
  }

  getColorByDate(date: string): string {
    const now = new Date();
    const publishedAt = new Date(date);
    const diffInMonths = (now.getFullYear() - publishedAt.getFullYear()) * 12 + now.getMonth() - publishedAt.getMonth();
    const diffInDays = Math.round((now.getTime() - publishedAt.getTime()) / (1000 * 60 * 60 * 24));

    const colorConditions = [
      { color: 'blue', condition: diffInDays < 7 },
      { color: 'green', condition: diffInDays >= 7 && diffInDays <= 30 },
      { color: 'yellow', condition: diffInMonths >= 1 && diffInMonths <= 6 },
      { color: 'red', condition: diffInMonths > 6 },
    ];

    return colorConditions.find(({ condition }) => condition)?.color || 'blue';
  }
}
