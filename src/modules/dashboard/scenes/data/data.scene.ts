import { mdiCloudUpload, mdiEye } from '@mdi/js';

import dataSvg from '../../svgs/data.svg.vue';

import {
  computed,
  defineComponent,
  onBeforeUnmount,
  onMounted,
  ref
} from '@vue/composition-api';
import {
  currencyRender,
  dateRender,
  Transactions,
  useTransactions
} from '@/common';

export default defineComponent({
  metaInfo: {
    title: 'Data',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'google-site-verification',
        content: 'PBkQrOSqcjgQtk1Ee-wlNSRK3VcQb3KewbsXawGmWh8'
      },
      {
        name: 'description',
        content:
          'Import data from Degiro into Quegiro. All data will be store in local storage indexDB.'
      }
    ]
  },
  components: {
    dataSvg
  },
  setup() {
    const {
      loadTransactions,
      processSales,
      processTransactions,
      processTransactionsCVS,
      reset,
      save,
      saveTransactions,
      transactions
    } = useTransactions();

    const file = ref<File | null>(null);

    const searchCriteria = ref<string>('');

    const isLoading = ref(false);

    const isDetailModalVisible = ref(false);

    const currentTransaction = ref<Transactions | null>(null);

    onMounted(async () => {
      isLoading.value = true;
      await loadTransactions();

      processTransactions();
      isLoading.value = false;
    });

    onBeforeUnmount(async () => {
      await saveTransactions();
    });

    async function handleClear() {
      await reset();
    }

    async function handleLoadTransations() {
      if (file && file.value) {
        isLoading.value = true;

        const content = await file.value.text();

        processTransactionsCVS(content);
        processTransactions();

        await processSales();

        await save();

        isLoading.value = false;
      }
    }

    function handleViewDetail(item: Transactions) {
      isDetailModalVisible.value = true;
      currentTransaction.value = item;
    }

    const selectedTransactions = computed(() =>
      transactions.value.filter(item =>
        (item.name + item.transactionDate)
          .toLocaleLowerCase()
          .includes(searchCriteria.value)
      )
    );

    return {
      currencyRender,
      currentTransaction,
      dateRender: dateRender(),
      file,
      handleClear,
      handleLoadTransations,
      handleViewDetail,
      icons: {
        mdiCloudUpload,
        mdiEye
      },
      isDetailModalVisible,
      isLoading,
      processSales,
      searchCriteria,
      selectedTransactions,
      transactions
    };
  }
});
