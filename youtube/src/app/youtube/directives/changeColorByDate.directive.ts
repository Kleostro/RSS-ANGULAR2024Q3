import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appChangeColorByDate]',
  standalone: true,
})
export default class ChangeColorByDateDirective {
  @Input() publishedAt = '';

  @Input() propertyNames: string[] = [];

  @HostBinding('style') get hostStyle() {
    const styles: { [key: string]: string } = {};
    this.propertyNames.forEach((propertyName) => {
      styles[propertyName] = this.getColorByDate(this.publishedAt);
    });
    return styles;
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
