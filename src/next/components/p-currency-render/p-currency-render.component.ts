import { defineComponent, computed } from 'vue';
import { isEmpty, isEmptyString } from '../../composables/utils.composable';
import { get } from 'lodash-es';

/* eslint-disable max-params */
import {
  ellipsisClass,
  monoFontClass
} from '../../renderers/styles/renderer.styles';

export default defineComponent({
  name: 'PCurrencyRender',
  props: {
    fieldValue: { type: String, default: '' },
    fieldCurrency: { type: String, default: '' },
    value: { type: Number, default: null },
    align: { type: String, default: 'right' },
    currency: { type: String, default: 'EUR' },
    fontSize: { type: Number, default: 12 },
    locale: { type: String, default: 'de-DE' },
    monoFont: { type: Boolean, default: false },
    maximumFractionDigits: { type: Number, default: null },
    minimumFractionDigits: { type: Number, default: null },
    decimalScale: { type: Number, default: 2 },
    injectClass: { type: String, default: '' },
    params: { type: Object, default: () => null }
  },
  setup(props) {
    const selectedValue = computed(() =>
      get(props.params?.data || {}, props.fieldValue, props.value)
    );

    const currencyComputed = computed(() =>
      get(props.params?.data || {}, props.fieldCurrency, props.currency)
    );

    const fontSizeComputed = computed(() =>
      get(props.params, 'fontSize', props.fontSize)
    );
    const localeComputed = computed(() =>
      get(props.params, 'locale', props.locale)
    );
    const monoFontComputed = computed(() =>
      get(props.params, 'monoFont', props.monoFont)
    );
    const maximumFractionDigitsComputed = computed(() =>
      get(
        props.params,
        'maximumFractionDigits',
        props.maximumFractionDigits || props.decimalScale
      )
    );
    const minimumFractionDigitsComputed = computed(() =>
      get(
        props.params,
        'minimumFractionDigits',
        props.minimumFractionDigits || props.decimalScale
      )
    );
    const injectClassComputed = computed(() =>
      get(props.params, 'injectClass', props.injectClass)
    );

    const formatedValue = computed(() =>
      !isEmpty(selectedValue.value)
        ? new Intl.NumberFormat(localeComputed.value, {
            currency: isEmptyString(currencyComputed.value)
              ? 'EUR'
              : currencyComputed.value,
            maximumFractionDigits: maximumFractionDigitsComputed.value,
            minimumFractionDigits: minimumFractionDigitsComputed.value,
            style: 'currency'
          }).format(Number(selectedValue.value))
        : selectedValue.value
    );

    const classComputed = computed(
      () =>
        `${injectClassComputed.value} ${ellipsisClass(
          1,
          props.align,
          fontSizeComputed.value
        )} ${monoFontComputed.value ? monoFontClass : ''}`
    );

    return {
      selectedValue,
      formatedValue,
      classComputed,
      isEmpty
    };
  }
});
