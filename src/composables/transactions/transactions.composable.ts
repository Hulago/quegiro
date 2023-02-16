import { orderBy, uniqBy } from 'lodash-es';
import { parse } from 'date-fns';
import { ref, unref } from 'vue';
import { useStorage } from '@/next';

import { TransactionModel } from './transaction.model';
import { useSales } from '../sales/sales.composable';
import { useCategory } from '../categories/category.composable';
import { useProduct } from '../product/product.composable';

import { SalesModel } from '../sales/sales.model';

export interface Products {
  isin: string;
  name: string;
  exchange: string;
  categoryId: string | null;
}

const transactions = ref<TransactionModel[]>([]);

const { getItem, setItem } = useStorage('QUEGIRO');

export function useTransactions() {
  const { loadSales, sales, saveSales } = useSales();

  const { loadCategories } = useCategory();

  const { loadProducts, products, saveProducts } = useProduct();

  async function loadTransactions() {
    const trans = await getItem('transactions');

    transactions.value = trans ? trans : [];
  }

  async function saveTransactions() {
    try {
      await setItem('transactions', unref(transactions));
    } catch (e) {
      console.log(e);
      console.error('Error saving transaction');
    }
  }

  async function resetTransactions() {
    transactions.value = [];
    await saveTransactions();
  }

  function resetRemain() {
    transactions.value.forEach(trans => {
      trans.remain = Math.abs(trans.qty);
    });
  }

  async function processSales() {
    let iterations = 0;

    sales.value = [];

    resetRemain();

    const salesToBeProcesses = orderBy(
      transactions.value.filter(trans => trans.isSale),
      ['transactionDate']
    );

    console.log(JSON.stringify(salesToBeProcesses.map(item => item.remain)));

    const buys = orderBy(
      transactions.value.filter(trans => trans.isBuy),
      ['transactionDate']
    );

    salesToBeProcesses.forEach(sale => {
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

          sales.value.push(
            new SalesModel({
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
            })
          );

          sale.remain = sale.remain - qty;
        } else {
          // didn't find the buy

          sales.value.push(
            new SalesModel({
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
            })
          );

          sale.remain = 0;
        }

        iterations++;
      }
    });

    console.log('Save Sales');

    await saveSales();
  }

  function addTransaction(item: TransactionModel) {
    transactions.value.push(item);
  }

  async function processTransactions() {
    const trans = (await getItem('transactions')) || [];
    transactions.value = orderBy(
      uniqBy(
        [...transactions.value, ...trans].filter(
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

    await loadProducts();
    products.value = uniqBy(
      transactions.value.map(item => ({
        categoryId:
          products.value.find(product => product.isin === item.isin)
            ?.categoryId || null,
        exchange: item.exchange,
        isin: item.isin,
        name: item.name
      })),
      'isin'
    );

    await saveTransactions();
    await saveProducts();
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
          totalTransactionPrice,
          totalTransactionCurrency,
          orderId
        ] = line.split(',');

        addTransaction(
          new TransactionModel({
            isBuy: Number(qty) > 0,
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
            isSale: Number(qty) < 0,
            state: 'OPEN',
            time,
            totalTransactionPrice: Math.abs(Number(totalTransactionPrice)),
            totalTransactionCurrency: totalTransactionCurrency,
            transactionCost: Math.abs(Number(transactionCost)),
            transactionCostCurrency,
            transactionCurrency,
            transactionDate: parse(
              `${date} ${time}`,
              'dd-MM-yyyy HH:mm',
              new Date()
            ),
            transactionPrice: Math.abs(Number(transactionPrice))
          })
        );
      });
  }

  return {
    addTransaction,
    loadCategories,
    loadProducts,
    loadSales,
    loadTransactions,
    processSales,
    processTransactions,
    processTransactionsCVS,
    resetTransactions,
    sales,
    saveSales,
    saveTransactions,
    transactions
  };
}
