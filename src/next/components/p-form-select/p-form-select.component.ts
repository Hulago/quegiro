import { computed, defineComponent } from 'vue';
import type { PropType } from 'vue';
import { isEmpty } from '../../composables/utils.composable';

type Item<T = any> = {
  value: T;
  label: string;
};

export default defineComponent({
  name: 'PFormSelect',
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
    options: {
      default: () => [],
      type: Array as PropType<Array<Item<number | string>>>
    },
    isEditMode: {
      default: false,
      type: Boolean
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

    const selectedValue = computed(
      () =>
        props.options.find(option => option.value === props.modelValue) || {}
    );

    return {
      isEmpty,
      selectedValue,
      isRequired,
      value
    };
  }
});
