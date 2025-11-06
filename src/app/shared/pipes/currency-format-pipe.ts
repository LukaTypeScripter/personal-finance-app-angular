import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyFormat',
  standalone: true
})
export class CurrencyFormatPipe implements PipeTransform {

  transform(value: unknown, currencyCode: string = 'USD'): string {
    if (value == null) return this.formatCurrency(0, currencyCode);

    if (typeof value === 'number') {
      return this.formatCurrency(value, currencyCode);
    }

    return '';
  }

  private formatCurrency(value: number, currencyCode: string): string {
    const absValue = Math.abs(value);
    const formattedValue = absValue.toFixed(2);

    let symbol: string;
    let position: 'before' | 'after' = 'before';

    switch (currencyCode.toUpperCase()) {
      case 'USD':
        symbol = '$';
        position = 'before';
        break;
      case 'GEO':
        symbol = '₾';
        position = 'after';
        break;
      default:
        symbol = '$';
        position = 'before';
    }

    const sign = value < 0 ? '-' : '';

    if (position === 'before') {
      return `${sign}${symbol}${formattedValue}`;
    } else {
      return `${sign}${formattedValue} ${symbol}`;
    }
  }

}
