import { useTransactions } from '@/composables';

import { get } from 'lodash-es';

import { TransactionModel } from '@/composables/transactions/transaction.model';
import { useTransactionColumns } from '@/composables/transactions/transaction.columns';

import TransactionStateRender from '@/components/transaction-state-render/transaction-state-render.component.vue';

import {
  currencyRender,
  useApplicationContext,
  useOverlay,
  useAgTable
} from '@/next';

import { computed, defineComponent, onMounted, ref } from 'vue';

import mdiEye from '~icons/mdi/eye';
import mdiSearch from '~icons/mdi/search';
import mdiTableCog from '~icons/mdi/table-cog';

import { PToolbar, PButtonRender } from '@/next';

export default defineComponent({
  components: {
    PToolbar,
    PButtonRender,
    TransactionStateRender
  },
  setup() {
    const { startLoader, stopLoader } = useApplicationContext();

    const { noRowsOverlay } = useOverlay();

    const { loadTransactions, processTransactions, transactions } =
      useTransactions();

    const searchCriteria = ref<string>('');

    const isLoading = ref(false);

    const currentTransaction = ref<TransactionModel>();

    const isTransactionModalVisible = ref(false);

    const {
      columnDefs,
      defaultColDef,
      gridOptions,
      columnApi,
      gridApi,
      setColumnApi,
      setGridApi
    } = useAgTable({
      lazy: false,
      options: {
        ...noRowsOverlay({
          title: 'No transactions',
          description: 'No transactions',
          hasButton: false
        }),
        floatingFiltersHeight: 30,
        headerHeight: 30,
        enableCellTextSelection: true,
        rowHeight: 30,
        suppressRowClickSelection: true,
        getRowStyle(params) {
          const state = get(params.data, 'state', 'OPEN');
          if (state === 'CLOSE') {
            return { background: 'rgba(0,64,128,0.1)' };
          }
        }
      }
    });

    const {
      nameColumn,
      transactionDateColumn,
      exchangeColumn,
      quantityColumn,
      transactionPriceColumn,
      transactionCostColumn,
      orderIdColumn,
      remainColumn,
      stateColumn,
      localTotalTransactionPriceColumn,
      localTransactionPriceColumn,
      exchangeRateColumn
    } = useTransactionColumns();

    columnDefs.value = [
      transactionDateColumn(),
      nameColumn(),
      exchangeColumn(),
      quantityColumn(),
      transactionPriceColumn(),
      transactionCostColumn(),
      orderIdColumn(),
      remainColumn(),
      stateColumn(),
      localTransactionPriceColumn(),
      localTotalTransactionPriceColumn(),
      exchangeRateColumn(),
      {
        colId: 'Actions',
        sortable: false,
        maxWidth: 32 * 1 + 8, // 32 for each button + 8 pading,
        minWidth: 32 * 1 + 8, // 32 for each button + 8 pading,
        cellRenderer: 'PButtonRender',
        cellRendererParams: {
          isMultiple: true,
          attrs(data: any, context: { emit: any }) {
            return [
              {
                label: 'view',
                size: 'small',
                circle: true,
                icon: mdiEye,
                onClick() {
                  context.emit('view-detail', data);
                }
              }
            ];
          }
        }
      }
    ];

    defaultColDef.value = {
      sortable: true,
      filter: false,
      resizable: true
    };

    onMounted(async () => {
      isLoading.value = true;
      await loadTransactions();

      console.log('Load transactions', transactions.value);

      processTransactions();
      isLoading.value = false;
    });

    const isAgTableModal = ref(false);

    const handleShowTableConfig = () => {
      isAgTableModal.value = true;
    };

    function handleViewDetail(item: TransactionModel) {
      isTransactionModalVisible.value = true;
      currentTransaction.value = item;
    }

    const handleSearch = () => {
      console.log('Search');
    };

    const dateFilter = ref([]);

    const defaultTime: [Date, Date] = [
      new Date(2000, 1, 1, 0, 0, 0),
      new Date(2000, 2, 1, 23, 59, 59)
    ];

    const selectedTransactions = computed(() => {
      const [beginDate = null, endDate = null] = dateFilter.value || [];

      return transactions.value
        .filter(item =>
          item.name?.toLowerCase().includes(searchCriteria.value.toLowerCase())
        )
        .filter(
          item =>
            beginDate === null ||
            new Date(item.date) > new Date(beginDate as string)
        )
        .filter(
          item =>
            endDate === null ||
            new Date(item.date) < new Date(endDate as string)
        );
    });

    return {
      dateFilter,
      defaultTime,

      currencyRender,
      currentTransaction,
      isTransactionModalVisible,
      handleViewDetail,
      icons: {
        mdiSearch,
        mdiEye,
        mdiTableCog
      },

      isLoading,
      searchCriteria,
      selectedTransactions,
      handleSearch,

      // grid
      columnDefs,
      defaultColDef,
      gridOptions,
      isAgTableModal,
      handleShowTableConfig,

      setColumnApi,
      setGridApi
    };
  }
});
