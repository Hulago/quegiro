import {
  computed,
  defineComponent,
  onBeforeUnmount,
  onMounted,
  ref
} from 'vue';

import type {
  ElMessageBox,
  UploadUserFile,
  UploadInstance
} from 'element-plus';

import DataSvg from '@/components/svgs/data.svg.vue';

import {
  useTransactions,
  useAccount,
  useSales,
  useCategory,
  useProduct
} from '@/composables';
import { PToolbar, useApplicationContext } from '@/next';

import { useRouter } from 'vue-router';

import { useHead } from '@vueuse/head';

export default defineComponent({
  components: {
    DataSvg,
    PToolbar
  },
  setup() {
    useHead({
      title: 'Data',
      meta: [
        { charset: 'utf-8' },
        {
          name: 'google-site-verification',
          content: 'PBkQrOSqcjgQtk1Ee-wlNSRK3VcQb3KewbsXawGmWh8'
        },
        {
          name: 'description',
          content: 'Data onde pode importar as suas transações do seu broker.'
        },
        {
          property: 'og:site_name',
          content: 'Quegiro'
        },
        {
          property: 'og:url',
          content: 'https://quegiro.netlify.app/data'
        }
      ]
    });

    const { back } = useRouter();

    const { startLoader, stopLoader, notifySuccess } = useApplicationContext();

    const uploadAccount = ref<UploadInstance>();
    const uploadTransactions = ref<UploadInstance>();

    const {
      processTransactionsCVS,
      processTransactions,
      processSales,
      saveTransactions,
      resetTransactions,
      transactions
    } = useTransactions();

    const { processAccountCVS, processAccount, saveAccount, resetAccount } =
      useAccount();

    const { resetSales } = useSales();
    const { resetCategories } = useCategory();
    const { resetProducts } = useProduct();

    const transactionFiles = ref<UploadUserFile[]>([]);
    const accountFiles = ref<UploadUserFile[]>([]);

    const isLoading = ref(false);

    onMounted(async () => {
      isLoading.value = true;

      isLoading.value = false;
    });

    onBeforeUnmount(async () => {
      await saveTransactions();
      await saveAccount();
    });

    async function handleClear() {
      await ElMessageBox.confirm(
        'Upon confirmation, all data will be deleted from local storage',
        'Clear all data',
        {
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }
      );

      startLoader();

      await resetTransactions();
      await resetAccount();
      await resetSales();
      await resetCategories();
      await resetProducts();

      stopLoader();
    }

    const hasAccountFile = computed(
      () => accountFiles.value && accountFiles.value.length > 0
    );

    const hasTransactionFile = computed(
      () => transactionFiles.value && transactionFiles.value.length > 0
    );

    async function handleLoadAccount() {
      if (hasAccountFile.value) {
        startLoader();
        isLoading.value = true;

        const [fileToUpload = null] = accountFiles.value || [];

        const { raw: rawFile = null } = fileToUpload || {};

        if (rawFile !== null) {
          const content = await (rawFile as File).text();

          processAccountCVS(content);
          processAccount();

          await saveAccount();
        }

        isLoading.value = false;
        stopLoader();
        accountFiles.value = [];
        notifySuccess('Account', 'Account information loaded');
      }
    }

    async function handleLoadTransations() {
      if (hasTransactionFile.value) {
        startLoader();
        isLoading.value = true;

        const [fileToUpload = null] = transactionFiles.value || [];

        const { raw: rawFile = null } = fileToUpload || {};

        if (rawFile !== null) {
          const content = await (rawFile as File).text();

          processTransactionsCVS(content);
          processTransactions();

          await processSales();
        }

        isLoading.value = false;
        stopLoader();
        transactionFiles.value = [];
        notifySuccess('Transactions', 'Transaction information loaded');
      }
    }

    const handleBack = () => {
      back();
    };

    return {
      accountFiles,
      transactionFiles,
      handleClear,
      handleLoadTransations,
      handleLoadAccount,

      uploadAccount,
      uploadTransactions,

      transactions,

      isLoading,

      handleBack,

      hasAccountFile,
      hasTransactionFile
    };
  }
});
