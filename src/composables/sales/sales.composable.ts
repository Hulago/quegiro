import { useStorage } from '@/next';
import { ref, unref } from 'vue';
import { SalesModel } from './sales.model';

const { getItem, setItem } = useStorage('QUEGIRO');

const sales = ref<SalesModel[]>([]);

export function useSales() {
  async function loadSales() {
    try {
      const sl = await getItem('sales');

      sales.value = sl ? [...sl] : [];
    } catch (e) {
      console.error('Error loading sales');
      console.error(e);
    }
  }

  async function saveSales() {
    try {
      await setItem('sales', unref(sales));
    } catch (e) {
      console.error(e);
      console.error('Erro saving sales');
    }
  }

  async function resetSales() {
    sales.value = [];
    await saveSales();
  }

  return {
    loadSales,
    saveSales,
    resetSales,
    sales
  };
}
