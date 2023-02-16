import { defineComponent } from 'vue';
import { isFunction, get } from 'lodash-es';

export default defineComponent({
  name: 'PStateRender',
  props: {
    params: { type: Object, default: () => null }
  },

  setup(props) {
    const {
      data = null,
      attrs = null,
      context = null,
      states = {},
      field = 'state',
      size = 'small',
      stateColors = {}
    } = props.params || {};

    const state = get(data, field);
    const stateName = get(states, state);
    const color = get(stateColors, state, 'var(--el-color-info-light-5)');

    let selectedProps;

    if (isFunction(attrs)) {
      selectedProps = attrs(data, context);
    } else {
      selectedProps = attrs || {
        size,
        color,
        stateName
      };
    }

    return {
      selectedProps
    };
  }
});
