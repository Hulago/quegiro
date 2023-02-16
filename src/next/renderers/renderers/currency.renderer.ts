/* eslint-disable max-params */
import { ellipsisClass, monoFontClass } from '../styles/renderer.styles';

import type { CurrencyRendererProps } from '../../types/renderers.type';

import { isEmptyString } from '../../composables/utils.composable';

export const currencyRender = ({
  value,
  currency = 'EUR',
  fontSize = 11,
  monoFont = true,
  locale = 'de-DE',
  maximumFractionDigits = 2,
  minimumFractionDigits = 2,
  injectClass = ''
}: CurrencyRendererProps): string => {
  try {
    if (typeof value !== 'undefined' && value !== null) {
      const formatedValue = new Intl.NumberFormat(locale, {
        currency: isEmptyString(currency) ? 'EUR' : currency,
        maximumFractionDigits,
        minimumFractionDigits,
        style: 'currency'
      }).format(Number(value));

      return `<div class="${injectClass} ${ellipsisClass(
        1,
        'right',
        fontSize
      )} ${
        monoFont ? monoFontClass : ''
      }" title="${formatedValue}">${formatedValue}</div>`;
    } else {
      return `<div class="${injectClass} ${ellipsisClass(
        1,
        'right',
        fontSize
      )} ${monoFont ? monoFontClass : ''}">-</div>`;
    }
  } catch (e) {
    console.log('Currency error', '#' + currency + '#', locale);
    return '<div>Error</div>';
  }
};
