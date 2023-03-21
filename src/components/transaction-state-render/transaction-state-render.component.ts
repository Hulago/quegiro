import { defineComponent, computed } from 'vue';
import { isFunction, get } from 'lodash-es';

import { useLabels } from '@/composables/labels/labels.composable';

export default defineComponent({
  name: 'TransactionStateRender',
  props: {
    params: { type: Object, default: () => null }
  },

  setup(props) {
    const {
      data = null,
      attrs = null,
      context = null,
      size = 'small',
      stateColors = {}
    } = props.params || {};

    const { labels } = useLabels();

    const state = get(data, 'state');
    const qty = get(data, 'qty');
    const isBuy = get(data, 'isBuy', true);
    const remain = get(data, 'remain', 0);
    const type = isBuy ? (state === 'CLOSE' ? 'info' : 'success') : 'error';

    const stateLabel = computed(() => {
      return state === 'OPEN' ? labels.open : labels.close;
    });

    return {
      state,
      isBuy,
      qty,
      type,
      remain,
      stateLabel,
      labels
    };
  }
});
