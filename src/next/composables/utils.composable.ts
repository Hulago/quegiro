import { computed, getCurrentInstance, unref } from 'vue';

export function useVModel(props: any, name: string) {
  const emit = getCurrentInstance()?.emit;

  return computed({
    get() {
      return props[name];
    },
    set(v) {
      emit && emit(`update:${name}`, v);
    }
  });
}

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
  unref(value) === null || unref(value) === undefined;

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
  isBlank(value) || unref(value).trim().length === 0;

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
 * If the value is blank or the trimmed string length is zero, then it's empty.
 * @param {unknown} value - unknown
 */
export const isEmpty = (value: unknown): boolean =>
  isBlank(unref(value)) || String(unref(value)).trim().length === 0;

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
export const isInteger = (value: any): boolean =>
  Number.isInteger(unref(value));

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

/**
 * It takes a string, splits it into an array of words, maps the first letter of each word to a new
 * array, filters out the first and last words, and joins the remaining letters into a string
 * @param name - The name of the person.
 * @returns The first and last letter of the name.
 */
export const getInitials = (name: string) => {
  return name
    ? name
        .split(' ')
        .map(value => value[0])
        .filter(
          (value, index, array) => index === 0 || index === array.length - 1
        )
        .join('')
    : null;
};

/**
 * It takes an object and an array of keys, and returns a new object with only the keys that are in the
 * array.
 * @param {{ [s: string]: unknown } | ArrayLike<unknown>} obj - The object to map.
 * @param {string[]} fields - string[] = []
 * @returns { a: 1, b: 2 }
 */
export function mapFields(
  obj: { [s: string]: unknown } | ArrayLike<unknown> | any,
  fields: string[] = []
) {
  return Object.fromEntries(
    Object.entries(obj)
      .filter(([key]) => fields.length === 0 || fields.includes(key))
      .map(([key, value]) => [key, value])
  );
}
