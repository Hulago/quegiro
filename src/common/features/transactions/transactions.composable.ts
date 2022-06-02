import { computed, reactive } from '@vue/composition-api';
import { orderBy, uniq, uniqBy } from 'lodash-es';
import { format, parse } from 'date-fns';
import { useStorage } from '@/next';

export interface Sales {
  sellOrderId: string;
  buyOrderId: string | null;
  sellDate: Date | string | null;
  buyDate: Date | string | null;
  isin: string;
  name: string;
  exchange: string;
  qty: number;
  buyPrice: number;
  sellPrice: number;
  totalBuyPrice: number;
  totalSellPrice: number;
  cost: number;
  currency: string;
}

export interface Transactions {
  date: string;
  exchange: string;
  exchangeFrom: string;
  exchangeRate: number;
  isin: string;
  sale: boolean;
  buy: boolean;
  localTotalTransactionCurrency: string;
  localTotalTransactionPrice: number;
  localTransactionCurrency: string;
  localTransactionPrice: number;
  name: string;
  orderId: string;
  qty: number;
  remain: number;
  time: string;
  total: number;
  totalCurrency: string;
  transactionCost: number;
  transactionCostCurrency: string;
  transactionCurrency: string;
  transactionDate: Date;
  transactionPrice: number;
  state: string;
}

export interface Products {
  isin: string;
  name: string;
  exchange: string;
  categoryId: string | null;
}

export interface Category {
  categoryId: string;
  name: string;
}

const MONTH_FORMAT = 'MM-yyyy';
const DAY_FORMAT = 'dd-MM-yyyy';
const FULL_DAY_FORMAT = 'dd-MM-yyyy HH:mm';

const state = reactive<{
  transactions: Transactions[];
  products: Products[];
  categories: Category[];
  sales: Sales[];
}>({
  categories: [],
  products: [],
  sales: [],
  transactions: []
});

const { getItem, setItem } = useStorage('QUEGIRO');

