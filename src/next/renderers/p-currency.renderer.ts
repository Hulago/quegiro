/* eslint-disable max-params */
import { get } from 'lodash-es';

import { loaderRender } from './renderers/loader.renderer';
import { currencyRender } from './renderers/currency.renderer';
import type {
  PCurrencyRendererProps,
  ParamsRendererProp
} from '../types/renderers.type';

/**
 * Render currency format
 *
 * @param field - Property key
 * @param currency - Currency type
 * @param fontSize - Font size
 * @param monoFont - True or false
 * @param locale - Currency localization
 * @param maximumFractionDigits - maximum Decimal digits size
 * @param minimumFractionDigits - minimum Decimal digits size
 * @param injectClass - Custom css class
 */
export const PCurrencyRenderer =
  ({
    field,
    currency = 'EUR',
    fontSize = 11,
    monoFont = true,
    maximumFractionDigits = 2,
    minimumFractionDigits = 2,
    locale = 'de-DE',
    injectClass = ''
  }: PCurrencyRendererProps) =>
  (params: ParamsRendererProp) => {
    if (params.data === undefined && params.value === undefined) {
      return loaderRender();
    }

    return currencyRender({
      value: get(params.data, field || '', params.value),
      currency: get(params.data, currency, 'EUR') as string,
      fontSize,
      monoFont,
      locale,
      injectClass,
      maximumFractionDigits,
      minimumFractionDigits
    });
  };
