import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PDateFilter',
  props: {
    params: { type: Object, default: () => null }
  },
  setup(props) {
    const {
      placeholder = '',
      size = 'small',
      icon,
      filterValue: filterValueFn
    } = props.params || {};

    const filterValue = filterValueFn();

    return {
      placeholder,
      filterValue,
      icon,
      size
    };
  }
});
