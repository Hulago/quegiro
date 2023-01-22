import { defineComponent } from 'vue';
import { isFunction } from 'lodash-es';

export default defineComponent({
  name: 'PIconRender',
  props: {
    params: { type: Object, default: () => null }
  },

  setup(props) {
    const { data = null, attrs = null, context = null } = props.params || {};

    let iconsAttrs;

    if (isFunction(attrs)) {
      iconsAttrs = attrs(data, context);
    } else {
      iconsAttrs = attrs || {};
    }

    return {
      iconsAttrs
    };
  }
});
