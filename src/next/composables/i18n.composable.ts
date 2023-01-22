import {
  camelCase,
  capitalize,
  snakeCase,
  startCase,
  toLower,
  toUpper,
  upperFirst
} from 'lodash-es';
import { createI18n, useI18n as getI18n } from 'vue-i18n';

import type { I18nOptions } from '../types/i18n.type';

const fnFormat: {
  [key: string]: (s: string) => string;
} = {
  camelCase,
  capitalize,
  lowerCase: toLower,
  plain: (str: string) => str,
  snakeCase,
  startCase,
  upperCase: toUpper,
  upperFirst
};

const numberFormats = {
  'en-US': {
    BRL: {
      currency: 'BRL',
      style: 'currency'
    },
    EUR: {
      currency: 'EUR',
      style: 'currency'
    },
    USD: {
      currency: 'USD',
      style: 'currency'
    }
  },
  'pt-PT': {
    BRL: {
      currency: 'BRL',
      style: 'currency'
    },
    EUR: {
      currency: 'EUR',
      style: 'currency'
    },
    USD: {
      currency: 'USD',
      style: 'currency'
    }
  }
};

let i18n: any;

export const useI18n = (
  messages?: any,
  options = {
    fallbackLocale: 'en-US',
    locale: 'pt-PT'
  }
) => {
  if (!i18n) {
    i18n = createI18n({
      legacy: false,
      messages,
      numberFormats: {
        ...numberFormats
      },
      ...options
    });
  }

  const currency = (value: number | string, style = 'EUR'): string => {
    const { n } = getI18n();

    return n(Number(value), style);
  };

  /**
   * Internal translator to i18n instance
   *
   * @param token - { string }
   * @param param1 - { ITranslateOptions }
   * @internal
   */
  const t = (token: string, options?: I18nOptions): string => {
    const {
      data = null,
      fallback = null,
      format = 'upperFirst',
      required = false
    } = options || {};

    const { t } = getI18n();

    const str = t(token, data).toString();

    if (str === token && fallback) {
      return fnFormat[format](
        t(fallback, data)
          .toString()
          .concat(required ? '*' : '')
      );
    }

    return fnFormat[format](str.concat(required ? '*' : ''));
  };

  return {
    currency,
    t,
    i18n
  };
};
