import { useAccount } from '@/composables';

import { useRouter } from 'vue-router';

import { AccountModel } from '@/composables/account/account.model';
import { useAccountColumns } from '@/composables/account/account.columns';

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

import { useHead } from '@vueuse/head';

export default defineComponent({
  components: {
    PToolbar,
    PButtonRender,
    TransactionStateRender
  },
  setup() {
    useHead({
      title: 'Account',
      meta: [
        { charset: 'utf-8' },
        {
          name: 'google-site-verification',
          content: 'PBkQrOSqcjgQtk1Ee-wlNSRK3VcQb3KewbsXawGmWh8'
        },
        {
          name: 'description',
          content: 'Informação sobre o sua conta do seu broker.'
        },
        {
          property: 'og:site_name',
          content: 'Quegiro'
        },
        {
          property: 'og:url',
          content: 'https://quegiro.netlify.app/account'
        }
      ]
    });

    const { back } = useRouter();

    const { startLoader, stopLoader } = useApplicationContext();

    const { noRowsOverlay } = useOverlay();

    const { loadAccount, processAccount, account } = useAccount();

    const searchCriteria = ref<string>('');

    const isLoading = ref(false);

    const currentTransaction = ref<AccountModel>();

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
          title: 'No account information',
          description: 'No account information',
          hasButton: false
        }),
        floatingFiltersHeight: 30,
        headerHeight: 30,
        enableCellTextSelection: true,
        rowHeight: 30,
        suppressRowClickSelection: true
        // getRowStyle(params) {
        //   const state = get(params.data, 'state', 'OPEN');
        //   if (state === 'CLOSE') {
        //     return { background: 'rgba(0,64,128,0.1)' };
        //   }
        // }
      }
    });

    const {
      accountDateColumn,
      productColumn,
      descriptionColumn,
      isinColumn,
      orderIdColumn,
      valueColumn,
      exchangeRateColumn,
      balanceColumn
    } = useAccountColumns();

    columnDefs.value = [
      accountDateColumn(),
      productColumn(),
      descriptionColumn(),
      isinColumn(),
      orderIdColumn(),
      valueColumn(),
      exchangeRateColumn(),
      balanceColumn()
      // {
      //   colId: 'Actions',
      //   sortable: false,
      //   maxWidth: 32 * 1 + 8, // 32 for each button + 8 pading,
      //   minWidth: 32 * 1 + 8, // 32 for each button + 8 pading,
      //   cellRenderer: 'PButtonRender',
      //   cellRendererParams: {
      //     isMultiple: true,
      //     attrs(data: any, context: { emit: any }) {
      //       return [
      //         {
      //           label: 'view',
      //           size: 'small',
      //           circle: true,
      //           icon: mdiEye,
      //           onClick() {
      //             context.emit('view-detail', data);
      //           }
      //         }
      //       ];
      //     }
      //   }
      // }
    ];

    defaultColDef.value = {
      sortable: true,
      filter: false,
      resizable: true
    };

    onMounted(async () => {
      isLoading.value = true;
      await loadAccount();

      console.log(account.value);

      isLoading.value = false;
    });

    const isAgTableModal = ref(false);

    const handleShowTableConfig = () => {
      isAgTableModal.value = true;
    };

    function handleViewDetail(item: AccountModel) {
      isTransactionModalVisible.value = true;
      currentTransaction.value = item;
    }

    const selectedAccount = computed(() => {
      const [beginDate = null, endDate = null] = dateFilter.value || [];

      return account.value
        .filter(item =>
          item.description
            ?.toLowerCase()
            .includes(searchCriteria.value.toLowerCase())
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

    const handleSearch = () => {
      console.log('Search');
    };

    const dateFilter = ref([]);

    const defaultTime: [Date, Date] = [
      new Date(2000, 1, 1, 0, 0, 0),
      new Date(2000, 2, 1, 23, 59, 59)
    ];

    const handleBack = () => {
      back();
    };

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
      selectedAccount,
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
