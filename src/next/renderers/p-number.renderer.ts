/* eslint-disable max-params */
import { get } from 'lodash-es';

import { loaderRender } from './renderers/loader.renderer';
import { numberRender } from './renderers/number.renderer';
import type {
  PNumberRendererProps,
  ParamsRendererProp
} from '../types/renderers.type';

/**
 * Render number format
 *
 * @param field - Property key
 * @param formated - Format number
 * @param fontSize - Font size
 * @param locale - Localization
 * @param monoFont - True or false
 * @param maximumFractionDigits - maximum Decimal digits size
 * @param minimumFractionDigits - minimum Decimal digits size
 * @param injectClass - Css custom class
 * @param style - Decimal style
 */
export const PNumberRenderer =
  ({
    field,
    formated = false,
    fontSize = 12,
    locale = 'de-DE',
    monoFont = false,
    maximumFractionDigits = 2,
    minimumFractionDigits = 2,
    injectClass = '',
    style = 'decimal'
  }: PNumberRendererProps) =>
  (params: ParamsRendererProp) => {
    if (params.data === undefined && params.value === undefined) {
      return loaderRender();
    }
    return numberRender({
      value: get(params.data, field || '', params.value),
      formated,
      fontSize,
      locale,
      monoFont,
      maximumFractionDigits,
      minimumFractionDigits,
      injectClass,
      style
    });
  };
