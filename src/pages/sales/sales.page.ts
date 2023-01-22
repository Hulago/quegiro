import { useTransactions, useSales } from '@/composables';

import { get } from 'lodash-es';

import { SalesModel } from '@/composables/sales/sales.model';
import { useSalesColumns } from '@/composables/sales/sales.columns';

import SalesDeltaRender from '@/components/sales-delta-render/sales-delta-render.component.vue';

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
    SalesDeltaRender
  },
  setup() {
    const { startLoader, stopLoader } = useApplicationContext();

    const { noRowsOverlay } = useOverlay();

    const { loadSales, sales } = useSales();

    const searchCriteria = ref<string>('');

    const isLoading = ref(false);

    const currentSale = ref<SalesModel>();

    const isSalesModalVisible = ref(false);

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
          title: 'No sales',
          description: 'No sales',
          hasButton: false
        }),
        floatingFiltersHeight: 30,
        headerHeight: 30,
        enableCellTextSelection: true,
        rowHeight: 30,
        suppressRowClickSelection: true,
        getRowStyle(params) {
          const totalBuyPrice = get(params.data, 'totalBuyPrice', 0);
          const totalSellPrice = get(params.data, 'totalSellPrice', 0);
          return totalSellPrice > totalBuyPrice
            ? { background: 'var(--el-color-success-light-8)' }
            : { background: 'var(--el-color-danger-light-8)' };
        }
      }
    });

    const {
      sellDateColumn,
      buyDateColumn,
      nameColumn,
      isinColumn,
      exchangeColumn,
      quantityColumn,
      sellTotalPriceColumn,
      sellPriceColumn,
      buyTotalPriceColumn,
      buyPriceColumn,
      costColumn,
      deltaColumn,
      buyOrderIdColumn,
      sellOrderIdColumn
    } = useSalesColumns();

    columnDefs.value = [
      sellDateColumn(),
      buyDateColumn(),
      nameColumn(),
      isinColumn(),
      exchangeColumn(),
      quantityColumn(),
      sellTotalPriceColumn(),
      sellPriceColumn(),
      buyTotalPriceColumn(),
      buyPriceColumn(),
      costColumn(),
      deltaColumn(),
      buyOrderIdColumn(),
      sellOrderIdColumn(),

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
      await loadSales();

      console.log('Load sales', sales.value);

      isLoading.value = false;
    });

    const isAgTableModal = ref(false);

    const handleShowTableConfig = () => {
      isAgTableModal.value = true;
    };

    function handleViewDetail(item: SalesModel) {
      isSalesModalVisible.value = true;
      currentSale.value = item;
    }

    const selectedSales = computed(() =>
      sales.value
        .filter(item =>
          item.name?.toLowerCase().includes(searchCriteria.value.toLowerCase())
        )
        .map(item => ({
          ...item,
          delta: item.totalSellPrice - item.totalBuyPrice
        }))
    );

    const handleSearch = () => {
      console.log('Search');
    };

    return {
      currencyRender,
      currentSale,
      isSalesModalVisible,
      handleViewDetail,
      icons: {
        mdiSearch,
        mdiEye,
        mdiTableCog
      },

      isLoading,
      searchCriteria,
      selectedSales,
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