export function useTransactions() {
  const transactions = computed(() => state.transactions);
  const products = computed(() => state.products);
  const categories = computed(() => state.categories);
  const sales = computed(() => state.sales);

  async function loadProducts() {
    const prod = await getItem('products');

    state.products = prod ? [...prod] : [];
  }

  async function loadCategories() {
    const cat = await getItem('categories');

    state.categories = cat ? [...cat] : [];
  }

  async function loadTransactions() {
    const trans = await getItem('transactions');

    state.transactions = trans ? trans : [];
  }

  async function loadSales() {
    const sales = await getItem('sales');

    state.sales = sales ? sales : [];
  }

  async function load() {
    await loadProducts();
    await loadCategories();
    await loadTransactions();
    await loadSales();
  }

  async function saveCategories() {
    await setItem('categories', state.categories);
  }

  async function saveProducts() {
    await setItem('products', state.products);
  }

  async function saveTransactions() {
    await setItem('transactions', state.transactions);
  }

  async function saveSales() {
    await setItem('sales', state.sales);
  }

  async function save() {
    await saveCategories();
    await saveTransactions();
    await saveProducts();
    await saveSales();
  }

  async function reset() {
    await setItem('categories', []);
    await setItem('products', []);
    await setItem('transactions', []);
    await setItem('sales', []);
  }

  function getTransactionDays() {
    const dates = orderBy(transactions.value.map(item => item.date));

    return uniq(dates);
  }

  function getTransactionMonths() {
    const months = orderBy(transactions.value, ['transactionDate']).map(
      item => {
        const date = parse(item.date, DAY_FORMAT, new Date());

        return format(date, MONTH_FORMAT);
      }
    );

    return uniq(months);
  }

  function getTransactionYears() {
    const years = orderBy(transactions.value, ['transactionDate']).map(item => {
      const date = parse(item.date, DAY_FORMAT, new Date());
      return format(date, 'yyyy');
    });

    return uniq(years);
  }

  function getBuysPerMonth() {
    const months = getTransactionMonths();

    const arr: number[] = [];
    months.forEach(month => {
      const totalMonth = transactions.value
        .filter(item => {
          const date = parse(item.date, DAY_FORMAT, new Date());
          return item.buy && format(date, MONTH_FORMAT) === month;
        })
        .reduce((prev, curr) => {
          prev = prev + Math.abs(curr.total);

          return prev;
        }, 0);

      arr.push(Math.round(totalMonth * 100) / 100);
    });

    return arr;
  }

  function getBuysPerYear() {
    const years = getTransactionYears();

    const arr: number[] = [];
    years.forEach(year => {
      const totalYear = transactions.value
        .filter(item => {
          const date = parse(item.date, DAY_FORMAT, new Date());
          return item.buy && format(date, 'yyyy') === year;
        })
        .reduce((prev, curr) => {
          prev = prev + Math.abs(curr.total);

          return prev;
        }, 0);

      arr.push(Math.round(totalYear * 100) / 100);
    });

    return arr;
  }

  function getSalesPerMonth() {
    const months = getTransactionMonths();

    const arr: number[] = [];
    months.forEach(month => {
      const totalMonth = transactions.value
        .filter(item => {
          const date = parse(item.date, DAY_FORMAT, new Date());
          return item.sale && format(new Date(date), MONTH_FORMAT) === month;
        })
        .reduce((prev, curr) => {
          prev = prev + Math.abs(curr.total);

          return prev;
        }, 0);

      arr.push(Math.round(totalMonth * 100) / 100);
    });

    return arr;
  }

  function getSalesPerYear() {
    const years = getTransactionYears();

    const arr: number[] = [];
    years.forEach(year => {
      const totalYear = transactions.value
        .filter(item => {
          const date = parse(item.date, DAY_FORMAT, new Date());
          return item.sale && format(new Date(date), 'yyyy') === year;
        })
        .reduce((prev, curr) => {
          prev = prev + Math.abs(curr.total);

          return prev;
        }, 0);

      arr.push(Math.round(totalYear * 100) / 100);
    });

    return arr;
  }

  function getMonthsOnSales() {
    const months = orderBy(sales.value, ['sellDate']).map(item =>
      format(item.sellDate as Date, MONTH_FORMAT)
    );

    return uniq(months);
  }

  function getYearsOnSales() {
    const years = orderBy(sales.value, ['sellDate']).map(item =>
      format(item.sellDate as Date, 'yyyy')
    );

    return uniq(years);
  }

  function getGainsPerMonth() {
    const months = getMonthsOnSales();

    const arr: number[] = [];

    months.forEach(month => {
      const totalMonth = sales.value
        .filter(
          item =>
            item.sellDate &&
            format(item.sellDate as Date, MONTH_FORMAT) === month &&
            item.totalSellPrice - item.totalBuyPrice >= 0
        )
        .reduce((prev, curr) => {
          prev = prev + Math.abs(curr.totalSellPrice - curr.totalBuyPrice);

          return prev;
        }, 0);

      arr.push(Math.round(totalMonth * 100) / 100);
    });

    return arr;
  }

  function getLossesPerMonth() {
    const months = getMonthsOnSales();

    const arr: number[] = [];

    months.forEach(month => {
      const totalMonth = sales.value
        .filter(
          item =>
            item.sellDate &&
            format(item.sellDate as Date, MONTH_FORMAT) === month &&
            item.totalSellPrice - item.totalBuyPrice < 0
        )
        .reduce((prev, curr) => {
          prev = prev + Math.abs(curr.totalSellPrice - curr.totalBuyPrice);

          return prev;
        }, 0);

      arr.push(Math.round(totalMonth * 100) / 100);
    });

    return arr;
  }

  function getGainsPerYear() {
    const years = getYearsOnSales();

    const arr: number[] = [];

    years.forEach(year => {
      const totalYear = sales.value
        .filter(
          item =>
            item.sellDate &&
            format(item.sellDate as Date, 'yyyy') === year &&
            item.totalSellPrice - item.totalBuyPrice >= 0
        )
        .reduce((prev, curr) => {
          prev = prev + Math.abs(curr.totalSellPrice - curr.totalBuyPrice);

          return prev;
        }, 0);

      arr.push(Math.round(totalYear * 100) / 100);
    });

    return arr;
  }

  function getLossesPerYear() {
    const years = getYearsOnSales();

    const arr: number[] = [];

    years.forEach(year => {
      const totalYear = sales.value
        .filter(
          item =>
            item.sellDate &&
            format(item.sellDate as Date, 'yyyy') === year &&
            item.totalSellPrice - item.totalBuyPrice < 0
        )
        .reduce((prev, curr) => {
          prev = prev + Math.abs(curr.totalSellPrice - curr.totalBuyPrice);

          return prev;
        }, 0);

      arr.push(Math.round(totalYear * 100) / 100);
    });

    return arr;
  }

  function resetRemain() {
    state.transactions.forEach(trans => {
      trans.remain = Math.abs(trans.qty);
    });
  }

  async function processSales() {
    let iterations = 0;

    state.sales = [];

    resetRemain();

    const sales = orderBy(
      state.transactions.filter(trans => trans.sale),
      ['transactionDate']
    );

    console.log(JSON.stringify(sales.map(item => item.remain)));

    const buys = orderBy(
      state.transactions.filter(trans => trans.buy),
      ['transactionDate']
    );

    sales.forEach(sale => {
      console.log('Process sale', sale.name, sale.transactionDate, sale.remain);

      // debugger;

      while (sale.remain > 0) {
        const buy = buys.find(buy => buy.remain && buy.isin === sale.isin);

        console.log(
          'Process sale',
          sale.name,
          sale.transactionDate,
          sale.remain
        );

        if (buy !== null && buy !== undefined) {
          const buyQty = Math.abs(buy.remain);
          const saleQty = Math.abs(sale.remain);

          // console.log('Find a buy', buy.name, buyQty, saleQty);

          let qty = 0;

          if (saleQty >= buyQty) {
            buy.remain = 0;
            buy.state = 'CLOSE';
            qty = buyQty;
          } else {
            buy.remain = buy.remain - saleQty;
            qty = saleQty;
          }

          state.sales.push({
            buyDate: buy.transactionDate as any,
            buyOrderId: buy.orderId,
            buyPrice: buy.transactionPrice / buy.qty,
            cost:
              (buy.transactionCost / buy.qty +
                sale.transactionCost / sale.qty) *
              qty,
            currency: sale.transactionCurrency,
            exchange: sale.exchange,
            isin: sale.isin,
            name: sale.name,
            qty,
            sellDate: sale.transactionDate,
            sellOrderId: sale.orderId,
            sellPrice: sale.transactionPrice / sale.qty,
            totalBuyPrice: (buy.transactionPrice / buy.qty) * qty,
            totalSellPrice: (sale.transactionPrice / sale.qty) * qty
          });

          sale.remain = sale.remain - qty;
        } else {
          // didn't find the buy

          state.sales.push({
            buyDate: null,
            buyOrderId: null,
            buyPrice: 0,
            cost: 0,
            currency: sale.transactionCurrency,
            exchange: sale.exchange,
            isin: sale.isin,
            name: sale.name,
            qty: sale.qty,
            sellDate: sale.transactionDate,
            sellOrderId: sale.orderId,
            sellPrice: sale.transactionPrice / sale.qty,
            totalBuyPrice: 0,
            totalSellPrice: sale.transactionPrice / sale.qty
          });

          sale.remain = 0;
        }

        iterations++;
      }
    });

    console.log('Save Sales');

    await saveSales();
  }

  function addTransaction(item: Transactions) {
    state.transactions.push(item);
  }

  async function removeCategory(category: Category) {
    state.products.forEach(product => {
      if (product.categoryId === category.categoryId) {
        product.categoryId = null;
      }
    });

    state.categories = state.categories.filter(
      cat => cat.categoryId !== category.categoryId
    );

    await saveTransactions();
    await saveCategories();
  }

  function processTransactions() {
    state.transactions = orderBy(
      uniqBy(
        state.transactions.filter(
          item => item.date && item.date !== '' && item.isin !== ''
        ),
        (trans: any) =>
          trans.orderId +
          trans.transactionCost +
          trans.qty +
          trans.localTransactionPrice
      ),
      ['transactionDate'],
      ['desc']
    );

    state.products = uniqBy(
      state.transactions.map(item => ({
        categoryId:
          state.products.find(product => product.isin === item.isin)
            ?.categoryId || null,
        exchange: item.exchange,
        isin: item.isin,
        name: item.name
      })),
      'isin'
    );
  }

  async function addCategory(name: string) {
    const cat = state.categories.find(cat => cat.name === name);
    if (!cat) {
      state.categories.push({
        categoryId: Number(new Date()).toString(10),
        name
      });

      saveCategories();
    } else {
      throw new Error('Upps');
    }
  }

  function processTransactionsCVS(content: string) {
    const lines = content.split('\n');

    lines
      .filter((line, index) => index !== 0 && line.split(',').length > 10)
      .forEach(line => {
        const [
          date,
          time,
          name,
          isin,
          exchange,
          exchangeFrom,
          qty,
          localTransactionPrice,
          localTransactionCurrency,
          localTotalTransactionPrice,
          localTotalTransactionCurrency,
          transactionPrice,
          transactionCurrency,
          exchangeRate,
          transactionCost,
          transactionCostCurrency,
          total,
          totalCurrency,
          orderId
        ] = line.split(',');

        addTransaction({
          buy: Number(qty) > 0,
          date,
          exchange,
          exchangeFrom,
          exchangeRate: Number(exchangeRate),
          isin,
          localTotalTransactionCurrency,
          localTotalTransactionPrice: Math.abs(
            Number(localTotalTransactionPrice)
          ),
          localTransactionCurrency,
          localTransactionPrice: Math.abs(Number(localTransactionPrice)),
          name,
          orderId,
          qty: Math.abs(Number(qty)),
          remain: Math.abs(Number(qty)),
          sale: Number(qty) < 0,
          state: 'OPEN',
          time,
          total: Number(total),
          totalCurrency,
          transactionCost: Math.abs(Number(transactionCost)),
          transactionCostCurrency,
          transactionCurrency,
          transactionDate: parse(
            `${date} ${time}`,
            'dd-MM-yyyy HH:mm',
            new Date()
          ),
          transactionPrice: Math.abs(Number(transactionPrice))
        });
      });
  }

  return {
    addCategory,
    addTransaction,
    categories,
    load,
    loadCategories,
    loadProducts,
    loadSales,
    loadTransactions,
    processSales,
    processTransactions,
    processTransactionsCVS,
    products,
    removeCategory,
    reset,
    sales,
    save,
    saveCategories,
    saveProducts,
    saveSales,
    saveTransactions,
    transactions,
    // move it to another place
    getTransactionMonths,
    getTransactionDays,
    getBuysPerMonth,
    getSalesPerMonth,
    //
    getTransactionYears,
    getBuysPerYear,
    getSalesPerYear,
    //
    getGainsPerMonth,
    getLossesPerMonth,
    getGainsPerYear,
    getLossesPerYear,
    getMonthsOnSales,
    getYearsOnSales
  };
}
