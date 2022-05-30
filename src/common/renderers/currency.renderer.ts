/* eslint-disable max-params */
import { ellipsisClass, monoFontClass } from '../styles/renderer.styles';

export const currencyRender =
  (
    {
      currency,
      fontSize,
      locale,
      monoFont
    }: {
      currency?: string;
      fontSize?: number;
      locale?: string;
      monoFont?: boolean;
    } = {
      currency: 'EUR',
      fontSize: 12,
      locale: 'de-DE',
      monoFont: true
    }
  ) =>
  (value: number | null) => {
    if (typeof value !== 'undefined' && value !== null) {
      const formatedValue = new Intl.NumberFormat(locale, {
        currency,
        style: 'currency'
      }).format(Number(value));

      return `<div class="${ellipsisClass(1, 'right', fontSize)} ${
        monoFont ? monoFontClass : ''
      }" title="${formatedValue}">${formatedValue}</div>`;
    } else {
      return `<div class="${ellipsisClass(1, 'right', fontSize)} ${
        monoFont ? monoFontClass : ''
      }">-</div>`;
    }
  };
