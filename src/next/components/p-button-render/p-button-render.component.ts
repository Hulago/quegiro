import { defineComponent } from 'vue';
import { isFunction } from 'lodash-es';

export default defineComponent({
  name: 'PButtonRender',
  props: {
    params: { type: Object, default: () => null }
  },

  setup(props) {
    const {
      data = null,
      attrs = null,
      context = null,
      isMultiple = false
    } = props.params || {};

    let selectedProps;

    if (isFunction(attrs)) {
      selectedProps = attrs(data, context);
    } else {
      selectedProps = attrs || {};
    }

    return {
      selectedProps,
      isMultiple
    };
  }
});
