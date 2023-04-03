import { computed, defineComponent, onMounted, ref } from 'vue';
import { currencyRender, dateRender } from '@/next';

import mdiCloudUpload from '~icons/mdi/cloud-upload';
import mdiEye from '~icons/mdi/eye';

import { useTransactions } from '@/composables';

export default defineComponent({
  setup() {
    const { loadSales, processSales, sales, saveSales } = useTransactions();

    const isLoading = ref(false);
    const isGroupByMonth = ref(false);
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

    const selectedSales = computed(() => {
      if (isGroupByMonth.value) {
        return sales.value.filter(item =>
          (
            item.name.toLowerCase() +
            dateRender()(item.buyDate as any) +
            dateRender()(item.sellDate as any)
          ).includes(searchCriteria.value.toLowerCase())
        );
      } else {
        return sales.value.filter(item =>
          (
            item.name +
            dateRender()(item.buyDate as any) +
            dateRender()(item.sellDate as any)
          )
            .toLowerCase()
            .includes(searchCriteria.value.toLowerCase())
        );
      }
    });

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

    const debug = () => {
      console.log(sales.value);
    };

    return {
      currencyRender,
      debug,
      dateRender: dateRender,
      handleProcessSales,
      icons: {
        mdiCloudUpload,
        mdiEye
      },
      isLoading,
      isGroupByMonth,
      searchCriteria,
      selectedSales,
      totalBuy,
      totalCosts,
      totalSell
    };
  }
});
