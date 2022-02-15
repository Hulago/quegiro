import { mdiCloudUpload, mdiEye } from '@mdi/js';
import {
  currencyRender,
  dateRender,
  Transactions,
  useTransactions
} from '@quegiro/common';
import {
  computed,
  defineComponent,
  onBeforeUnmount,
  onMounted,
  ref
} from '@vue/composition-api';

export default defineComponent({
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

        await save();

        isLoading.value = false;
      }
    }

    function handleViewDetail(item) {
      console.log(item);
      isDetailModalVisible.value = true;
      currentTransaction.value = item;
    }

    const selectedTransactions = computed(() =>
      transactions.value.filter((item) =>
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
