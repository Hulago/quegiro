import { orderBy, uniq, uniqBy } from 'lodash-es';
import { format, parse } from 'date-fns';

import { useTransactions } from '../transactions/transactions.composable';

const MONTH_FORMAT = 'MM-yyyy';
const DAY_FORMAT = 'dd-MM-yyyy';
const FULL_DAY_FORMAT = 'dd-MM-yyyy HH:mm';

export function useData() {
  const { transactions, sales } = useTransactions();

  function formatDate(date: Date, dateFormat: string) {
    try {
      return format(new Date(date), dateFormat);
    } catch (e) {
      console.error(e.message, date, dateFormat);
      return null;
    }
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
          return item.isBuy && format(date, MONTH_FORMAT) === month;
        })
        .reduce((prev, curr) => {
          prev = prev + Math.abs(curr.totalTransactionPrice);

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
          return item.isBuy && format(date, 'yyyy') === year;
        })
        .reduce((prev, curr) => {
          prev = prev + Math.abs(curr.totalTransactionPrice);

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
          return item.isSale && format(new Date(date), MONTH_FORMAT) === month;
        })
        .reduce((prev, curr) => {
          prev = prev + Math.abs(curr.totalTransactionPrice);

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
          return item.isSale && format(new Date(date), 'yyyy') === year;
        })
        .reduce((prev, curr) => {
          prev = prev + Math.abs(curr.totalTransactionPrice);

          return prev;
        }, 0);

      arr.push(Math.round(totalYear * 100) / 100);
    });

    return arr;
  }

  function getMonthsOnSales() {
    const months = orderBy(sales.value, ['sellDate']).map(item =>
      formatDate(item.sellDate as Date, MONTH_FORMAT)
    );

    return uniq(months);
  }

  function getYearsOnSales() {
    const years = orderBy(sales.value, ['sellDate']).map(item =>
      formatDate(item.sellDate as Date, 'yyyy')
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
            formatDate(item.sellDate as Date, MONTH_FORMAT) === month &&
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
            formatDate(item.sellDate as Date, MONTH_FORMAT) === month &&
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
            formatDate(item.sellDate as Date, 'yyyy') === year &&
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
            formatDate(item.sellDate as Date, 'yyyy') === year &&
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

  return {
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
