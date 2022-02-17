import {
  camelCase,
  capitalize,
  kebabCase,
  lowerCase,
  lowerFirst,
  snakeCase,
  upperCase,
  upperFirst
} from 'lodash-es';

export function template(str: string, dataObj: any) {
  const utilObject = {
    // eslint-disable-next-line id-length
    _: {
      camelCase,
      capitalize,
      kebabCase,
      lowerCase,
      lowerFirst,
      pascalCase: (str: string) => upperFirst(camelCase(str)),
      snakeCase,
      upperCase,
      upperFirst
    },
    ...dataObj
  };

  const names = Object.keys(utilObject);

  const vals = Object.values(utilObject);

  return new Function(...names, `return \`${str}\`;`)(...vals);
}

/**
 * @remarks
 * Check if value is null or undefined
 *
 * @example
 * ```ts
 * const isValid = isBlank(null);
 * ```
 *
 * @param value - Value to check
 * @public
 */
export const isBlank = (value: any): boolean =>
  value === null || value === undefined;

/**
 * @remarks
 * Check if value is not null and not undefined
 *
 * @example
 * ```ts
 * const isValid = isPresent(null);
 * ```
 *
 * @param value - Value to check
 * @public
 */
export const isPresent = (value: any): boolean => !isBlank(value);

/**
 * @remarks
 * Check if value is null, undefined or empty string
 *
 * @example
 * ```ts
 * const isValid = isNullOrEmptyString(null);
 * ```
 *
 * @param value - Value to check
 * @public
 */
export const isEmptyString = (value: string): boolean =>
  isBlank(value) || value.trim().length === 0;

/**
 * @remarks
 * Check if value is not null, undefined or empty string
 *
 * @example
 * ```ts
 * const isValid = isNotNullOrEmptyString(null);
 * ```
 *
 * @param value - Value to check
 * @public
 */
export const isNotEmptyString = (value: string): boolean =>
  !isEmptyString(value);

/**
 * @remarks
 * Check if value is number
 *
 * @example
 * ```ts
 * const isValid = isInteger(null);
 * ```
 *
 * @param value - Value to check
 * @public
 */
export const isInteger = (value: any): boolean => Number.isInteger(value);

/**
 * @remarks
 * Remove null items from object
 *
 * @example
 * ```ts
 * const cleanObject = removeNulls({ item: null, value: 1});
 * ```
 *
 * @param obj - Object to check items
 * @public
 */
export const removeNulls = (obj: Record<string, any>) =>
  Object.fromEntries(
    // eslint-disable-next-line id-length, no-unused-vars
    Object.entries(obj).filter(([_, entry]) => entry != null)
  );

/**
 * Helper to create HTML element
 * @param tag HTML tag
 * @param attributes
 * @param options
 * @returns
 */
export function createHtmlElement<T extends HTMLElement>(
  tag: string,
  attributes = {},
  options?: ElementCreationOptions
): T {
  const element = document.createElement(tag, options) as T;

  Object.assign(element, attributes);

  return element;
}

/**
 * Execute function chaining returns values from right to left
 * @param fns array of functions
 * @returns
 */
export const compose =
  (...fns: any[]) =>
  (params: any) =>
    fns.reduceRight((res, fn) => fn(res), params);

/**
 * Execute function chaining returns values from left to right
 * @param fns array of functions
 * @returns
 */
export const pipe =
  (...fns: any[]) =>
  (params: any) =>
    fns.reduce((res, fn) => fn(res), params);
