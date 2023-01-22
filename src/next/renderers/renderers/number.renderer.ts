/* eslint-disable max-params */
import { ellipsisClass, monoFontClass } from '../styles/renderer.styles';

import type { NumberRendererProps } from '../../types/renderers.type';

//  * @param fractionDigits - Decimal digits size

/**
 * Render number format
 *
 * @param value - Number value
 * @param formated - Format number
 * @param fontSize - Font size
 * @param locale - Localization
 * @param monoFont - True or false
 * @param maximumFractionDigits - maximum Decimal digits size
 * @param minimumFractionDigits - minimum Decimal digits size
 * @param injectClass - Css custom class
 * @param style - Decimal style
 */
export const numberRender = ({
  value = null,
  formated = false,
  fontSize = 12,
  locale = 'de-DE',
  monoFont = false,
  maximumFractionDigits = 2,
  minimumFractionDigits = 2,
  injectClass = '',
  style = 'decimal'
}: NumberRendererProps): string => {
  const formatedValue = formated
    ? new Intl.NumberFormat(locale, {
      maximumFractionDigits,
      minimumFractionDigits,
      style
    }).format(style === 'percent' ? Number(value) / 100 : Number(value))
    : value;

  return value !== null && value !== undefined
    ? `<div class="${injectClass} ${ellipsisClass(1, 'right', fontSize)} ${monoFont ? monoFontClass : ''
    }" title="${formatedValue}">${formatedValue}</div>`
    : `<div class="${injectClass} ${ellipsisClass(1, 'right', fontSize)} ${monoFont ? monoFontClass : ''
    }">-</div>`;
};
