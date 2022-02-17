import {
  camelCase,
  capitalize,
  merge,
  snakeCase,
  startCase,
  toLower,
  toUpper,
  upperFirst
} from 'lodash-es';
import VueI18n from 'vue-i18n';

interface I18nOptions {
  data?: any;
  format?: string;
  required?: boolean;
  fallback?: string;
}

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

let vueI18nInstance: any;
let installed = false;

export const useI18n = () => {
  const currency = (value: number | string, style = 'EUR'): string =>
    vueI18nInstance.n(Number(value), style);

  /**
   * Internal translator to i18n instance
   *
   * @param token - { string }
   * @param param1 - { ITranslateOptions }
   * @internal
   */
  const i18n = (token: string, options?: I18nOptions): string => {
    const {
      data = null,
      fallback = null,
      format = 'upperFirst',
      required = false
    } = options || {};

    const str = vueI18nInstance.t(token, data).toString();

    if (str === token && fallback) {
      return fnFormat[format](
        vueI18nInstance
          .t(fallback, data)
          .toString()
          .concat(required ? '*' : '')
      );
    }

    return fnFormat[format](str.concat(required ? '*' : ''));
  };

  return {
    currency,
    i18n,
    vueI18nInstance
  };
};

export default {
  install(
    Vue,
    {
      messages,
      numberFormatsConfig
    }: { messages: any[]; numberFormatsConfig: any }
  ) {
    if (!installed) {
      installed = true;

      Vue.use(VueI18n);

      vueI18nInstance = new VueI18n({
        fallbackLocale: 'en-US',
        locale: 'en-US',
        messages: merge({}, ...messages),
        numberFormats: {
          ...numberFormats,
          ...(numberFormatsConfig || {})
        }
      });

      const { currency, i18n } = useI18n();
      Vue.prototype.i18n = i18n;
      Vue.prototype.i18nCurrency = currency;
    }
  }
};
