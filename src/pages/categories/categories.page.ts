import {
  defineComponent,
  onBeforeMount,
  onBeforeUnmount,
  ref,
  computed,
  toRefs
} from 'vue';
import { useCategory, useProduct, useTransactions } from '@/composables';
import mdiDelete from '~icons/mdi/delete';

import { useRouter } from 'vue-router';

import { PToolbar, isEmptyString, useApplicationContext } from '@/next';
import { CategoryModel } from '@/composables/categories/category.model';
import { ProductModel } from '@/composables/product/product.model';

import { useHead } from '@vueuse/head';

export default defineComponent({
  components: {
    PToolbar
  },
  setup() {
    useHead({
      title: 'Categories',
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
    });

    const { startLoader, stopLoader, notifySuccess, notifyError } =
      useApplicationContext();

    const {
      categories,
      loadCategories,
      addCategory,
      removeCategory,
      saveCategories
    } = useCategory();

    const { products, loadProducts, saveProducts } = useProduct();

    const { back } = useRouter();

    const categoryName = ref('');
    const isCategoryModalVisible = ref(false);

    async function handleCreateCategory() {
      try {
        startLoader();

        if (!isEmptyString(categoryName.value)) {
          await addCategory(categoryName.value);

          categoryName.value = '';
        }

        notifySuccess('Create category', 'Category created');
      } catch (e: any) {
        console.error(e);

        notifyError('Create category', 'Error saving data');
      } finally {
        isCategoryModalVisible.value = false;
        stopLoader();
      }
    }

    async function handleRemoveCategory(category: CategoryModel) {
      try {
        startLoader();

        await removeCategory(category);

        notifySuccess('Remove category', 'Category removed');
      } catch (e: any) {
        console.error(e);

        notifyError('Remove category', 'Error saving data');
      } finally {
        stopLoader();
      }
    }

    onBeforeMount(async () => {
      await loadProducts();
      await loadCategories();

      // console.log(categories);
    });

    onBeforeUnmount(async () => {
      await saveProducts();
      await saveCategories();
    });

    const handleBack = () => {
      back();
    };

    const categoryItems = computed(() =>
      categories.value.map(item => ({
        value: item.categoryId,
        label: item.name
      }))
    );

    function changeCategory(product: ProductModel, categoryId: any) {
      const prod = products.value.find(item => item.isin === product.isin);

      if (prod) {
        prod.categoryId = categoryId;
      }

      saveProducts();
    }

    return {
      changeCategory,
      categoryItems,
      isCategoryModalVisible,
      categoryName,
      categories,
      handleBack,
      handleCreateCategory,
      handleRemoveCategory,
      icons: {
        mdiDelete
      },
      products
    };
  }
});
