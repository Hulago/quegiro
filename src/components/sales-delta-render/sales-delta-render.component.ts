import { defineComponent } from 'vue';
import { get } from 'lodash-es';

export default defineComponent({
  name: 'SalesDeltaRender',
  props: {
    params: { type: Object, default: () => null }
  },

  setup(props) {
    const { data = {} } = props.params || {};

    const currency = get(data, 'currency', 'EUR');
    const totalBuyPrice = get(data, 'totalBuyPrice', 0);
    const totalSellPrice = get(data, 'totalSellPrice', 0);
    const delta = totalSellPrice - totalBuyPrice;

    return {
      delta
    };
  }
});
