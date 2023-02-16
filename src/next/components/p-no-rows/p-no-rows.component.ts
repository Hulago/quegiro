import { defineComponent } from 'vue';
import { isFunction } from 'lodash-es';

export default defineComponent({
  name: 'PNoRows',
  props: {
    params: { type: Object, default: () => null }
  },
  setup(props) {
    const {
      title = null,
      data = null,
      description = null,
      hasButton = false,
      attrs = null,
      context = null
    } = props.params || {};

    let buttonAttrs;

    if (isFunction(attrs)) {
      buttonAttrs = attrs(data, context);
    } else {
      buttonAttrs = attrs || {};
    }

    return {
      title,
      description,
      hasButton,
      buttonAttrs
    };
  }
});
