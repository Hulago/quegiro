/* eslint-disable max-params */
import { get } from 'lodash-es';


import type {
  ParamsRendererProp, PStringRendererProps
} from '../types/renderers.type';
import { loaderRender } from './renderers/loader.renderer';
import { stringRender } from './renderers/string.renderer';

const loadNestedModel = (model: any, nestedFields: any, defaultValue: any) => {
  const { length = 0 } = nestedFields || [];
  let result = '';

  if (length > 0) {
    const field = nestedFields.shift();
    const value = get(model, field, defaultValue);

    if (Array.isArray(value)) {
      result = value.map(m => loadNestedModel(m, [...nestedFields], defaultValue)).join(', ');
    } else if (typeof value === 'object') {
      result = loadNestedModel(value, nestedFields, defaultValue);
    } else {
      result = value;
    }
  } else {
    result = defaultValue;
  }

  return result;
}

/**
 * Render text into div element
 *
 * @param field - Property key
 * @param ellipsis - True or false
 * @param lines - Lines for ellipsis
 * @param fontSize - Font size
 * @param injectClass - Custom css class
 */
export const PStringRenderer =
  ({
    field = '',
    ellipsis = true,
    lines = 2,
    fontSize = 12,
    injectClass = ''
  }: PStringRendererProps) =>
    (params: ParamsRendererProp) => {
      if (params.data === undefined && params.value === undefined) {
        return loaderRender();
      }

      const value = field.includes('.') ? loadNestedModel(params.data, field.split('.'), params.value) : get(params.data, field, params.value);

      return stringRender({
        value: value,
        ellipsis,
        lines,
        fontSize,
        injectClass
      });
    };

export default PStringRenderer;
