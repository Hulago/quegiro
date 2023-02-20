import { useSales } from '@/composables';

import { watch } from 'vue';

import { get, groupBy } from 'lodash-es';

import { useRouter } from 'vue-router';

import { format } from 'date-fns';

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
    const isAggregated = ref(false);

    const { back } = useRouter();

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

    function initColumns() {
      columnDefs.value = [
        sellDateColumn({
          dateFormat: isAggregated.value ? 'MMM YYYY' : 'DD MMM YYYY HH:mm'
        }),
        buyDateColumn({
          dateFormat: isAggregated.value ? 'MMM YYYY' : 'DD MMM YYYY HH:mm'
        }),
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
    }

    defaultColDef.value = {
      sortable: true,
      filter: false,
      resizable: true
    };

    async function init() {
      isLoading.value = true;

      initColumns();

      await loadSales();

      console.log('Load sales', sales.value);

      isLoading.value = false;
    }

    onMounted(() => {
      init();
    });

    const isAgTableModal = ref(false);

    const handleShowTableConfig = () => {
      isAgTableModal.value = true;
    };

    function handleViewDetail(item: SalesModel) {
      isSalesModalVisible.value = true;
      currentSale.value = item;
    }

    const dateFilter = ref([]);

    const defaultTime: [Date, Date] = [
      new Date(2000, 1, 1, 0, 0, 0),
      new Date(2000, 2, 1, 23, 59, 59)
    ];

    const selectedSales = computed(() => {
      const [beginDate = null, endDate = null] = dateFilter.value || [];

      let salesData: SalesModel[] = [];

      if (isAggregated.value) {
        salesData = [];

        const data = groupBy(
          sales.value,
          sale =>
            format(new Date(sale.sellDate as Date), 'yyyy-MM') +
            format(new Date(sale.buyDate as Date), 'yyyy-MM') +
            sale.isin
        );

        Object.keys(data).forEach(key => {
          const sales = data[key] || [];

          const sale = sales.reduce(
            (prev, next) => {
              prev.buyDate = format(new Date(next.buyDate as Date), 'yyyy-MM');
              prev.buyOrderId = prev.buyOrderId + ',' + (next.buyOrderId || '');
              prev.buyPrice += next.buyPrice;
              prev.cost += next.cost;
              prev.currency = next.currency;
              prev.exchange = prev.exchange + ',' + next.exchange;
              prev.sellDate = format(
                new Date(next.sellDate as Date),
                'yyyy-MM'
              );
              prev.isin = next.isin;
              prev.name = next.name;
              prev.qty += next.qty;
              prev.sellOrderId =
                prev.sellOrderId + ',' + (next.sellOrderId || '');
              prev.sellPrice += next.sellPrice;
              prev.totalBuyPrice += next.totalBuyPrice;
              prev.totalSellPrice += next.totalSellPrice;

              return prev;
            },
            new SalesModel({
              buyOrderId: '',
              buyPrice: 0,
              cost: 0,
              exchange: '',

              qty: 0,

              sellPrice: 0,
              totalBuyPrice: 0,
              totalSellPrice: 0
            })
          );

          sale.buyPrice = Math.round(sale.buyPrice / sales.length);
          sale.sellPrice = Math.round(sale.sellPrice / sales.length);

          salesData.push(sale);
        });
      } else {
        salesData = sales.value;
      }

      return salesData
        .filter(item =>
          item.name?.toLowerCase().includes(searchCriteria.value.toLowerCase())
        )
        .filter(
          item =>
            beginDate === null ||
            new Date(item.sellDate as string) > new Date(beginDate as string)
        )
        .filter(
          item =>
            endDate === null ||
            new Date(item.sellDate as string) < new Date(endDate as string)
        )
        .map(item => ({
          ...item,
          delta: item.totalSellPrice - item.totalBuyPrice
        }));
    });

    const totalBuy = computed(
      () =>
        Math.round(
          selectedSales.value.reduce((prev, next) => {
            prev = prev + next.totalBuyPrice;
            return prev;
          }, 0) * 100
        ) / 100
    );

    const totalSell = computed(
      () =>
        Math.round(
          selectedSales.value.reduce((prev, next) => {
            prev = prev + next.totalSellPrice;
            return prev;
          }, 0) * 100
        ) / 100
    );

    const handleSearch = () => {
      console.log('Search');
    };

    const handleBack = () => {
      back();
    };

    watch(isAggregated, () => {
      init();
    });

    return {
      isAggregated,

      totalBuy,
      totalSell,

      dateFilter,
      defaultTime,

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
      handleBack,

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
