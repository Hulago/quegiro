import { defineComponent } from 'vue';
import { isFunction } from 'lodash-es';

export default defineComponent({
  name: 'PTagRender',
  props: {
    params: { type: Object, default: () => null }
  },

  setup(props) {
    const { data = null, attrs = null, context = null } = props.params || {};

    let tagAttrs;

    if (isFunction(attrs)) {
      tagAttrs = attrs(data, context);
    } else {
      tagAttrs = attrs || {};
    }

    return {
      tagAttrs
    };
  }
});
