import { computed, defineComponent } from 'vue';

import { isEmpty } from '../../composables/utils.composable';

export default defineComponent({
  name: 'PFormInputNumber',
  inheritAttrs: false,
  props: {
    fc: {
      default: null,
      type: Object
    },
    label: {
      default: null,
      type: String
    },
    modelValue: {
      default: null,
      type: [String, Number]
    },
    isEditMode: {
      default: false,
      type: Boolean
    },
    numberFormatOptions: {
      default: () => ({
        locale: 'de-DE',
        fractionDigits: 2,
        style: 'decimal'
      }),
      type: Object
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const value = computed({
      get() {
        return props.modelValue;
      },
      set(value) {
        emit('update:modelValue', value);
      }
    });

    const isRequired = computed(() => props.fc.schema.required);

    const formatter = (value: number) => {
      const { numberFormatOptions = null } = props || {};

      return numberFormatOptions
        ? new Intl.NumberFormat(props.numberFormatOptions.locale, {
            maximumFractionDigits: props.numberFormatOptions.fractionDigits,
            minimumFractionDigits: 0,
            style: props.numberFormatOptions.style
          }).format(value)
        : value;
    };

    return {
      formatter,
      isEmpty,
      isRequired,
      value
    };
  }
});
