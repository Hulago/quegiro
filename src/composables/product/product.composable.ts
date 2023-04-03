import { useStorage } from '@/next';
import { ref, unref } from 'vue';
import { ProductModel } from './product.model';

const { getItem, setItem } = useStorage();

const products = ref<ProductModel[]>([]);

export function useProduct() {
  async function loadProducts() {
    try {
      const prod = await getItem('products');

      products.value = prod ? [...prod] : [];
    } catch (e) {
      console.error('Error loading products');
      console.error(e);
    }
  }

  async function saveProducts() {
    try {
      await setItem('products', unref(products));

      // if (products.value.length === 0) {
      //   debugger;
      // }
    } catch (e) {
      console.error('Error saving products');
      console.error(e);
    }
  }

  async function resetProducts() {
    products.value = [];
    await saveProducts();
  }

  return {
    loadProducts,
    saveProducts,
    resetProducts,
    products
  };
}
