import { mdiCloudUpload, mdiEye } from '@mdi/js';
import { currencyRender, dateRender, useTransactions } from '@quegiro/common';
import {
  computed,
  defineComponent,
  onMounted,
  ref
} from '@vue/composition-api';

export default defineComponent({
  setup() {
    const { loadSales, processSales, sales, saveSales } = useTransactions();

    const isLoading = ref(false);
    const searchCriteria = ref<string>('');

    onMounted(async () => {
      isLoading.value = true;
      await loadSales();
      isLoading.value = false;
    });

    async function handleProcessSales() {
      processSales();
      await saveSales();
    }

    const selectedSales = computed(() =>
      sales.value.filter((item) =>
        (
          item.name.toLowerCase() +
          dateRender()(item.buyDate as any) +
          dateRender()(item.sellDate as any)
        )
          .toLowerCase()
          .includes(searchCriteria.value)
      )
    );

    const totalBuy = computed(() =>
      selectedSales.value.reduce(
        (prev, curr) => (prev += curr.totalBuyPrice),
        0
      )
    );

    const totalSell = computed(() =>
      selectedSales.value.reduce(
        (prev, curr) => (prev += curr.totalSellPrice),
        0
      )
    );

    const totalCosts = computed(() =>
      selectedSales.value.reduce((prev, curr) => (prev += curr.cost), 0)
    );

    return {
      currencyRender,
      dateRender: dateRender(),
      handleProcessSales,
      icons: {
        mdiCloudUpload,
        mdiEye
      },
      isLoading,
      searchCriteria,
      selectedSales,
      totalBuy,
      totalCosts,
      totalSell
    };
  }
});
