/* eslint-disable max-params */
import { get } from 'lodash-es';

import { loaderRender } from './renderers/loader.renderer';
import { dateRender } from './renderers/date.renderer';
import type {
  PDateRendererProps,
  ParamsRendererProp
} from '../types/renderers.type';

export const PDateRenderer =
  ({
    field = '',
    fontSize = 10,
    injectClass = '',
    dateFormat = 'DD-MMM-YYYY'
  }: PDateRendererProps) =>
  (params: ParamsRendererProp) => {
    if (params.data === undefined && params.value === undefined) {
      return loaderRender();
    }
    return dateRender({
      value: get(params.data, field, params.value),
      fontSize,
      injectClass,
      dateFormat
    });
  };
