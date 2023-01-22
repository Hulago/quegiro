import {
  defineComponent,
  onBeforeMount,
  onBeforeUnmount,
  reactive,
  toRefs
} from 'vue';
import { Category, useTransactions } from '@/composables';
import mdiDelete from '~icons/mdi/delete';

interface CategoryState {
  categoryName: string | null;
  isNotificationVisible: boolean;
  notificationText: string;
  notificationColor: string;
}

import { PToolbar } from '@/next';

export default defineComponent({
  components: {
    PToolbar
  },
  setup() {
    const {
      addCategory,
      categories,
      loadCategories,
      loadProducts,
      products,
      removeCategory,
      saveCategories,
      saveProducts
    } = useTransactions();

    const state = reactive<CategoryState>({
      categoryName: null,
      isNotificationVisible: false,
      notificationColor: 'warning',
      notificationText: ''
    });

    function warning(message: string) {
      state.notificationColor = 'warning';
      state.isNotificationVisible = true;
      state.notificationText = message;
    }

    function success(message: string) {
      state.notificationColor = 'success';
      state.isNotificationVisible = true;
      state.notificationText = message;
    }

    async function handleCreateCategory() {
      try {
        if (state.categoryName !== null) {
          await addCategory(state.categoryName);
          state.categoryName = null;
        }
      } catch (e: any) {
        warning(e);
      }
    }

    async function handleRemoveCategory(category: Category) {
      await removeCategory(category);
    }

    onBeforeMount(async () => {
      await loadProducts();
      await loadCategories();
    });

    onBeforeUnmount(async () => {
      await saveProducts();
      await saveCategories();
    });

    return {
      ...toRefs(state),
      categories,
      handleCreateCategory,
      handleRemoveCategory,
      icons: {
        mdiDelete
      },
      products,
      success
    };
  }
});
