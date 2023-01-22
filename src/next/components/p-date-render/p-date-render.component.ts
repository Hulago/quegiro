import { defineComponent, computed } from 'vue';
import dayjs from 'dayjs';

import { get } from 'lodash-es';

/* eslint-disable max-params */
import {
  ellipsisClass,
  monoFontClass
} from '../../renderers/styles/renderer.styles';

import { isEmpty } from '../../composables/utils.composable';

export default defineComponent({
  name: 'PDateRender',
  props: {
    fieldValue: { type: String, default: '' },
    value: { type: Number, default: null },
    dateFormat: { type: String, default: 'DD-MMM-YYYY' },
    align: { type: String, default: 'center' },
    fontSize: { type: Number, default: 12 },
    locale: { type: String, default: 'de-DE' },
    monoFont: { type: Boolean, default: false },
    injectClass: { type: String, default: '' },
    params: { type: Object, default: () => null }
  },
  setup(props) {
    const selectedValue = computed(() => {
      const date = get(props.params?.data || {}, props.fieldValue, props.value);
      return !isEmpty(date) ? dayjs(date) : null;
    });

    const dateFormatComputed = computed(() =>
      get(props.params, 'dateFormat', props.dateFormat)
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

    const injectClassComputed = computed(() =>
      get(props.params, 'injectClass', props.injectClass)
    );

    const formatedValue = computed(() =>
      !isEmpty(selectedValue.value) && selectedValue.value?.isValid()
        ? selectedValue.value.format(dateFormatComputed.value)
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
