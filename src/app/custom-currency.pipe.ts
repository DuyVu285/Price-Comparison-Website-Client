import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customCurrency',
})
export class CustomCurrencyPipe implements PipeTransform {
  transform(
    value: number,
    currency: string = 'VND',
    locale: string = 'vi-VN'
  ): string | null {
    if (value == null) return null;

    const formattedValue = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
      currencyDisplay: 'symbol',
    }).format(value);

    const parts = formattedValue.match(/(\D*)(\d+.*)/);

    if (parts && parts.length > 2) {
      return `${parts[2]} ${parts[1].trim()}`;
    }

    return formattedValue;
  }
}
