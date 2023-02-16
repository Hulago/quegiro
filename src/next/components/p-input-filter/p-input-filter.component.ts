import { filter } from 'lodash-es';
import { defineComponent, computed, unref, nextTick, ref } from 'vue';

export default defineComponent({
  name: 'PInputFilter',
  props: {
    params: { type: Object, default: () => null }
  },
  setup(props) {
    const {
      placeholder = '',
      type = 'text',
      size = 'small',
      icon,
      filterValue: filterValueFn,
      column
    } = props.params || {};

    const { colId = 'unknown' } = column || {};

    const filterValue = filterValueFn();

    return {
      placeholder,
      filterValue,
      type,
      icon,
      size,
      colId
    };
  }
});
