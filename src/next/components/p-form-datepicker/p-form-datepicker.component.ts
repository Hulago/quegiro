import { computed, defineComponent } from 'vue';

import dayjs from 'dayjs';
import 'dayjs/locale/pt';
dayjs.locale('pt');

import { isEmpty } from '../../composables/utils.composable';

import { Calendar, Clock } from '@element-plus/icons-vue';

export default defineComponent({
  name: 'PFormDatePicker',
  components: {
    Calendar,
    Clock
  },
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
    format: {
      default: 'DD MMM YYYY',
      type: String
    },
    type: {
      default: 'date',
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

    const formatDate = (value: Date | string) =>
      dayjs(value).format(props.format);

    return {
      isEmpty,
      isRequired,
      value,
      formatDate
    };
  }
});
