import { computed, defineComponent } from 'vue';
import { isEmpty } from '../../composables/utils.composable';

export default defineComponent({
  name: 'PFormSwitch',
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

    return {
      isEmpty,
      isRequired,
      value
    };
  }
});
