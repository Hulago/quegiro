import { useStorage } from '@/next';
import { ref, unref } from 'vue';
import { CategoryModel } from './category.model';

import { useProduct } from '../product/product.composable';

const { getItem, setItem } = useStorage('QUEGIRO');

const categories = ref<CategoryModel[]>([]);

export function useCategory() {
  async function addCategory(name: string) {
    const cat = categories.value.find(cat => cat.name === name);
    if (!cat) {
      categories.value.push({
        categoryId: Number(new Date()).toString(10),
        name
      });

      await saveCategories();
    } else {
      throw new Error('Upps');
    }
  }

  async function removeCategory(category: CategoryModel) {
    const { products, saveProducts } = useProduct();

    products.value.forEach(product => {
      if (product.categoryId === category.categoryId) {
        product.categoryId = null;
      }
    });

    categories.value = categories.value.filter(
      cat => cat.categoryId !== category.categoryId
    );

    await saveCategories();
    await saveProducts();
  }

  async function loadCategories() {
    try {
      const cat = await getItem('categories');

      categories.value = cat ? [...cat] : [];
    } catch (e) {
      console.error('Error loading categories');
      console.error(e);
    }
  }

  async function resetCategories() {
    categories.value = [];
    await saveCategories();
  }

  async function saveCategories() {
    try {
      await setItem('categories', unref(categories));
    } catch (e) {
      console.error('Error saving categories');
      console.error(e);
    }
  }

  return {
    addCategory,
    removeCategory,
    loadCategories,
    resetCategories,
    saveCategories,
    categories
  };
}
