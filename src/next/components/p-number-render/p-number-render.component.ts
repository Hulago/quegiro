import { defineComponent, computed } from 'vue';
import { isEmpty } from '../../composables/utils.composable';
import { get } from 'lodash-es';

/* eslint-disable max-params */
import {
  ellipsisClass,
  monoFontClass
} from '../../renderers/styles/renderer.styles';

export default defineComponent({
  name: 'PNumberRender',
  props: {
    field: { type: String, default: '' },
    value: { type: Number, default: null },
    formated: { type: Boolean, default: true },
    fontSize: { type: Number, default: 12 },
    locale: { type: String, default: 'de-DE' },
    align: { type: String, default: 'right' },
    monoFont: { type: Boolean, default: false },
    maximumFractionDigits: { type: Number, default: null },
    minimumFractionDigits: { type: Number, default: null },
    decimalScale: { type: Number, default: 2 },
    injectClass: { type: String, default: '' },
    style: { type: String, default: 'decimal' },
    params: { type: Object, default: () => null }
  },
  setup(props) {
    const selectedValue = computed(() =>
      get(props.params?.data || {}, props.field, props.value)
    );

    const formatedComputed = computed(() =>
      get(props.params, 'formated', props.formated)
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
    const styleComputed = computed(() =>
      get(props.params, 'style', props.style)
    );

    const formatedValue = computed(() =>
      formatedComputed.value
        ? new Intl.NumberFormat(localeComputed.value, {
            maximumFractionDigits: maximumFractionDigitsComputed.value,
            minimumFractionDigits: minimumFractionDigitsComputed.value,
            style: styleComputed.value
          }).format(
            styleComputed.value === 'percent'
              ? Number(selectedValue.value) / 100
              : Number(selectedValue.value)
          )
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
