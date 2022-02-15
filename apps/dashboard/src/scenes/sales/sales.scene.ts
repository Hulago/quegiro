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
      // console.log('dSDSDS');
      // console.log(transactions);
    }

    const selectedSales = computed(() =>
      sales.value.filter((item) =>
        (item.name + item.buyDate + item.sellDate)
          .toLocaleLowerCase()
          .includes(searchCriteria.value)
      )
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
      selectedSales
    };
  }
});
