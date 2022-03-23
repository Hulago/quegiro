import { useLineChart, useTransactions } from '@quegiro/common';
import { defineComponent, onMounted, ref } from '@vue/composition-api';

import { max, min } from 'lodash-es';

export default defineComponent({
  setup() {
    const buysVsSalesChart = useLineChart();
    const totalPorfolioChart = useLineChart();

    const { load, getTransactionMonths, getBuysPerMonth, getSalesPerMonth } =
      useTransactions();

    const buysVsSalesChartRef = ref(null);
    const totalPorfolioChartRef = ref(null);

    onMounted(async () => {
      await load();
      initBuysVsSalesChart();
      inittotalPorfolioChart();
    });

    function initBuysVsSalesChart() {
      buysVsSalesChart.options.yAxis.type = 'value';
      buysVsSalesChart.initChart(
        buysVsSalesChartRef.value as any,
        'Sales & Buys'
      );

      buysVsSalesChart.setXValues(getTransactionMonths());

      buysVsSalesChart.addSeries('Buys', getBuysPerMonth());

      buysVsSalesChart.addSeries('Sells', getSalesPerMonth());

      buysVsSalesChart.setMaxY(
        max([...getBuysPerMonth(), ...(getSalesPerMonth() as any)])
      );

      buysVsSalesChart.refreshChart();
    }

    function inittotalPorfolioChart() {
      totalPorfolioChart.options.yAxis.type = 'value';
      totalPorfolioChart.initChart(
        totalPorfolioChartRef.value as any,
        'Portfolio'
      );

      totalPorfolioChart.setXValues(getTransactionMonths());

      totalPorfolioChart.addSeries('Buys', getBuysPerMonth(), {
        areaStyle: {},
        stack: 'total'
      });

      let totalBuy = 0;
      const buys = getBuysPerMonth().map((item) => {
        totalBuy += item;
        return totalBuy;
      });

      let totalSales = 0;
      const sales = getSalesPerMonth().map((item) => {
        totalSales += item;
        return totalSales;
      });

      const portfolio = buys.map(
        (item, index) => Math.round((item - sales[index]) * 100) / 100
      );

      totalPorfolioChart.addSeries('Portfolio', portfolio);

      totalPorfolioChart.addSeries(
        'Sales',
        getSalesPerMonth().map((item) => item * -1),
        { areaStyle: {}, stack: 'total' }
      );

      totalPorfolioChart.setMaxY(
        max([...(getBuysPerMonth() as any), ...portfolio])
      );

      totalPorfolioChart.setMinY(
        min([...(getSalesPerMonth().map((item) => item * -1) as any)])
      );

      totalPorfolioChart.refreshChart();
    }

    return {
      buysVsSalesChartRef,
      totalPorfolioChartRef
    };
  }
});
